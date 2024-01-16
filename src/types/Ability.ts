export interface Ability {
  activation_type: number
  ap_cost: number
  cooldown: number
  default: boolean
  icon_name: string
  ability_id: number
  level: number
  name: string
  cost: number
  short_description: string
  long_description: string
  class_name: string
  revision: number
  ranked: number
  prerequisite_id: number
  resettable: number
  asset_id: number
  comments: string
}

export interface ChampionAbility {
  activationType: number
  apCost: number
  cooldown: number
  default: boolean
  iconName: string
  id: number
  level: number
  name: string
  noraCost: number
  shortDescription: string
}
