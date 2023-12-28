<script lang="ts" setup>
interface Props {
  label: string
  value: string | number
  cClass?: string
}

const { label, value, cClass } = defineProps<Props>()
</script>

<template>
  <div
    :class="cClass ? cClass : 'bg-blue-400'"
    class="rounded-md text-white font-semibold py-0.5 px-1.5 self-center shadow"
    style="font-size: 13px"
  >
    <span class="text-outline">{{ label }}: {{ value }}</span>
  </div>
</template>

<style scoped></style>
