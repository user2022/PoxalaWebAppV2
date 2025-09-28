<script lang="ts" setup>
import { ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
import PaginationButton from '@/components/pagination/PaginationButton.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

interface Props {
  count: number
  perPage: number
}

const { count } = defineProps<Props>()

const route = useRoute()

const curPage = computed(() => {
  return route.query.page ? parseInt(route.query.page as string) : 0
})
</script>

<template>
  <div
    class="flex justify-between sm:flex-1 flex-wrap gap-4 sm:flex sm:items-center sm:justify-between"
  >
    <p class="sm:text-sm text-xs text-gray-700 dark:text-zinc-200">
      Showing
      <span class="font-medium">{{ curPage * perPage }}</span>
      to
      <span class="font-medium">{{ curPage * perPage + perPage }}</span>
      of
      <span class="font-medium">{{ count }}</span>
      results
    </p>
    <nav
      aria-label="Pagination"
      class="relative z-0 inline-flex sm:gap-2 gap-1 rounded-md shadow-sm -space-x-px"
    >
      <PaginationButton :num="0">
        <ChevronsLeft :size="16" />
      </PaginationButton>
      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->

      <PaginationButton v-if="curPage - 3 > 0 - 1" :num="-3">
        {{ curPage - 2 }}
      </PaginationButton>

      <PaginationButton v-if="curPage - 2 > 0 - 1" :num="-2">
        {{ curPage - 1 }}
      </PaginationButton>

      <PaginationButton v-if="curPage - 1 > 0 - 1" :num="-1">
        {{ curPage }}
      </PaginationButton>

      <span
        class="z-10 bg-gradient-to-r from-purple-400/60 to-orange-400/60 text-white rounded-md relative inline-flex items-center px-1 py-0.5 sm:px-2 sm:py-1 border border-transparent text-sm font-medium w-[26px] sm:w-[32px]"
      >
        <span class="mx-auto text-shadow-md">{{ curPage + 1 }}</span>
      </span>

      <PaginationButton v-if="curPage + 1 < count / perPage" :num="1">
        {{ curPage + 2 }}
      </PaginationButton>

      <PaginationButton v-if="curPage + 2 < count / perPage" :num="2">
        {{ curPage + 3 }}
      </PaginationButton>

      <PaginationButton v-if="curPage + 3 < count / perPage" :num="3">
        {{ curPage + 4 }}
      </PaginationButton>

      <PaginationButton :num="Math.floor(count / perPage)">
        <ChevronsRight :size="16" />
      </PaginationButton>
    </nav>
  </div>
</template>

<style scoped></style>
