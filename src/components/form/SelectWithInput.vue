<script lang="ts" setup>
import InputLabel from '@/components/form/InputLabel.vue'
import { ref, watch } from 'vue'
import { useRouteStore } from '@/stores/storeRoute'

interface Props {
  label: string
  queryName: string
  type?: string
}

const { label, queryName, type } = defineProps<Props>()

const symbol = ref<string>(':gt')
const input = ref<number | string>()

const routeStore = useRouteStore()

watch(input, (newVal) => {
  const valToUse = newVal ? `${symbol.value} ${newVal}` : ''
  routeStore.addToQuery({ name: queryName, value: valToUse })
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <InputLabel :label="label" />
    <div class="relative flex flex-row mb-1">
      <select
        id="greaterOrLess"
        :value="symbol"
        class="w-auto px-3 py-2 text-xs sm:text-sm text-neutral-100 rounded-l-lg border-r-0 bg-gray-800 border border-gray-600 text-white focus:outline-0 focus:ring-0"
        name="greaterOrLess"
        @change="symbol = ($event.target as HTMLSelectElement).value"
      >
        <option value=":gt">Greater Than</option>
        <option value=":lt">Less Than</option>
      </select>
      <input
        id="noraCost"
        :type="type ? type : 'text'"
        :value="input"
        class="w-20 px-3 py-2 text-xs sm:text-sm rounded-r-lg border-l-0 bg-gray-800 border border-gray-600 text-white focus:outline-0 focus:ring-0"
        name="noraCost"
        placeholder="Cost"
        @change="input = ($event.target as HTMLInputElement).value"
        @keyup.enter="input = ($event.target as HTMLInputElement).value"
      />
    </div>
  </div>
</template>

<style scoped></style>
