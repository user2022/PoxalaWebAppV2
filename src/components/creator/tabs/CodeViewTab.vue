<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import ShareBtn from '@/components/shared/icon-btns/ShareBtn.vue'
import { useToastStore } from '@/stores/toast'

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
  size: string
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
    noraCost: rune.noraCost,
    size: rune.size
  }
}

const onClickShare = async () => {
  const toast = useToastStore()
  try {
    if (!navigator.clipboard) {
      toast.setToast('Clipboard API not available')
      return
    }
    await navigator.clipboard.writeText(JSON.stringify(transformRuneToOutput(), null, 2))
    toast.setToast('Copied JSON to Clipboard')
  } catch (err) {
    toast.setToast('Error copying JSON to clipboard')
  }
}
</script>

<template>
  <div class="bg-neutral-900/70 rounded-md px-4 py-2 relative">
    <div class="absolute top-2 right-2">
      <ShareBtn :on-click="onClickShare" class="absolute top-3 right-3" />
    </div>
    <pre><code class="text-sm text-neutral-200">{{ JSON.stringify(transformRuneToOutput(), null, 2) }}</code></pre>
  </div>
</template>

<style scoped></style>
