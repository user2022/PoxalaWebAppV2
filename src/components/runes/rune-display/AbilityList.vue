<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import AbilityDisplay from '@/components/runes/rune-display/AbilityDisplay.vue'

interface Props {
  rune: Champion
}

const { rune } = defineProps<Props>()

// const { rune } = storeToRefs(runeStore)

const poxApi = import.meta.env.VITE_POXAPI
</script>

<template>
  <div
    class="grid grid-cols-2 grid-rows-4 grid-flow-col-dense gap-y-1 gap-x-3 absolute top-32 mt-2 left-9 z-30"
  >
    <template v-for="(ability, index) in rune.transformedAbilities" :key="`${ability.id}-${index}`">
      <AbilityDisplay :ability="ability" />
    </template>
  </div>
</template>

<style scoped></style>