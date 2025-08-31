<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useRouteStore } from '@/stores/storeRoute'
import { storeToRefs } from 'pinia'
import InputLabel from '@/components/form/InputLabel.vue'

interface Props {
  queryName: string
  label?: string
  placeholder?: string
}

const { queryName, label, placeholder } = defineProps<Props>()

const input = ref<string>('')

const storeRoute = useRouteStore()
const { queries } = storeToRefs(storeRoute)

watch(input, (newVal) => {
  const queryToFind = queries.value?.find((query) => query.name === queryName)

  if (!input.value && queryToFind) storeRoute.removeFromQuery(queryToFind)
  else storeRoute.addToQuery({ name: queryName, value: newVal })
})

const clickIcon = () => {
  storeRoute.addToQuery({ name: queryName, value: input.value })
}

watch(
  () => queries.value?.find((query) => query.name === queryName)?.value,
  (newVal) => {
    if (newVal) {
      input.value = newVal.toString()
    }
  }
)
</script>

<template>
  <!-- Removed max-w-xl so it can grow, set w-full to stretch -->
  <div class="w-full items-center">
    <InputLabel :label="label ?? 'Search'" />
    <div class="relative mt-1 lg:w-2/6 md:w-3/6 sm:w-full">
      <div
        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
        @click="clickIcon"
      >
        <Search class="h-4 w-4" />
      </div>
      <input
        id="search"
        :placeholder="placeholder ?? 'Search runes...'"
        :value="input"
        class="pl-10 placeholder-gray-400 py-2 px-4 my-input w-full"
        @change="input = ($event.target as HTMLInputElement).value"
        @keyup.enter="input = ($event.target as HTMLInputElement).value"
      />
    </div>
  </div>
</template>

<style scoped></style>
