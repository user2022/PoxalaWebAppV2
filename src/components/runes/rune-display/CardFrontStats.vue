<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import { displayRange } from '../../../lib/displayRange'

interface Props {
  rune: Champion
  customClass: string
}

const { rune, customClass } = defineProps<Props>()

const poxApi = import.meta.env.VITE_POXAPI
</script>

<template>
  <div :class="customClass" class="flex flex-col gap-1" style="width: 332px">
    <img :src="`${poxApi}/_themes/global/frames/large/rune_stats.png`" alt="rune-stats" />
    <div class="flex flex-row text-white shadow text-center stat-font">
      <div class="stat">{{ rune.damage ?? '' }}</div>
      <div class="stat">{{ rune.speed ?? '' }}</div>
      <div class="stat">
        {{ displayRange(rune.minRng, rune.maxRng) }}
      </div>
      <div class="stat">{{ rune.defense ?? '' }}</div>
      <div class="stat">{{ rune.hitPoints ?? '' }}</div>
    </div>
  </div>
</template>

<style scoped>
.stat {
  width: 50px;
  text-align: center;
}

.stat:first-child {
  margin-left: 40px;
}

.stat-font {
  font:
    normal 12px arial,
    sans-serif;
}
</style>