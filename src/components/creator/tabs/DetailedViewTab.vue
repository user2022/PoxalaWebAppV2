<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import CardFront from '@/components/runes/rune-display/CardFront.vue'
import DetailedRune from '@/components/runes/detailed-view/DetailedRune.vue'

interface Props {
  rune: Champion
}

const { rune } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-row gap-12">
    <div class="flex flex-col gap-4 items-center">
      <CardFront :rune="rune" />
      <div class="flex flex-col gap-2 text-neutral-200 text-sm text-center -mt-4">
        <p class="text-xs text-gray-950 font-semibold">Champion ID: {{ rune.id }}</p>
        <p>
          Base Nora Cost: <span class="font-semibold">{{ rune.baseNoraCost }}</span>
        </p>
        <p>
          Abilities Nora Cost: <span class="font-semibold">{{ rune.abilityNoraCost }}</span>
        </p>
        <p>
          Nora Modifier: <span class="font-semibold">{{ rune.noraMod }}</span>
        </p>
        <p
          class="py-1 px-2.5 border border-2 border-alpha-700/50 border-dashed rounded-md text-base"
        >
          Total Nora Cost: <span class="font-semibold">{{ rune.noraCost }}</span>
        </p>
      </div>
    </div>
    <DetailedRune :rune="rune" />
  </div>
</template>

<style scoped></style>
