import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Rune } from '@/types/Runes'
import type { Champion } from '@/types/Champion'

export const useRuneStore = defineStore('rune', () => {
  const rune = ref<Rune | null>(null)

  const setRune = (r: Rune) => {
    rune.value = r
  }

  const getRuneFactionOne = computed(() => {
    if (!rune.value) return ''
    return rune.value.factions[0]
  })

  const getRuneFactionTwo = computed(() => {
    if (!rune.value) return ''
    if (rune.value.factions[1]) {
      return rune.value.factions[1]
    } else {
      return rune.value.factions[0]
    }
  })

  const getRuneAbilitiesSetOne = computed(() => {
    return (rune.value as Champion).abilitySets?.[0].abilities
  })

  const getRuneAbilitiesSetTwo = computed(() => {
    return (rune.value as Champion).abilitySets?.[1].abilities
  })

  const getStartingAbilities = computed(() => {
    return (rune.value as Champion).startingAbilities
  })

  return {
    rune,
    setRune,
    getRuneFactionOne,
    getRuneFactionTwo,
    getRuneAbilitiesSetOne,
    getRuneAbilitiesSetTwo,
    getStartingAbilities
  }
})
