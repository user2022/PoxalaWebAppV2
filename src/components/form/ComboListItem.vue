<script lang="ts" setup>
import { ChevronRight } from 'lucide-vue-next'
import type { Options } from '@/types/Options'
import { computed } from 'vue'

interface Props {
  active: boolean
  selected: boolean
  option: Options
  increaseSliceAmount: () => void
}

const { active, selected, option, increaseSliceAmount } = defineProps<Props>()

const checkIfShowMore = computed(() => {
  return option.value === 'show-more'
})

const click = () => {
  if (checkIfShowMore.value) increaseSliceAmount()
}
</script>

<template>
  <li
    :class="{
      'bg-gray-700 border-alpha-400 text-neutral-50': active,
      'text-neutral-100': !active,
      'cursor-pointer': checkIfShowMore
    }"
    class="relative cursor-default select-none py-1.5 sm:pl-6 pl-4 md:pl-7 pr-4 z-40"
    @click="click"
  >
    <span
      :class="{ 'font-medium': selected, 'font-normal': !selected }"
      class="block truncate text-sm"
    >
      {{ option.name }}
    </span>
    <span
      v-if="selected"
      :class="{ 'text-neutral-50': active, 'text-gray-500': !active }"
      class="absolute inset-y-0 left-0 flex items-center sm:pl-1.5 md:pl-2 pl-0"
    >
      <ChevronRight :size="16" />
    </span>
  </li>
</template>

<style scoped></style>
