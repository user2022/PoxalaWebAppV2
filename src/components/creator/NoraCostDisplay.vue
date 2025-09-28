<script lang="ts" setup>
interface Props {
  header: string
  value: number | undefined
  customColor?: string
}

const { header, value, customColor } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center gap-2 text-neutral-50 md:justify-start justify-center">
    <h2 class="sm:text-sm text-xs md:text-lg text-center">{{ header }}</h2>
    <div
      :class="`${customColor ? customColor : 'bg-blue-700/50'}`"
      class="sm:w-[32px] sm:h-[32px] w-[22px] h-[22px] text-blue-100 rounded-full flex justify-center items-center font-semibold sm:text-md text-xs"
    >
      {{ value ?? 'N/A' }}
    </div>
  </div>
</template>

<style scoped></style>
