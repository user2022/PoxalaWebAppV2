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
    <DetailBlock :value="cost" label="Nora" />
    <DetailBlock :value="apCost" c-class="bg-purple-400" label="AP" />
    <DetailBlock :value="cooldown" c-class="bg-teal-400" label="CD" />
  </div>
</template>

<style scoped></style>
