<script lang="ts" setup>
interface Props {
  name: string
}

const { name } = defineProps<Props>()
</script>

<template>
  <h1 class="z-30 absolute text-center rune-name text-white">
    {{ name }}
  </h1>
</template>

<style scoped></style>
