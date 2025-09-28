<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

interface Props {
  num: number
}

const { num } = defineProps<Props>()

const route = useRoute()
const router = useRouter()

let curPage = computed(() => {
  return route.query.page ? parseInt(route.query.page as string) : 0
})

const changePage = (num: number) => {
  if (num === 0) router.push({ query: { ...route.query, page: 0 } })
  else if (num > 3) router.push({ query: { ...route.query, page: num } })
  else router.push({ query: { ...route.query, page: curPage.value + num } })
}
</script>

<template>
  <a
    class="cursor-pointer relative inline-flex items-center rounded-md py-0.5 px-1 sm:py-1 sm:px-2 bg-gray-800 border border-gray-600 text-white text-sm font-medium w-[26px] sm:w-[32px]"
    @click="changePage(num)"
  >
    <span class="mx-auto"><slot /></span>
  </a>
</template>

<style scoped></style>
