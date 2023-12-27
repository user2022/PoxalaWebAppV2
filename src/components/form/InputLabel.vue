<script lang="ts" setup>
interface Props {
  label: string
}

const { label } = defineProps<Props>()
</script>

<template>
  <span class="text-sm font-medium text-neutral-100">
    {{ label }}
  </span>
</template>

<style scoped></style>