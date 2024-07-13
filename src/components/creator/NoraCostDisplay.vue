<script lang="ts" setup>
interface Props {
  header: string
  value: number | undefined
}

const { header, value } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center gap-2 text-neutral-50 sm:justify-start justify-center">
    <h2 class="text-sm sm:text-lg font-semibold text-center">{{ header }}</h2>
    <div
      class="sm:w-[32px] sm:h-[32px] w-[22px] h-[22px] bg-alpha-700/50 text-alpha-100 rounded-full flex justify-center items-center font-semibold sm:text-md text-sm"
    >
      {{ value ?? 'N/A' }}
    </div>
  </div>
</template>

<style scoped></style>
