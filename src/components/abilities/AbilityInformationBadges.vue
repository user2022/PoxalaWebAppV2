<script lang="ts" setup>
import DetailBlock from '@/components/abilities/DetailBlock.vue'

interface Props {
  cost: number
  apCost: number
  cooldown: number
}

const { cost, apCost, cooldown } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-row gap-2">
    <DetailBlock :value="cost" c-class="bg-blue-600/30 border border-blue-600" label="Nora" />
    <DetailBlock :value="apCost" c-class="bg-purple-600/30 border border-purple-600" label="AP" />
    <DetailBlock :value="cooldown" c-class="bg-teal-600/30 border border-teal-600" label="CD" />
  </div>
</template>

<style scoped></style>
