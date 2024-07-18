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
    class="flex flex-row gap-4 bg-neutral-700 rounded-md shadow items-center relative"
    style="min-height: 100px"
  >
    <slot />
  </div>
</template>

<style scoped></style>
