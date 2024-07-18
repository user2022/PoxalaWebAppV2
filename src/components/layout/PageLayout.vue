<script lang="ts" setup>
interface Props {
  title: string
  error?: Error
  isLoading?: boolean
  textCentered?: boolean
}

const { title, error, isLoading, textCentered } = defineProps<Props>()
</script>

<template>
  <div class="md:mx-20 sm:mx-10 mx-2 my-8 flex flex-col gap-4">
    <h1
      :class="textCentered ? 'text-center' : 'text center md:text-left m-auto md:m-0'"
      class="text-6xl font-bold text-alpha-500 tracking-wide mb-6"
    >
      {{ title }}
    </h1>
    <template v-if="error">
      <p class="text-white">Error: {{ error.message }}</p>
    </template>
    <template v-else-if="isLoading">
      <p class="text-white">Loading...</p>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<style scoped></style>
