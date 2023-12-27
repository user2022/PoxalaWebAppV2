import { type Rune } from '@/types/Runes'
import type { FactionAmt } from '@/types/FactionAmt'
import { getFactionNum } from '@/lib/getFactionNum'

export const getFactionAmountFromDeck = (deck: Array<Rune | null>): FactionAmt[] => {
  // Loop through deck item in the deck array and count the amount of each faction
  const factionAmount: FactionAmt[] = []
  deck.forEach((rune) => {
    const runeFactions = rune?.factions
    runeFactions?.forEach((faction) => {
      const facNum = getFactionNum(faction)
      const factionIndex = factionAmount.findIndex((f) => f.factionNumber === facNum)
      if (factionIndex === -1) {
        factionAmount.push({ factionNumber: facNum, amount: 1 })
      } else {
        factionAmount[factionIndex].amount++
      }
    })
  })
  return factionAmount
}
