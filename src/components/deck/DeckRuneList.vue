<script lang="ts" setup>
import { getColoursFromType } from '@/lib/getColoursFromType'
import type { Rune } from '@/types/Runes'
import { useRuneStore } from '@/stores/rune'
import { useDeckStore } from '@/stores/deck'
import { Plus, X } from 'lucide-vue-next'

const poxApi = import.meta.env.VITE_POXAPI

interface Props {
  deckHolder: Array<Rune | null>
  modify?: boolean
  largeRune?: boolean
  isFixed?: boolean
}

const { deckHolder, modify, largeRune, isFixed } = defineProps<Props>()

const deckStore = useDeckStore()
const { setRune } = useRuneStore()
const { removeFromDeck } = deckStore
</script>

<template>
  <div
    class="grid md:grid-cols-7 lg:grid-cols-10 lg:grid-rows-3 xl:grid-cols-15 xl:grid-rows-2 grid-cols-4 gap-2 select-none m-auto md:m-0"
  >
    <template v-for="(rune, index) in deckHolder" :key="index">
      <div class="relative group flex flex-row gap-2">
        <!-- Remove Button -->
        <template v-if="rune && modify">
          <div
            class="absolute -top-1.5 -right-1.5 z-50 rounded-full hidden group-hover:flex"
            @click.stop="removeFromDeck(index)"
          >
            <button
              class="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white hover:shadow-[0_0_12px_rgba(239,68,68,0.75)] border border-red-400/20 focus:outline-none focus:ring-0 transition-all duration-200"
            >
              <X class="w-4 h-4" stroke-width="2" />
            </button>
          </div>
        </template>

        <!-- Rune Slot -->
        <div
          :class="[
            rune
              ? `bg-gray-900 border-[3px] ${getColoursFromType(
                  rune?.type ?? ''
                )} transition-all duration-300 group-hover:shadow-[0_0_15px] group-hover:shadow-current`
              : 'bg-gray-800 border-2 border-dotted border-gray-600 flex items-center justify-center',
            !isFixed && !largeRune ? 'w-[80px] h-[90px]' : 'w-[70px] h-[78px]'
          ]"
          class="rounded-md relative overflow-hidden cursor-pointer"
        >
          <template v-if="rune">
            <img
              :alt="`rune-${rune.id}-${index}`"
              :src="`${poxApi}/images/runes/med/${rune.hash}.jpg`"
              class="zoom-rune w-full h-full object-cover"
              @click="setRune(rune)"
            />
          </template>
          <template v-else>
            <Plus class="text-gray-500 w-6 h-6" stroke-width="2" />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.zoom-rune {
  transform: scale(1.2, 1.3);
  margin-top: 3px;
  transition: transform 0.2s ease-in-out;
}

.zoom-rune:hover {
  transform: scale(1.3, 1.4);
}
</style>
