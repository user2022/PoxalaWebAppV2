export const EmptyAbility = {
  id: 999999,
  apCost: 0,
  name: 'None',
  shortDescription: '',
  activationType: 0,
  level: 0,
  cooldown: 0,
  noraCost: 0,
  iconName: ''
}

/*
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
 */

export const EmptyNormalAbility = {
  ability_id: 999999,
  ap_cost: 0,
  name: 'None',
  short_description: '',
  activation_type: 0,
  level: 0,
  cooldown: 0,
  cost: 0,
  icon_name: '',
  long_description: '',
  class_name: '',
  revision: 0,
  ranked: 0,
  prerequisite_id: 0,
  resettable: 0,
  asset_id: 0,
  comments: '',
  default: false
}
