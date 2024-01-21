<script lang="ts" setup>
import InputLabel from '@/components/form/InputLabel.vue'

interface Props {
  label?: string
  name: string
  input: string
  setInput: (val: string) => void
}

const { label, name, input, setInput } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-1.5 relative self-start w-full">
    <InputLabel :label="label" />
    <input
      :id="name"
      :name="name"
      :placeholder="label"
      :value="input"
      class="px-3 py-2 text-sm leading-5 text-neutral-100 rounded-lg border-neutral-950 border bg-neutral-700 focus:outline-0 focus:ring-0"
      type="text"
      @change="setInput(($event.target as HTMLInputElement).value)"
      @keyup.enter="setInput(($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped></style>
