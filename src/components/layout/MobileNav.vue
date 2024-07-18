<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { nav } from '@/lib/data/NavData'
import { useRuneStore } from '@/stores/rune'
import { useRouteStore } from '@/stores/storeRoute'
import { ChevronLeft } from 'lucide-vue-next'
import ThemeSelector from '@/components/shared/ThemeSelector.vue'

const router = useRouter()
const route = useRoute()

const pathName = computed(() => {
  return route.path
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
    <div class="flex justify-between items-center bg-neutral-900 p-4">
      <div class="flex items-center">
        <h1 class="text-2xl font-bold text-alpha-500 ml-2">Poxala</h1>
      </div>
      <div class="flex items-center gap-7">
        <!-- Added container for the new element and the button -->
        <ThemeSelector />
        <button ref="burgerBtn" class="text-white" @click="toggleMenu">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6h16M4 12h16m-7 6h7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
    </div>
    <transition name="dropdown">
      <div
        v-show="open"
        ref="target"
        class="flex flex-col absolute top-full bg-neutral-900 border-t-2 border-neutral-600 w-full z-50"
      >
        <template v-for="item in nav" :key="item.name">
          <div
            :class="[
              'w-full text-neutral-50 py-4 px-4 border-t border-neutral-700 first:border-t-0 cursor-pointer font-semibold hover:text-alpha-500 flex flex-row items-center gap-4',
              pathName == item.url ? 'text-alpha-500' : ''
            ]"
            @click="
              () => {
                router.push(item.url)
                closeMenu()
              }
            "
          >
            <p>{{ item.name }}</p>
            <ChevronLeft v-if="pathName === item.url" :size="20" color="#0EA5E9" />
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Define the dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: max-height 0.3s ease-in-out;
}

.dropdown-enter, .dropdown-leave-to /* .dropdown-leave-active in <2.1.8 */ {
  max-height: 0;
  overflow: hidden;
}

.dropdown-enter-to, .dropdown-leave /* .dropdown-enter-active in <2.1.8 */ {
  max-height: 400px; /* Adjust this value based on the content height */
}
</style>
