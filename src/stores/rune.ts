import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Rune } from '@/types/Runes'
import { getRuneType } from '@/lib/getRuneType'
import { transformAbilities } from '@/lib/util/transformAbilities'
import type { Champion } from '@/types/Champion'
import { getFactionNum } from '@/lib/getFactionNum'
import { getFactionOne, getFactionTwo } from '@/lib/util/getRuneFactions'
import { getChampionNoraMod } from '@/lib/util/getChampionNoraMod'
import type { Ability } from '@/types/Ability'
import type { AbilityQueryCode } from '@/lib/data/AbilityQueryCodes'
import { BaseStatQueryCodes } from '@/lib/data/BaseStatQueryCodes'
import { calculateChampionAbilityCosts } from '@/lib/util/calculateChampionAbilityCosts'
import { transformAbilityToChampAbility } from '@/lib/util/transformAbilityToChampAbility'
import { EmptyAbility } from '@/lib/data/EmptyAbility'

export const useRuneStore = defineStore('rune', () => {
  const rune = ref<Rune | null>(null)

  const setRune = (r: Rune | null) => {
    if (r === null) {
      rune.value = null
      return
    }

    r.factionOneNum = getFactionNum(getFactionOne(r))
    r.factionTwoNum = getFactionNum(getFactionTwo(r))

    if (getRuneType(r) === 'champ') {
      const newRune: Champion = r as Champion

      const abilitSet1 = newRune.abilitySets?.[0].abilities
      const abilitySet2 = newRune.abilitySets?.[1].abilities

      const startingAbilities = newRune.startingAbilities

      if (abilitSet1) {
        while (abilitSet1.length < 3) {
          abilitSet1.push(EmptyAbility)
        }
      }
      if (abilitySet2) {
        while (abilitySet2.length < 3) {
          abilitySet2.push(EmptyAbility)
        }
      }
      if (startingAbilities) {
        while (startingAbilities.length < 6) {
          startingAbilities.push(EmptyAbility)
        }
      }

      // Create transformed Abilities Array on unit object
      newRune.transformedAbilities = transformAbilities({
        abilityPath1: newRune.abilitySets?.[0].abilities ?? [],
        abilityPath2: newRune.abilitySets?.[1].abilities ?? [],
        startingAbilities: newRune.startingAbilities ?? []
      })

      // Nora Cost Calculation
      const baseNoraCost = newRune.baseNoraCost ?? getChampionNoraMod(newRune)
      const totalAbilityCost = calculateChampionAbilityCosts(newRune) ?? 0
      const noraMod = newRune.customNoraMod ?? newRune.noraCost - (baseNoraCost + totalAbilityCost)

      newRune.baseNoraCost = baseNoraCost
      newRune.abilityNoraCost = totalAbilityCost
      newRune.noraMod = noraMod

      newRune.noraCost = baseNoraCost + totalAbilityCost + noraMod

      rune.value = newRune
      return
    }

    rune.value = r
  }

  const updateUnit = (statQueryCode: keyof Champion, value: string | number) => {
    if (rune.value) {
      const champ = rune.value as Champion

      if (statQueryCode === 'noraMod') {
        champ.customNoraMod = Number(value)
        setRune(champ)
      }

      if (BaseStatQueryCodes.includes(statQueryCode)) {
        // @ts-ignore
        champ[statQueryCode] = Number(value)

        // Updating nora cost to match new value
        const oldNoraBaseCost = champ.baseNoraCost
        const newBaseNoraCost = getChampionNoraMod(champ)
        const newNoraCost = champ.noraCost - oldNoraBaseCost! + newBaseNoraCost
        champ.baseNoraCost = newBaseNoraCost
        champ.noraCost = newNoraCost

        setRune(champ)
      }
    }
  }

  const setAbility = (ability: Ability, abilityQueryCode: AbilityQueryCode) => {
    const numbers = abilityQueryCode.match(/\d+/g)
    const champAbility = transformAbilityToChampAbility(ability)
    if (rune.value && numbers) {
      const champ = rune.value as Champion
      if (abilityQueryCode.includes('s')) {
        const abilitySetIndex = Number(numbers[0]) - 1
        const abilityIndex = Number(numbers[1]) - 1
        // Getting the ability that is set to be changed
        const abilityToChange = champ.abilitySets?.[abilitySetIndex]?.abilities?.[abilityIndex]
        // Checking if the ability that's being changed is the default ability or not
        const getDefault = abilityToChange?.default ?? false
        const oldNoraCost = abilityToChange?.noraCost
        const newNoraCost = champAbility.noraCost

        if (getDefault) champ.noraCost = champ.noraCost - oldNoraCost! + newNoraCost
        // Updating the ability
        if (champAbility.id === 999999) {
          // Remove the ability if it's set to none
          champ.abilitySets?.[abilitySetIndex].abilities?.splice(abilityIndex, 1, {
            ...EmptyAbility
          })
        } else {
          champ.abilitySets?.[abilitySetIndex].abilities?.splice(abilityIndex, 1, {
            ...champAbility,
            default: getDefault
          })
        }
        setRune(champ)
      } else if (abilityQueryCode.includes('b')) {
        const abilityIndex = Number(numbers[0]) - 1

        const oldNoraCost = champ.startingAbilities?.[abilityIndex]?.noraCost
        const newNoraCost = champAbility.noraCost
        champ.noraCost = champ.noraCost - oldNoraCost! + newNoraCost

        if (champAbility.id === 999999) {
          // Remove the ability if it's set to none
          champ.startingAbilities?.splice(abilityIndex, 1, {
            ...EmptyAbility
          })
        } else {
          champ.startingAbilities?.splice(abilityIndex, 1, champAbility)
        }

        setRune(champ)
      }
    }
  }

  return {
    rune,
    setRune,
    setAbility,
    updateUnit
  }
})
