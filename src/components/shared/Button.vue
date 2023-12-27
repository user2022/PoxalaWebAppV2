<script lang="ts" setup>
interface Props {
  label: string
  onClick?: () => void
  type?: 'primary' | 'secondary' | 'danger'
  cClass?: string
}

const { label, onClick, type, cClass } = defineProps<Props>()
</script>

<template>
  <button
    :class="
      cClass +
      ` ${(type === 'primary' || !type) && 'bg-alpha-700/50 border-alpha-400'} ${
        type === 'secondary' && 'bg-neutral-700/50 border-neutral-400'
      } ${type === 'danger' && 'bg-red-700/50 border-red-400'}`
    "
    :label="label"
    class="px-2 py-1 text-neutral-50 border rounded-md inline-block focus:outline-0 focus:ring-0"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<style scoped></style>
