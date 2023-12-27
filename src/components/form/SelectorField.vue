<script lang="ts" setup>
import type { Options } from '@/types/Options'

interface Props {
  options: Options[]
}

const { options } = defineProps<Props>()
</script>

<template>
  <div
    class="rounded-md flex flex-row items-center bg-neutral-700 border border-neutral-900 px-2 h-9"
  >
    <select class="bg-neutral-700 text-sm text-neutral-200 px-1.5 py-1.5">
      <template v-for="opt in options" :key="opt.value">
        <option :value="opt.value">{{ opt.name }}</option>
      </template>
    </select>
  </div>
</template>

<style scoped></style>