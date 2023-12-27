import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Rune } from '@/types/Runes'
import { getRuneType } from '@/lib/getRuneType'

interface DeckOrder {
  champ: number
  spell: number
  relic: number
  equip: number
}

export const useDeckStore = defineStore('deck', () => {
  const deckHolder = ref<Array<Rune | null>>(Array(30).fill(null))

  const addToDeck = (rune: Rune) => {
    const order: DeckOrder = { champ: 0, spell: 1, relic: 2, equip: 3 }

    // Check for empty slot
    const index = deckHolder.value.findIndex((r) => r === null)
    if (index === null || index === undefined) return

    // Check for deck limit
    const matchingRunes = deckHolder.value.filter((r) => r?.hash === rune.hash)
    if (matchingRunes.length >= rune.deckLimit) return

    // Apply type
    const r = rune
    r.type = getRuneType(rune)

    // Add to deck holder
    deckHolder.value[index] = r

    // Sort deck holder
    deckHolder.value
      .sort((a, b) => {
        if (a && b && a.name < b.name) return -1
        if (a && b && a.name > b.name) return 1
        else return 0
      })
      .sort((a, b) => {
        if (a?.type && b?.type)
          return order[a.type as keyof DeckOrder] - order[b.type as keyof DeckOrder]
        else return 0
      })

    console.log(deckHolder.value)
  }

  const resetDeck = () => {
    deckHolder.value = Array(30).fill(null)
  }

  const removeFromDeck = (index: number) => {
    console.log(index)
    deckHolder.value.splice(index, 1)
    deckHolder.value.push(null)
  }

  return { deckHolder, addToDeck, resetDeck, removeFromDeck }
})
