import type { TransformAbility } from '@/lib/util/transformAbilities'

export interface RuneType {
  type?: string
  factionOneNum?: string
  factionTwoNum?: string
}

export interface Champion extends RuneType {
  id: number
  name: string
  description: string
  maxRng: number
  minRng: number
  defense: number
  speed: number
  damage: number
  hitPoints: number
  size: string
  rarity: string
  classes: string[]
  races: string[]
  noraCost: number
  noraMod?: number
  customNoraMod?: number
  baseNoraCost?: number
  abilityNoraCost?: number
  hash: string
  artist: string
  factions: string[]
  runeSet: string
  forSale: boolean
  tradeable: boolean
  allowRanked: boolean
  deckLimit: number
  transformedAbilities?: TransformAbility[]
  startingAbilities?: StartingAbilitiesEntity[] | null
  abilitySets?: AbilitySetsEntity[] | null
}

export interface StartingAbilitiesEntity {
  id: number
  apCost: number
  name: string
  shortDescription: string
  activationType: number
  level: number
  cooldown: number
  noraCost: number
  iconName: string
}

export interface AbilitySetsEntity {
  abilities?: AbilitiesEntity[] | null
}

export interface AbilitiesEntity extends StartingAbilitiesEntity {
  default?: boolean
}
