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
    class="cursor-pointer relative inline-flex items-center px-3 py-2 border border-neutral-900 text-sm font-medium bg-neutral-700 text-neutral-300"
    @click="changePage(num)"
  >
    <slot />
  </a>
</template>

<style scoped></style>
