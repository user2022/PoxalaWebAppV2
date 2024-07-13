import type { Runes } from '@/types/Runes'

export const getBannedRunes = (runes: Runes): Runes => {
  // Loop through runes.champs and runes.relics and runes.spells and runes.equips and return an array of all the runes that have the property banned set to true
  const bannedRunes: Runes = {
    champs: [],
    relics: [],
    spells: [],
    equips: []
  }

  for (const champ of runes.champs) {
    if (!champ.allowRanked) {
      bannedRunes.champs.push(champ)
    }
  }

  for (const relic of runes.relics) {
    if (!relic.allowRanked) {
      bannedRunes.relics.push(relic)
    }
  }

  for (const spell of runes.spells) {
    if (!spell.allowRanked) {
      bannedRunes.spells.push(spell)
    }
  }

  for (const equip of runes.equips) {
    if (!equip.allowRanked) {
      bannedRunes.equips.push(equip)
    }
  }

  return bannedRunes
}
