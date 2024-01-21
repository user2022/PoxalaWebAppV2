<script lang="ts" setup>
interface Props {
  abilityLevel?: number
}

const { abilityLevel } = defineProps<Props>()
</script>

<template>
  <div
    v-if="abilityLevel"
    class="w-[18px] h-[18px] bg-alpha-400 rounded-full flex justify-center items-center"
  >
    <p class="text-white font-semibold text-sm text-outline">{{ abilityLevel }}</p>
  </div>
</template>

<style scoped></style>
