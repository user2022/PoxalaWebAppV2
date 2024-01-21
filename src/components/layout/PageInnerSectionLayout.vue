<script lang="ts" setup>
interface Props {
  header: string
}

const { header } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2 justify-items-start">
    <h1 class="uppercase text-neutral-400 text-xl tracking-wide">{{ header }}</h1>
    <slot />
  </div>
</template>

<style scoped></style>
