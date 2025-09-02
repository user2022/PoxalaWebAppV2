<script lang="ts" setup>
interface Props {
  clickable?: boolean
  noPadding?: boolean
}

const { clickable, noPadding } = defineProps<Props>()
</script>

<template>
  <div
    :class="`${clickable ? 'cursor-pointer' : 'cursor-default'} ${noPadding ? 'p-0' : 'py-2 px-4'}`"
    class="flex flex-row gap-4 p-4 transition-all duration-200 border rounded-xl bg-gray-800/30 hover:bg-gray-800/50 border-gray-700 hover:border-gray-500 shadow items-center relative h-auto sm:h-[100px]"
  >
    <slot />
  </div>
</template>

<style scoped></style>
