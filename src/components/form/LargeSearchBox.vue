<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { appendRouteQuery } from '@/lib/helpers/appendRouteQuery'

interface Props {
  queryName: string
}

const { queryName } = defineProps<Props>()

const input = ref<string>('')

const router = useRouter()
const route = useRoute()

watch(input, (newVal) => {
  appendRouteQuery({ route, router, queryName, allowMultipleQuery: false, newValue: newVal })
})

const clickIcon = () => {
  appendRouteQuery({ route, router, queryName, allowMultipleQuery: false, newValue: input.value })
}

const currentQuery = computed(() => {
  return route.query[queryName]
})

watchEffect(() => {
  const val = currentQuery.value
  if (val) {
    input.value = val.toString()
  } else {
    input.value = ''
  }
})
</script>

<template>
  <div class="flex flex-row">
    <input
      id="search"
      :value="input"
      class="w-20 flex-grow px-6 w-full py-3 text-lg leading-5 text-neutral-100 rounded-l-lg border-r-0 border-neutral-950 border bg-neutral-700 border-neutral-950 focus:outline-0 focus:ring-0"
      name="search"
      placeholder="Search"
      @change="input = ($event.target as HTMLInputElement).value"
      @keyup.enter="input = ($event.target as HTMLInputElement).value"
    />
    <div
      class="p-3 bg-alpha-700/50 border-2 border-alpha-500 text-alpha-200 rounded-r-lg cursor-pointer"
      @click="clickIcon"
    >
      <Search :size="30" />
    </div>
  </div>
</template>

<style scoped></style>