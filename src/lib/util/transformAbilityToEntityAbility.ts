import type { Ability } from '@/types/Ability'
import type { AbilitiesEntity } from '@/types/Champion'

export const transformAbilityToEntityAbility = (ability: Ability): AbilitiesEntity => {
  return {
    id: ability.ability_id,
    apCost: ability.ap_cost,
    name: ability.name,
    shortDescription: ability.short_description,
    activationType: ability.activation_type,
    level: ability.level,
    cooldown: ability.cooldown,
    noraCost: ability.cost,
    iconName: ability.icon_name
  }
}

/*
 id: number
  apCost: number
  name: string
  shortDescription: string
  activationType: number
  level: number
  cooldown: number
  noraCost: number
  iconName: string
 */