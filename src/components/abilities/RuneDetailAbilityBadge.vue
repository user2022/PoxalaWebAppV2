<script lang="ts" setup>
interface Props {
  value: number
  label: string
}

const { value, label } = defineProps<Props>()
</script>

<template>
  <div class="bg-alpha-700/50 rounded-md px-1 py-0.5 text-neutral-200">
    <p class="tracking-wide" style="font-size: 11px">
      {{ label }}:
      <span class="font-semibold">{{ value }}</span>
    </p>
  </div>
</template>

<style scoped></style>