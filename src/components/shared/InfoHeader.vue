<script lang="ts" setup>
interface Props {
  label: string
}

const { label } = defineProps<Props>()
</script>

<template>
  <div
    class="rounded-md w-auto font-semibold py-0.5 px-1.5 shadow text-alpha-100 bg-alpha-700/50 self-start"
    style="font-size: 13px"
  >
    <span>{{ label }}</span>
  </div>
</template>

<style scoped></style>
