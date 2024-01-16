import type { Rune } from '@/types/Runes'

export const getFactionOne = (rune: Rune | null) => {
  if (!rune) return ''
  return rune.factions[0]
}

export const getFactionTwo = (rune: Rune | null) => {
  if (!rune) return ''
  if (rune.factions[1]) {
    return rune.factions[1]
  } else {
    return rune.factions[0]
  }
}