const colourRarity = [
  { borderColour: 'border-red-700', textColour: 'text-red-600', rarity: 'UNCOMMON' },
  { borderColour: 'border-purple-700', textColour: 'text-purple-400', rarity: 'EXOTIC' },
  { borderColour: 'border-yellow-500', textColour: 'text-yellow-500', rarity: 'COMMON' },
  { borderColour: 'border-green-600', textColour: 'text-green-400', rarity: 'LEGENDARY' },
  { borderColour: 'border-blue-400', textColour: 'text-blue-400', rarity: 'RARE' },
  { borderColour: 'border-gray-500', textColour: 'text-gray-300', rarity: 'LIMITED' }
]

export const getBorderColourFromRarity = (rarity: string): string => {
  const colours = colourRarity.find((r) => r.rarity === rarity)
  if (!colours) {
    return ''
  }
  return colours.borderColour
}

export const getTextColourFromRarity = (rarity: string): string => {
  const colours = colourRarity.find((r) => r.rarity === rarity)
  if (!colours) {
    return ''
  }
  return colours.textColour
}
