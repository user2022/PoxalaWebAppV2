import type { RuneType } from '@/types/Champion'

export interface Relic extends RuneType {
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
  defense: number
  hitPoints: number
  size: string
  hash: string
  deckLimit: number
}
