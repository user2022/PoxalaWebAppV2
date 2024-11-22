<script lang="ts" setup>
interface Props {
  baseRuneValue: number | string
  runeValue: number | string
  text: string
}

const { baseRuneValue, runeValue, text } = defineProps<Props>()
</script>

<template>
  <template v-if="baseRuneValue !== runeValue">
    <p class="text-gray-300">
      {{ text }}
      <span class="text-red-500 font-semibold">{{ baseRuneValue }}</span>
      >
      <span class="text-green-500 font-semibold">{{ runeValue }}</span>
    </p>
  </template>
</template>

<style scoped></style>
