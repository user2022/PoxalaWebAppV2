<script lang="ts" setup>
import type { Champion } from '@/types/Champion'

interface Props {
  rune: Champion
}

interface Stats {
  damage: number
  speed: number
  hitPoints: number
  minRng: number
  maxRng: number
  defense: number
}

interface outputRune {
  id: number
  stats: Stats
  baseAbilities: number[]
  upgradePath1Abilities: number[]
  upgradePath2Abilities: number[]
  upgradePath1DefaultAbility: number
  upgradePath2DefaultAbility: number
  noraCost: number
}

const { rune } = defineProps<Props>()

const transformRuneToOutput = (): outputRune => {
  const baseAbilityIds = rune.startingAbilities
    ?.map((ability) => ability.id)
    .filter((id) => id !== 999999)
  const u1AbilityIds = rune.abilitySets?.[0]?.abilities
    ?.map((ability) => ability.id)
    .filter((id) => id !== 999999)
  const u2AbilityIds = rune.abilitySets?.[1]?.abilities
    ?.map((ability) => ability.id)
    .filter((id) => id !== 999999)
  const u1DefaultId = rune.abilitySets?.[0]?.abilities?.find((ability) => ability.default)?.id
  const u2DefaultId = rune.abilitySets?.[1]?.abilities?.find((ability) => ability.default)?.id

  return {
    id: rune.id,
    stats: {
      damage: rune.damage,
      speed: rune.speed,
      hitPoints: rune.hitPoints,
      minRng: rune.minRng,
      maxRng: rune.maxRng,
      defense: rune.defense
    },
    baseAbilities: baseAbilityIds as number[],
    upgradePath1Abilities: u1AbilityIds as number[],
    upgradePath2Abilities: u2AbilityIds as number[],
    upgradePath1DefaultAbility: u1DefaultId as number,
    upgradePath2DefaultAbility: u2DefaultId as number,
    noraCost: rune.noraCost
  }
}
</script>

<template>
  <div class="bg-neutral-900/70 rounded-md px-4 py-2">
    <pre><code class="text-sm text-neutral-200">{{ JSON.stringify(transformRuneToOutput(), null, 2) }}</code></pre>
  </div>
</template>

<style scoped></style>
