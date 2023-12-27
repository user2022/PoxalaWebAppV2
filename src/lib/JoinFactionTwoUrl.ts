import { getFactionNum } from '@/lib/getFactionNum'

export const joinFactionTwoUrl = (factionTwo: string): string => {
  if (factionTwo && factionTwo !== '') {
    return `_${factionTwo}`
  } else {
    return ''
  }
}

export const getFactionURL = (factions: string[]): string => {
  if (factions.length === 1) {
    return getFactionNum(factions[0])
  } else if (factions.length === 2) {
    return `${getFactionNum(factions[0])}_${getFactionNum(factions[1])}`
  } else {
    return getFactionNum(factions[0])
  }
}
