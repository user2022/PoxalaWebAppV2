import type { Ability, ChampionAbility } from '@/types/Ability'

export const transformAbilityToChampAbility = (ability: Ability): ChampionAbility => {
  // Change the ability to match that of the ChampionAbility type
  return {
    activationType: ability.activation_type,
    apCost: ability.ap_cost,
    cooldown: ability.cooldown,
    default: false,
    iconName: ability.icon_name,
    id: ability.ability_id,
    level: ability.level,
    name: ability.name,
    noraCost: ability.cost,
    shortDescription: ability.short_description
  }
}
