<script lang="ts" setup>
import CardFactionIcon from '@/components/runes/rune-display/CardFactionIcon.vue'
import type { FactionAmt } from '@/types/FactionAmt'

const { factionNumber, amount } = defineProps<FactionAmt>()
</script>

<template>
  <div class="flex flex-col items-center">
    <CardFactionIcon :faction-one="factionNumber" :faction-two="factionNumber" />
    <span class="font-semibold text-sm">{{ amount }}</span>
  </div>
</template>

<style scoped></style>