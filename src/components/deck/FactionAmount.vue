<script lang="ts" setup>
import CardFactionIcon from '@/components/runes/rune-display/CardFactionIcon.vue'
import type { FactionAmt } from '@/types/FactionAmt'

interface Props extends FactionAmt {
  textCol?: string
}

const { factionNumber, amount, textCol } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center">
    <CardFactionIcon
      :faction-one="factionNumber.toString()"
      :faction-two="factionNumber.toString()"
    />
    <span :class="textCol ?? ''" class="font-semibold text-sm">{{ amount }}</span>
  </div>
</template>

<style scoped></style>
