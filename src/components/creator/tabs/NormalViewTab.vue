<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import CardFront from '@/components/runes/rune-display/CardFront.vue'
import CardBack from '@/components/runes/rune-display/CardBack.vue'

interface Props {
  rune: Champion | null
}

const { rune } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-row gap-12">
    <template v-if="rune">
      <CardFront :rune="rune" />
      <CardBack :rune="rune" />
    </template>
    <template v-else>
      <h2 class="text-neutral-500 font-bold text-6xl text-center m-auto">Select a Rune</h2>
    </template>
  </div>
</template>

<style scoped></style>