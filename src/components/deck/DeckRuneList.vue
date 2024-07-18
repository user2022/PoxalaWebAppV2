<script lang="ts" setup>
import { getColoursFromType } from '@/lib/getColoursFromType'
import type { Rune } from '@/types/Runes'
import { useRuneStore } from '@/stores/rune'
import { useDeckStore } from '@/stores/deck'
import { X } from 'lucide-vue-next'

const poxApi = import.meta.env.VITE_POXAPI

interface Props {
  deckHolder: Array<Rune | null>
  modify?: boolean
  largeRune?: boolean
}

const { deckHolder, modify, largeRune } = defineProps<Props>()

const deckStore = useDeckStore()
const { setRune } = useRuneStore()
const { removeFromDeck } = deckStore
</script>

<template>
  <div
    class="grid md:grid-cols-7 lg:grid-cols-10 lg:grid-rows-3 xl:grid-cols-15 xl:grid-rows-2 grid-cols-4 gap-2 select-none m-auto md:m-0"
  >
    <template v-for="(rune, index) in deckHolder" :key="index">
      <div class="relative group">
        <template v-if="rune && modify">
          <div
            class="absolute cursor-pointer -top-0.5 -right-0.5 z-50 bg-red-600 overflow-visible -mr-1 border border-black text-xs rounded-full p-1 hidden group-hover:block"
            @click="removeFromDeck(index)"
          >
            <X :size="14" :stroke-width="1.5" class="z-50" />
          </div>
        </template>
        <div
          :class="`${getColoursFromType(
            rune?.type ?? ''
          )} bg-neutral-500 rounded-md relative overflow-hidden border border-neutral-800 ${
            largeRune ? 'max-w-[4.4em] min-w-[3.4em]' : 'w-14'
          }`"
          :style="{ height: largeRune ? 'auto' : '70px' }"
        >
          <template v-if="rune">
            <img
              :alt="`rune-${rune.id}-${index}`"
              :src="`${poxApi}/images/runes/med/${rune.hash}.jpg`"
              class="zoom-rune cursor-pointer"
              @click="setRune(rune)"
            />
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
}
</style>
