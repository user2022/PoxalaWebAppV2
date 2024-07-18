<script lang="ts" setup>
import { useDeckStore } from '@/stores/deck'
import Button from '@/components/shared/Button.vue'
import { storeToRefs } from 'pinia'
import { Eye } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { getFactionAmountFromDeck } from '@/lib/getFactionAmountFromDeck'
import FactionAmount from '@/components/deck/FactionAmount.vue'
import DeckRuneList from '@/components/deck/DeckRuneList.vue'

interface Props {
  openSaveModal: () => void
}

const { openSaveModal } = defineProps<Props>()

const deckStore = useDeckStore()
const { deckHolder } = storeToRefs(deckStore)
const { resetDeck } = deckStore

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
      <DeckRuneList :deck-holder="deckHolder" modify />
      <!-- Menu -->
      <div class="flex flex-row justify-between" style="min-height: 42px">
        <div class="flex flex-row gap-2">
          <Button c-class="self-center" label="Save" type="primary" @click="openSaveModal" />
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
</style>
