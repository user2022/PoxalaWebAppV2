<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { X } from 'lucide-vue-next'
import { computed } from 'vue'
import type { Options } from '@/types/Options'
import { getRouteQueriesForFilter, transformOptionsToQuery } from '@/lib/getRouteQueriesForFilter'
import { formatString } from '../../lib/formatString'
import { getColoursForFilter } from '@/lib/getColoursForFilter'
import { getGreaterLessSymbol } from '../../lib/getGreaterLessSymbol'

const route = useRoute()
const router = useRouter()

const currentRouteQueries = computed(() => {
  return getRouteQueriesForFilter(route.query)
})

const removeSelectedQuery = (query: Options) => {
  const newQueries = transformOptionsToQuery(
    currentRouteQueries.value.filter((q) => q.value !== query.value)
  )
  router.replace({
    query: { ...newQueries }
  })
}

const clearAllFilters = () => {
  router.replace({
    query: {}
  })
}
</script>

<template>
  <div
    v-if="currentRouteQueries.filter((query) => query.name !== 'page').length > 0"
    class="flex flex-row gap-4 items-center flex-wrap"
  >
    <span class="text-neutral-400 uppercase tracking-wide cursor-default">Applied Filters: </span>
    <template v-for="(query, index) in currentRouteQueries" :key="query.value + index">
      <div
        v-if="query.name !== 'page'"
        :class="`${getColoursForFilter(query.name).bgCol} ${
          getColoursForFilter(query.name).textCol
        } ${getColoursForFilter(query.name).borderCol}`"
        class="flex flex-row justify-between border rounded-md items-center text-sm h-auto pl-1"
      >
        <div class="py-1.5 px-2 whitespace-nowrap">
          <span class="font-semibold">{{ formatString(query.name) }}:</span>
          <span class="mx-2">{{ formatString(getGreaterLessSymbol(query.value.toString())) }}</span>
        </div>
        <div
          :class="`${getColoursForFilter(query.name).borderCol}`"
          class="py-2 px-2 border-l cursor-pointer"
          @click="removeSelectedQuery(query)"
        >
          <X :size="16" />
        </div>
      </div>
    </template>
    <button
      class="bg-gray-700/50 border border-gray-500 py-1.5 px-2.5 text-gray-100 rounded-md h-auto text-sm"
      @click="clearAllFilters"
    >
      Clear all Filters
    </button>
  </div>
</template>

<style scoped></style>