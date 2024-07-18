<script lang="ts" setup>
import { ThemeList } from '@/lib/data/ThemeList'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Paintbrush } from 'lucide-vue-next'

const onThemeClick = (val: string) => {
  localStorage.setItem('theme', val)
  window.location.reload()
}
</script>

<template>
  <Menu as="div" class="relative inline-block z-50">
    <MenuButton>
      <Paintbrush :size="24" :stroke-width="1.25" color="#F9FAFB" />
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
        <div>
          <template v-for="item in ThemeList" :key="item.value">
            <MenuItem v-slot="{ active }" @click="onThemeClick(item.value)">
              <button
                :class="[
                  active
                    ? 'bg-alpha-700/50 border-alpha-400 border'
                    : 'text-gray-900 border border-neutral-700',
                  'group flex w-full items-center text-white font-semibold rounded-md px-2 py-2 text-sm'
                ]"
              >
                {{ item.label }}
              </button>
            </MenuItem>
          </template>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style scoped></style>
