import type { RuneType } from '@/types/Champion'

export interface Spell extends RuneType {
  id: number
  name: string
  description: string
  flavorText: string
  noraCost: number
  artist: string
  factions: string[]
  rarity: string
  cooldown: number
  runeSet: string
  forSale: boolean
  allowRanked: boolean
  tradeable: boolean
  hash: string
  deckLimit: number
}
