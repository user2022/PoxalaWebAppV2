<script lang="ts" setup>
import { useDeckStore } from '@/stores/deck'
import { getColoursFromType } from '@/lib/getColoursFromType'
import Button from '@/components/shared/Button.vue'
import { storeToRefs } from 'pinia'
import { Eye, X } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { getFactionAmountFromDeck } from '@/lib/getFactionAmountFromDeck'
import FactionAmount from '@/components/deck/FactionAmount.vue'
import { useRuneStore } from '@/stores/rune'

const deckStore = useDeckStore()
const { deckHolder } = storeToRefs(deckStore)
const { resetDeck, removeFromDeck } = deckStore

const { setRune } = useRuneStore()

const poxApi = import.meta.env.VITE_POXAPI

const facAmount = computed(() => {
  return getFactionAmountFromDeck(deckHolder.value)
})

const showHolder = ref<boolean>(true)

const setShowHolder = (val: boolean) => {
  showHolder.value = val
}
</script>

<template>
  <template v-if="showHolder">
    <div
      class="shadow-md rounded-md p-2 fixed z-40 bottom-5 left-2/4 bg-neutral-600/50 deck-holder flex flex-col gap-2"
    >
      <!-- Deck List Display Runes -->
      <div class="grid grid-cols-15 grid-rows-2 gap-2 select-none">
        <template v-for="(rune, index) in deckHolder" :key="index">
          <div class="relative group">
            <template v-if="rune">
              <div
                class="absolute cursor-pointer -top-0.5 -right-0.5 z-50 bg-red-600 overflow-visible -mr-1 border border-black text-xs rounded-full p-1 hidden group-hover:block"
                @click="removeFromDeck(index)"
              >
                <X :size="14" :stroke-width="1.5" class="z-50" />
              </div>
            </template>
            <div
              :class="`${getColoursFromType(rune?.type ?? '')}`"
              class="bg-neutral-500 rounded-md w-14 relative overflow-hidden border border-neutral-800"
              style="height: 70px"
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
      <!-- Menu -->
      <div class="flex flex-row justify-between" style="min-height: 42px">
        <div class="flex flex-row gap-2">
          <Button c-class="self-center" label="Save" type="primary" />
          <Button c-class="self-center" label="Reset" type="secondary" @click="resetDeck" />
          <Button
            c-class="self-center"
            label="Hide"
            type="secondary"
            @click="setShowHolder(false)"
          />
        </div>
        <div class="flex flex-row gap-1">
          <template v-for="(detail, index) in facAmount" :key="detail.amount + index">
            <FactionAmount :amount="detail.amount" :faction-number="detail.factionNumber" />
          </template>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="fixed right-0 bottom-16">
      <div
        class="cursor-pointer px-6 py-4 bg-alpha-700/50 rounded-l-full text-neutral-100 flex flex-row items-center gap-3"
        @click="setShowHolder(true)"
      >
        <Eye :size="22" :stroke-width="1.5" />
        <span>Show Deck</span>
      </div>
    </div>
  </template>
</template>

<style scoped>
.deck-holder {
  width: 976px;
  height: auto;
  transform: translateX(-50%);
}

.zoom-rune {
  transform: scale(1.2, 1.3);
  margin-top: 3px;
}
</style>
