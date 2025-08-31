<script lang="ts" setup>
import type { Component } from 'vue'

interface Props {
  header: string
  icon?: Component
  iconColor?: string
}

const { header, icon } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2 justify-items-start card-box">
    <div class="flex items-center gap-2">
      <!-- Render icon if passed -->
      <component :is="icon" v-if="icon" :class="iconColor ?? 'text-white'" class="w-5 h-5" />
      <h1 class="uppercase text-white text-xl tracking-wide">{{ header }}</h1>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
