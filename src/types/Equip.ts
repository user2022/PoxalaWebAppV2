import type { RuneType } from '@/types/Champion'

export interface Equip extends RuneType {
  id: number
  name: string
  description: string
  flavorText: string
  noraCost: number
  artist: string
  factions: string[]
  rarity: string
  runeSet: string
  forSale: boolean
  allowRanked: boolean
  tradeable: boolean
  hash: string
  deckLimit: number
}
