<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ClientPagination from '@/components/pagination/ClientPagination.vue'
import RuneListItem from '@/components/runes/RuneListItem.vue'

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
  <div v-if="runes.length > 0" class="flex flex-row justify-start flex-wrap gap-2.5">
    <template
      v-for="(rune, index) in runes.slice(curPage * perPage, (curPage + 1) * perPage)"
      :key="index"
    >
      <RuneListItem :rune="rune" />
    </template>
  </div>
  <div v-else class="mt-12 ml-12">
    <h1 class="text-2xl text-red-700 font-bold text-center">No runes match your search</h1>
  </div>
  <!-- Pagination -->
  <template v-if="runes.length > perPage">
    <div class="pr-14">
      <ClientPagination :count="runes.length" :per-page="perPage" />
    </div>
  </template>
</template>

<style scoped></style>
