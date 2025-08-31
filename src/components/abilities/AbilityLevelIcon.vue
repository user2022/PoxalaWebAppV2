<script lang="ts" setup>
interface Props {
  abilityLevel?: number
}

const { abilityLevel } = defineProps<Props>()
</script>

<template>
  <div
    v-if="abilityLevel"
    class="w-[18px] h-[18px] bg-cyan-400/30 border border-cyan-500 rounded-full flex justify-center items-center"
  >
    <p class="text-gray-50 font-semibold text-xs text-outline">{{ abilityLevel }}</p>
  </div>
</template>

<style scoped></style>
