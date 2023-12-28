<script lang="ts" setup>
import type { Navigation } from '@/types/Navigation'
import { useRoute, useRouter } from 'vue-router'
import { Paintbrush } from 'lucide-vue-next'

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
    url: '/discord',
    name: 'Discord xD'
  }
]

// TODO : Change select box to just an icon into dropdown

const router = useRouter()

const pathName = useRoute().path
</script>

<template>
  <div
    class="w-full bg-neutral-900 gap-10 p-4 text-white flex flex-row items-center justify-center relative"
  >
    <h1 class="text-3xl font-bold text-alpha-500">Poxala</h1>
    <template v-for="item in nav" :key="item.name">
      <div
        :class="{ 'bg-alpha-700/50 border-alpha-400': pathName == item.url }"
        class="cursor-pointer rounded-lg text-white font-semibold px-4 py-1.5 border border-transparent hover:bg-alpha-700/50 hover:border-alpha-400 transition-all"
        @click="router.push(item.url)"
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