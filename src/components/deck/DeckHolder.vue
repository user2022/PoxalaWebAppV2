<script lang="ts" setup>
import { useDeckStore } from '@/stores/deck'
import Button from '@/components/shared/Button.vue'
import { storeToRefs } from 'pinia'
import { Pin, PinOff, RotateCcw, Save } from 'lucide-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import { getFactionAmountFromDeck } from '@/lib/getFactionAmountFromDeck'
import FactionAmount from '@/components/deck/FactionAmount.vue'
import DeckRuneList from '@/components/deck/DeckRuneList.vue'
import { useScreenSize } from '@/lib/util/useScreenSize'

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

const showHolder = ref(true)
const isFixed = ref<boolean>(true)

// Read preferred pin state from localStorage on mount
onMounted(() => {
  const savedPinState = localStorage.getItem('deckPinned')
  isFixed.value = savedPinState === null ? false : savedPinState === 'true'
})

// Update localStorage whenever isFixed changes
watch(isFixed, (val) => {
  localStorage.setItem('deckPinned', val.toString())
})

const togglePosition = () => {
  isFixed.value = !isFixed.value
}

const { isMobile } = useScreenSize()
</script>

<template>
  <template v-if="showHolder">
    <div
      :class="[
        isFixed && !isMobile
          ? 'fixed z-40 bottom-5 left-1/2 -translate-x-1/2 w-[1280px]'
          : 'relative w-full mx-auto'
      ]"
      class="deck-holder shadow-lg card-box p-4 backdrop-blur-md flex flex-col gap-3 w-auto"
    >
      <!-- Deck List Display Runes -->

      <div
        :class="`${
          isFixed ? '' : 'bg-gray-800/30 p-4 rounded-lg border border-gray-700'
        } w-fit mx-auto`"
        class="flex flex-col gap-3"
      >
        <DeckRuneList :deck-holder="deckHolder" :is-fixed="isFixed" modify />
        <!-- Menu -->
        <div
          class="flex flex-row flex-wrap gap-3 justify-between items-center"
          style="min-height: 42px"
        >
          <div class="flex flex-row items-center gap-3">
            <!-- Pin Button First -->
            <Button
              :label="isFixed ? 'Unpin' : 'Pin'"
              c-class="self-center"
              size="sm"
              variant="secondary"
              @click="togglePosition"
            >
              <template #icon>
                <component :is="isFixed ? PinOff : Pin" :size="16" />
              </template>
            </Button>

            <!-- Divider -->
            <div class="w-px h-6 bg-gray-700"></div>

            <!-- Other Buttons -->
            <Button
              c-class="self-center"
              label="Save"
              size="sm"
              variant="success"
              @click="openSaveModal"
            >
              <template #icon>
                <component :is="Save" :size="16" />
              </template>
            </Button>
            <Button
              c-class="self-center"
              label="Reset"
              size="sm"
              variant="destructive"
              @click="resetDeck"
            >
              <template #icon>
                <component :is="RotateCcw" :size="16" />
              </template>
            </Button>
          </div>

          <!-- Faction Amounts -->
          <div class="flex flex-row gap-1">
            <template v-for="(detail, index) in facAmount" :key="detail.amount + index">
              <FactionAmount :amount="detail.amount" :faction-number="detail.factionNumber" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
.deck-holder {
  transition: all 0.25s ease-in-out;
}
</style>
