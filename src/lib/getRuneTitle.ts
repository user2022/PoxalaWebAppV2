export const getRuneTitle = (type: string): string => {
  if (type === 'champs') return 'Champion'
  else if (type === 'relics') return 'Relic'
  else if (type === 'equips') return 'Equipment'
  else if (type === 'spells') return 'Spell'
  else return 'Champion'
}
