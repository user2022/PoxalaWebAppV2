<script lang="ts" setup>
import type { Options } from '@/types/Options'
import InputLabel from '@/components/form/InputLabel.vue'

interface Props {
  options: Options[]
  label?: string
}

const { options } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <template v-if="label">
      <InputLabel :label="label" />
    </template>
    <select class="bg-neutral-700 text-sm text-neutral-200 px-2 py-1.5 rounded-md">
      <template v-for="opt in options" :key="opt.value">
        <option :disabled="opt.disabled ?? false" :value="opt.value">{{ opt.name }}</option>
      </template>
    </select>
  </div>
</template>

<style scoped></style>