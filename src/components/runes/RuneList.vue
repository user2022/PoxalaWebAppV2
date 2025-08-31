<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ClientPagination from '@/components/pagination/ClientPagination.vue'
import RuneListItem from '@/components/runes/RuneListItem.vue'
import { Swords } from 'lucide-vue-next'

interface Props {
  runes: any[]
  perPage: number
}

const { runes, perPage } = defineProps<Props>()

const route = useRoute()

const curPage = computed(() => {
  return route.query.page ? parseInt(route.query.page as string) : 0
})
</script>

<template>
  <div
    v-if="runes.length > 0"
    class="w-full flex flex-row justify-center sm:justify-start flex-wrap gap-2.5"
  >
    <template
      v-for="(rune, index) in runes.slice(curPage * perPage, (curPage + 1) * perPage)"
      :key="index"
    >
      <RuneListItem :rune="rune" />
    </template>
  </div>

  <template v-else>
    <div class="w-full flex flex-col items-center justify-center gap-4 text-gray-400 py-20">
      <Swords
        class="w-12 h-12 text-orange-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
      />
      <p class="text-lg font-medium">No runes match your search</p>
    </div>
  </template>
  <!-- Pagination -->
  <template v-if="runes.length > perPage">
    <div class="pr-14">
      <ClientPagination :count="runes.length" :per-page="perPage" />
    </div>
  </template>
</template>

<style scoped></style>
