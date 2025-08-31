<script lang="ts" setup>
interface Props {
  name: string
  value?: string | number
  cClass?: string
  customBg?: string
}

const { name, value, cClass, customBg } = defineProps<Props>()
</script>

<template>
  <div
    :class="`${cClass} ${customBg ?? 'bg-gray-800/50'}`"
    class="px-2 py-1 w-full flex justify-between items-center rounded-md"
  >
    <p>{{ name }}</p>
    <p>{{ value ?? 0 }}</p>
  </div>
</template>

<style scoped></style>
