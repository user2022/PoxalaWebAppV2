import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { Runes } from '@/types/Runes'

export const runePageFilters = (route: RouteLocationNormalizedLoaded, data: Runes) => {
  // Array Values
  const factions = route.query.faction?.toString().split(',')
  const abilities = route.query.ability?.toString().split(',')
  const rarities = route.query.rarity?.toString().split(',')
  const races = route.query.race?.toString().split(',')
  const classes = route.query.class?.toString().split(',')

  // String values
  const name = route.query.name?.toString()
  const type: string = route.query.type?.toString() ?? 'champs'
  const speed = route.query.speed?.toString()
  const noraCost = route.query.noraCost?.toString()

  if (abilities) {
    data.champs = data.champs.filter((rune) => {
      const abilSets =
        rune.abilitySets
          ?.map((abilitySet) => {
            return abilitySet?.abilities?.filter((ability) => {
              return abilities.includes(ability.name)
            })
          })
          .flat() || []

      const startingAbils =
        rune.startingAbilities?.filter((ability) => {
          return abilities.includes(ability.name)
        }) || []

      const runeAbilities = [...abilSets, ...startingAbils]

      return abilities.every((abilityName) =>
        runeAbilities.some((ability) => ability?.name === abilityName)
      )
    })
  }

  if (name) {
    data[type as keyof Runes] = data[type as keyof Runes].filter((rune) => {
      return rune.name.toLowerCase().includes(name.toLowerCase())
    })
  }

  if (factions) {
    data[type as keyof Runes] = data[type].filter((rune) => {
      return factions.every((faction) => rune.factions.includes(faction))
    })
  }

  if (rarities) {
    data[type as keyof Runes] = data[type].filter((rune) => {
      return rarities.every((rarity) => rune.rarity === rarity)
    })
  }

  if (races) {
    data.champs = data.champs.filter((rune) => {
      return races.every((race) => rune.races.includes(race))
    })
  }

  if (classes) {
    data.champs = data.champs.filter((rune) => {
      return classes.every((classType) => rune.classes.includes(classType))
    })
  }

  if (speed) {
    data.champs = data.champs.filter((rune) => {
      return rune.speed === parseInt(speed)
    })
  }

  if (noraCost) {
    const noraCostSplit = noraCost.split(' ')
    const noraCostSymbol = noraCostSplit[0]
    const noraCostVal = noraCostSplit[1]
    data[type as keyof Runes] = data[type].filter((rune) => {
      if (noraCostSymbol === 'gt') {
        return rune.noraCost > Number(noraCostVal)
      } else if (noraCostSymbol === 'lt') {
        return rune.noraCost < Number(noraCostVal)
      }
    })
  }
}
