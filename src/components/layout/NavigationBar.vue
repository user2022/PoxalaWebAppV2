<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ChevronDown, Crown, Info } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { navigationItems, utilityItems } from '@/lib/data/NavData'

const router = useRouter()
const route = useRoute()

// sync with current route name
const activeSection = ref(route.name as string)
watch(route, (newRoute) => {
  activeSection.value = newRoute.name as string
})

const showDropdown = ref(false)

function handleItemClick(item: any) {
  activeSection.value = item.id
  showDropdown.value = false
  if (item.href) {
    window.open(item.href, '_blank')
  } else {
    router.push({ name: item.id })
  }
}

// click outside handler (same as before)
function onClickOutside(e: MouseEvent) {
  const dropdown = document.getElementById('utility-dropdown')
  const button = document.getElementById('more-button')
  if (
    dropdown &&
    button &&
    !dropdown.contains(e.target as Node) &&
    !button.contains(e.target as Node)
  ) {
    showDropdown.value = false
  }
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <header class="bg-gray-900/95 border-b border-gray-700 backdrop-blur-sm">
    <div class="px-6 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo and Title -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <Crown class="h-8 w-8 text-purple-400" />
            <!--            <Swords class="h-8 w-8 text-orange-400" />-->
          </div>
          <div>
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent w-max"
            >
              Poxala
            </h1>
            <p class="text-xs text-gray-400">Champion Database & Deck Builder</p>
          </div>
        </div>

        <!-- Main Navigation -->
        <nav class="flex items-center gap-1">
          <button
            v-for="item in navigationItems"
            :key="item.id"
            :class="
              activeSection === item.id
                ? 'bg-gray-800/70 text-white'
                : 'text-gray-300 hover:text-white'
            "
            class="relative h-auto py-3 px-4 flex flex-col items-center gap-1 transition-all duration-200 hover:bg-gray-800/50 group rounded-lg"
            @click="handleItemClick(item)"
          >
            <component
              :is="item.icon"
              :class="activeSection === item.id ? item.color : 'group-hover:' + item.color"
              class="h-5 w-5"
            />
            <span class="text-xs font-medium">{{ item.label }}</span>

            <!-- Active indicator -->
            <div
              v-if="activeSection === item.id"
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full"
            />

            <!-- Hover tooltip -->
            <div
              class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700"
            >
              {{ item.description }}
            </div>
          </button>
        </nav>

        <!-- Utility Navigation -->
        <div class="flex items-center gap-2">
          <!-- Quick Actions Dropdown -->
          <div class="relative">
            <button
              id="more-button"
              class="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 flex items-center gap-1 rounded"
              @click="showDropdown = !showDropdown"
            >
              <Info class="h-4 w-4 mr-2" />
              More
              <ChevronDown class="h-3 w-3 ml-1" />
            </button>
            <transition name="fade">
              <div
                v-show="showDropdown"
                id="utility-dropdown"
                class="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 text-white rounded shadow-lg z-[999999]"
              >
                <div
                  v-for="item in utilityItems"
                  :key="item.id"
                  class="hover:bg-gray-800 cursor-pointer flex items-center gap-3 py-3 px-3 z-50"
                  @click="handleItemClick(item)"
                >
                  <component :is="item.icon" :class="item.color" class="h-4 w-4" />
                  <div>
                    <div class="font-medium">{{ item.label }}</div>
                    <div class="text-xs text-gray-400">{{ item.description }}</div>
                  </div>
                  <div v-if="item.external" class="ml-auto text-xs text-gray-500">↗</div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  pointer-events: none; /* 👈 this fixes ghost blocking */
}
</style>
