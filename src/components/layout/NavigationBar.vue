<script lang="ts" setup>
import type { Navigation } from '@/types/Navigation'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useRuneStore } from '@/stores/rune'
import { useRouteStore } from '@/stores/storeRoute'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
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
    url: '/rune-creator',
    name: 'Rune Creator'
  },
  {
    url: '/relocation',
    name: 'Relocation'
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

const themeOpts = [
  {
    name: 'Sky Blue',
    value: 'sky-blue'
  }
]

const onThemeClick = (val: string) => {
  localStorage.setItem('theme', val)
}
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
      <Menu as="div" class="relative inline-block">
        <MenuButton>
          <Paintbrush :size="24" :stroke-width="1.25" />
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-neutral-700 shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <template v-for="item in themeOpts" :key="item.value">
                <MenuItem v-slot="{ active }" @click="onThemeClick(item.value)">
                  <button
                    :class="[
                      active ? 'bg-alpha-700/40' : 'text-gray-900',
                      'group flex w-full items-center text-white font-semibold rounded-md px-2 py-2 text-sm'
                    ]"
                  >
                    {{ item.name }}
                  </button>
                </MenuItem>
              </template>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<style scoped></style>