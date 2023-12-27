import type { Champion } from '@/types/Champion'
import type { Relic } from '@/types/Relic'
import type { Spell } from '@/types/Spell'
import type { Equip } from '@/types/Equip'

export interface Runes {
  champs: Champion[]
  relics: Relic[]
  spells: Spell[]
  equips: Equip[]
}

export type Rune = Champion | Relic | Spell | Equip

export type RuneType = 'champs' | 'relics' | 'spells' | 'equips'

export type RunesTwo = Champion[] & Spell[] & Relic[] & Equip[]

export interface DefaultRuneProp {
  type: RuneType
}
