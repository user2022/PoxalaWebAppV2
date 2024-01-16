import type { Champion } from '@/types/Champion'

export const calculateChampionAbilityCosts = (rune: Champion) => {
  // Get the noraCost value from each ability in the abilitySets and startingAbilities arrays
  const abilityCosts =
    rune.abilitySets?.flatMap(
      (abilitySet) =>
        abilitySet.abilities?.map((ability) => {
          if (ability.default === true) return ability.noraCost
          else return 0
        })
    ) ?? []
  const startingAbilityCosts = rune.startingAbilities?.map((ability) => ability.noraCost) ?? []
  const allAbilityCosts = [...abilityCosts, ...startingAbilityCosts]
  // Add all the noraCost values together
  // @ts-ignore
  const totalAbilityCost = allAbilityCosts.reduce((a, b) => a + b, 0)
  // Return the total noraCost value
  return totalAbilityCost
}
