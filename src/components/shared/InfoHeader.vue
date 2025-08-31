<script lang="ts" setup>
interface Props {
  label: string
}

const { label } = defineProps<Props>()
</script>

<template>
  <div
    class="rounded-md w-auto font-semibold py-0.5 px-1.5 shadow self-start bg-gradient-to-r from-purple-400/50 to-orange-400/50 text-white"
    style="font-size: 13px"
  >
    <span>{{ label }}</span>
  </div>
</template>

<style scoped></style>
