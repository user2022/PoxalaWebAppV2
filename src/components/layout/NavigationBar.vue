<script lang="ts" setup>
import type { Navigation } from '@/types/Navigation'
import { useRoute, useRouter } from 'vue-router'
import { Paintbrush } from 'lucide-vue-next'
import { computed, watch } from 'vue'
import { useRuneStore } from '@/stores/rune'
import { useRouteStore } from '@/stores/storeRoute'

const nav: Navigation[] = [
  {
    url: '/',
    name: 'Runes'
  },
  {
    url: '/abilities',
    name: 'Abilities'
  },
  {
    url: '/rune-creator',
    name: 'Rune Creator'
  },
  {
    url: '/discord',
    name: 'Discord xD'
  }
]

// TODO : Change select box to just an icon into dropdown

const router = useRouter()
const route = useRoute()

const pathName = computed(() => {
  return useRoute().path
})

watch(
  () => route.path,
  () => {
    // Reset store states
    const { setRune } = useRuneStore()
    const { removeAllQueries } = useRouteStore()

    setRune(null)
    removeAllQueries()
  }
)
</script>

<template>
  <div
    class="w-full bg-neutral-900 gap-10 p-4 text-white flex flex-row items-center justify-center relative"
  >
    <h1 class="text-3xl font-bold text-alpha-500">Poxala</h1>
    <template v-for="item in nav" :key="item.name">
      <div
        :class="[
          'cursor-pointer rounded-lg text-white font-semibold px-4 py-1.5 transition-all',
          pathName == item.url
            ? 'bg-alpha-700/50 border-alpha-400 border'
            : 'hover:bg-alpha-700/50 hover:border-alpha-400 border border-transparent'
        ]"
        @click="
          () => {
            router.push(item.url)
          }
        "
      >
        {{ item.name }}
      </div>
    </template>
    <!--    <SelectorField />-->
    <div>
      <Paintbrush :size="24" :stroke-width="1.25" />
    </div>
  </div>
</template>

<style scoped></style>