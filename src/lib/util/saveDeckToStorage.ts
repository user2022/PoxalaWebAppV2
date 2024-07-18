import { format } from 'date-fns'
import type { FactionAmt } from '@/types/FactionAmt'

export interface StorageDeck {
  timestamp: string
  deckUrl: string
  name: string
  user: string
  factionAmount: FactionAmt[]
}

export const saveDeckToStorage = (
  url: string,
  name: string,
  user: string,
  factionAmount: FactionAmt[]
) => {
  let storageDeck: StorageDeck[] = []

  // Check if storageDeck already exists in localstorage
  if (localStorage.getItem('storageDeck')) {
    storageDeck = JSON.parse(localStorage.getItem('storageDeck') || '[]')
  }

  const date = format(new Date(), 'dd/MM/yyyy')

  const newDeck = {
    timestamp: date,
    deckUrl: url,
    name: name,
    user: user,
    factionAmount: factionAmount
  }

  storageDeck.push(newDeck)

  localStorage.setItem('storageDeck', JSON.stringify(storageDeck))
}
