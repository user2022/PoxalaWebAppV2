<script lang="ts" setup>
interface Props {
  label: string
  value?: string | number
}

const { label, value } = defineProps<Props>()
</script>

<template>
  <p class="info-txt text-white">
    {{ label }}: <span class="info-txt-val-col">{{ value ?? '' }}</span>
  </p>
</template>

<style scoped>
.info-txt-val-col {
  color: #9fbe52;
}

.info-txt {
  font:
    12px arial,
    sans-serif;
}
</style>
