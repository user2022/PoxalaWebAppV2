<script lang="ts" setup>
interface Props {
  cost: number
  label: string
}

const { cost, label } = defineProps<Props>()
</script>

<template>
  <div class="text-neutral-200 uppercase tracking-wide text-sm flex flex-col items-center gap-2">
    <p>{{ label }}</p>
    <div
      class="w-[26px] h-[26px] bg-alpha-700/50 text-alpha-100 rounded-full flex justify-center items-center font-semibold"
    >
      <span class="text-xs">{{ cost }}</span>
    </div>
  </div>
</template>

<style scoped></style>
