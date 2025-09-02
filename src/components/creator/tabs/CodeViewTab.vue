<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import { useToastStore } from '@/stores/toast'
import { ClipboardCopy, Code } from 'lucide-vue-next'
import Button from '@/components/shared/Button.vue'

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
  <div class="flex flex-col gap-3">
    <div
      class="bg-gray-800/50 rounded-xl p-4 relative overflow-y-scroll overflow-x-hidden max-h-[520px]"
    >
      <div class="flex flex-row gap-2 items-center cursor-default mb-3 select-none">
        <Code class="h-4 w-4 text-blue-400" />
        <span class="text-sm font-medium text-blue-400">JSON Export</span>
      </div>
      <pre><code class="text-sm text-neutral-200">{{ JSON.stringify(transformRuneToOutput(), null, 2) }}</code></pre>
    </div>
    <div>
      <Button label="Copy JSON to Clipboard" size="sm" variant="default" @click="onClickShare">
        <template #icon><component :is="ClipboardCopy" class="w-5 h-5" /> </template>
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
