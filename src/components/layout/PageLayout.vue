<script lang="ts" setup>
interface Props {
  title: string
  error?: Error
  isLoading?: boolean
}

const { title, error, isLoading } = defineProps<Props>()
</script>

<template>
  <div class="mx-20 my-8">
    <h1 class="text-6xl font-bold text-alpha-500 tracking-wide mb-6">{{ title }}</h1>
    <template v-if="error">
      <p>Error: {{ error.message }}</p>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<style scoped></style>
