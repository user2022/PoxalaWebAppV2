export const getRuneType = (rune: any): string => {
  if (rune.hitPoints && !rune.maxRng) return 'relic'
  if (rune.maxRng) return 'champ'
  if (rune.cooldown) return 'spell'
  if (!rune.cooldown && !rune.hitPoints) return 'equip'
  else return 'champ'
}
