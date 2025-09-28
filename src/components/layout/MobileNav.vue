<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useRuneStore } from '@/stores/rune'
import { useRouteStore } from '@/stores/storeRoute'
import { Crown, Menu, X } from 'lucide-vue-next'
import { navigationItems, utilityItems } from '@/lib/data/NavData'

const router = useRouter()
const route = useRoute()

const activeSection = computed(() => route.name as string)

watch(
  () => route.name,
  () => {
    const { setRune } = useRuneStore()
    const { removeAllQueries } = useRouteStore()
    setRune(null)
    removeAllQueries()
  }
)

const target = ref(null)
const open = ref(false)
const burgerBtn = ref(null)

const toggleMenu = () => {
  open.value = !open.value
}

const closeMenu = () => {
  open.value = false
}

onClickOutside(target, closeMenu, { ignore: [burgerBtn] })
</script>

<template>
  <div class="relative">
    <!-- Top Bar -->
    <div
      class="flex justify-between items-center bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 p-2"
    >
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <Crown class="h-8 w-8 text-purple-400" />
          <!--            <Swords class="h-8 w-8 text-orange-400" />-->
        </div>
        <div>
          <h1
            class="text-xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent w-max"
          >
            Poxala
          </h1>
          <p class="text-xs text-gray-400">Rune Database & Deck Builder</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <!--        <ThemeSelector />-->
        <button ref="burgerBtn" class="text-gray-300 hover:text-white" @click="toggleMenu">
          <Menu v-if="!open" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Dropdown Nav -->
    <transition name="dropdown">
      <div
        v-show="open"
        ref="target"
        class="flex flex-col absolute top-full left-0 bg-gray-900/95 backdrop-blur-md border-t border-b border-gray-700 w-full z-50 shadow-lg"
      >
        <!-- Main Nav Items -->
        <template v-for="item in navigationItems" :key="item.id">
          <div
            :class="[
              'flex items-center gap-3 py-3 px-5 cursor-pointer transition-all',
              activeSection === item.id
                ? 'bg-gray-800/60 text-white'
                : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
            ]"
            @click="
              () => {
                router.push({ name: item.id })
                closeMenu()
              }
            "
          >
            <!-- Text -->
            <span class="font-medium text-sm">{{ item.label }}</span>

            <!-- Icon -->
            <component
              :is="item.icon"
              :class="activeSection === item.id ? item.color : 'text-gray-400'"
              class="h-5 w-5 ml-auto"
            />

            <!-- Active marker -->
            <div
              v-if="activeSection === item.id"
              class="ml-2 h-0.5 w-10 rounded-full bg-gradient-to-r from-purple-400 to-orange-400"
            />
          </div>
        </template>

        <!-- Divider + Other header -->
        <div class="border-t border-gray-700 my-2" />
        <div class="px-5 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Other
        </div>

        <!-- Utility Items -->
        <template v-for="item in utilityItems" :key="item.id">
          <div
            v-if="!item.external"
            :class="[
              'flex items-center gap-3 py-3 px-5 cursor-pointer transition-all',
              activeSection === item.id
                ? 'bg-gray-800/60 text-white'
                : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
            ]"
            @click="
              () => {
                router.push({ name: item.id })
                closeMenu()
              }
            "
          >
            <span class="font-medium text-sm">{{ item.label }}</span>
            <component :is="item.icon" :class="item.color" class="h-5 w-5 ml-auto" />
          </div>

          <!-- External links (like Discord) -->
          <a
            v-else
            :href="item.href"
            class="flex items-center gap-3 py-3 px-5 text-gray-300 hover:bg-gray-800/40 hover:text-white transition-all"
            rel="noopener noreferrer"
            target="_blank"
            @click="closeMenu"
          >
            <span class="font-medium">{{ item.label }}</span>
            <component :is="item.icon" :class="item.color" class="h-5 w-5 ml-auto" />
          </a>
        </template>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Smooth slide down */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
