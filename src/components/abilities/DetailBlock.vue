<script lang="ts" setup>
interface Props {
  label: string
  value: string | number
  cClass?: string
  fontSize?: string
}

const { label, value, cClass, fontSize } = defineProps<Props>()
</script>

<template>
  <div
    :class="cClass ? cClass : 'bg-blue-400/30 border border-blue-400'"
    :style="fontSize ? `font-size: ${fontSize}` : 'font-size: 13px'"
    class="rounded-md text-white py-0.5 px-1.5 self-center shadow"
  >
    <span class="text-outline">{{ label }}: {{ value }}</span>
  </div>
</template>

<style scoped></style>
