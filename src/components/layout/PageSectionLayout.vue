<script lang="ts" setup>
interface Props {
  header: string
}

const { header } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2 mt-2">
    <h1 class="text-3xl font-semibold mb-2 text-neutral-100">
      {{ header }}
    </h1>
    <slot />
  </div>
</template>

<style scoped></style>
