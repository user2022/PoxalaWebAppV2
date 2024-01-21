export const getRuneRarity = (rarity: string): string => {
  if (rarity == 'UNCOMMON') {
    return 'uncom'
  } else if (rarity == 'EXOTIC') {
    return 'exotic'
  } else if (rarity == 'COMMON') {
    return 'com'
  } else if (rarity == 'LEGENDARY') {
    return 'pe'
  } else if (rarity == 'RARE') {
    return 'rare'
  } else if (rarity == 'LIMITED') {
    return 'le'
  } else return ''
}
