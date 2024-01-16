<script lang="ts" setup>
interface Props {
  cClass?: string
  onClick?: () => void
}

const { cClass, onClick } = defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'cursor-pointer self-center border border-black overflow-visible text-xs rounded-full p-0.5',
      cClass ?? 'bg-green-600'
    ]"
    @click="onClick"
  >
    <slot />
  </div>
</template>

<style scoped></style>
