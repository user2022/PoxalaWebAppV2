import type { Champion } from '@/types/Champion'

export const getChampionNoraMod = (champ: Champion): number => {
  const { hitPoints, defense, damage, maxRng, minRng, speed, size } = champ
  const isLarge = size === '2x2'
  const defenseCost = ~~(hitPoints / 18) * defense
  const damageCost = Math.round(Math.pow(Math.atan((damage - 10) / 2), 3) * 6)
  const healthCost = Math.log(hitPoints + 10) > 0 ? Math.pow(Math.log(hitPoints + 10), 2.65) : 0
  let rangeCost = 0

  for (let x = minRng; x <= maxRng; x++) {
    rangeCost += x * 4
  }

  rangeCost = rangeCost * 0.35 + (maxRng - minRng)

  const speedCost = (speed - 6) * 8
  const sizeCost = isLarge
    ? Math.min(
        Math.max(defenseCost + damageCost + healthCost + rangeCost + speedCost - 30, 0),
        60
      ) / 10
    : 0
  const baseCost = Math.max(
    0,
    Math.round(defenseCost + damageCost + healthCost + rangeCost + speedCost - sizeCost)
  )

  return baseCost
}
