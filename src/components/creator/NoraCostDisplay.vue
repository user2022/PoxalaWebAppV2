<script lang="ts" setup>
interface Props {
  header: string
  value: number | undefined
}

const { header, value } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center gap-2 text-neutral-50">
    <h2 class="text-lg font-semibold">{{ header }}</h2>
    <div
      class="w-[32px] h-[32px] bg-alpha-700/50 text-alpha-100 rounded-full flex justify-center items-center font-semibold"
    >
      {{ value ?? 'N/A' }}
    </div>
  </div>
</template>

<style scoped></style>
