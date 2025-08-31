<script lang="ts" setup>
import { ref, watch } from 'vue'
import CardFront from '@/components/runes/rune-display/CardFront.vue'
import CardBack from '@/components/runes/rune-display/CardBack.vue'
import Button from '@/components/shared/Button.vue'
import { useRuneStore } from '@/stores/rune'
import { storeToRefs } from 'pinia'
import { useDeckStore } from '@/stores/deck'
import { FlipHorizontal2, SquareAsterisk, SquarePlusIcon, X } from 'lucide-vue-next'
import { useScreenSize } from '@/lib/util/useScreenSize'

interface Props {
  showAdd?: boolean
}

const { showAdd } = defineProps<Props>()

const runeStore = useRuneStore()
const { rune } = storeToRefs(runeStore)

const { addToDeck } = useDeckStore()

watch(rune, (newVal) => {
  if (newVal) {
    flipped.value = false
  }
})

const flipped = ref<boolean>(false)

const { isMobile } = useScreenSize()
</script>

<template>
  <div>
    <!-- Mobile Overlay -->
    <div
      v-if="isMobile && runeStore.rune"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <div
        class="p-0 sm:p-6 rounded-xl sm:w-96 flex flex-col gap-2 justify-center relative bg-gray-800/30 border border-gray-800 backdrop-blur-lg"
        style="min-height: 562px"
      >
        <!-- Close Button -->
        <div class="absolute top-3 right-3 z-50" @click="$emit('close')">
          <button
            class="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white hover:shadow-[0_0_12px_rgba(239,68,68,0.75)] border border-red-400/20 focus:outline-none focus:ring-0 transition-all duration-200"
            @click="() => runeStore.setRune(null)"
          >
            <X class="w-4 h-4" stroke-width="2" />
          </button>
        </div>

        <template v-if="rune">
          <Button
            c-class="self-center"
            label="Flip Card"
            variant="secondary"
            @click="flipped = !flipped"
          >
            <template #icon>
              <component :is="FlipHorizontal2" class="w-5 h-5" />
            </template>
          </Button>
          <div :class="{ 'rune-flipped': flipped }" class="rune-preview">
            <div class="rune-front">
              <CardFront :rune="rune" />
            </div>
            <div class="rune-back">
              <CardBack :rune="rune" />
            </div>
          </div>
          <Button
            v-if="showAdd"
            c-class="self-center"
            label="Add Card"
            variant="success"
            @click="addToDeck(rune)"
          >
            <template #icon>
              <component :is="SquarePlusIcon" class="w-5 h-5" />
            </template>
          </Button>
          <div class="bottom-1.5 right-2 absolute">
            <p class="text-xs font-semibold text-gray-200">ID {{ rune.id }}</p>
          </div>
        </template>

        <!-- Empty State -->
        <template v-else>
          <div class="flex flex-col items-center justify-center text-center h-full px-4">
            <div
              class="flex items-center justify-center w-24 h-24 rounded-full bg-gray-700 border border-gray-600 mb-4"
            >
              <SquareAsterisk class="w-8 h-8 text-orange-400 absolute animate-pulse" />
            </div>
            <h2 class="text-2xl font-semibold text-white">No Rune Selected</h2>
            <p class="text-gray-400 mt-2 text-sm max-w-xs">
              Pick a rune from the list to preview its details here.
            </p>
          </div>
        </template>
      </div>
    </div>

    <!-- Desktop view (unchanged) -->
    <div
      v-if="!isMobile"
      class="p-0 sm:p-6 rounded-xl w-[320px] sm:w-96 flex flex-col mx-auto sm:mx-0 gap-2 justify-center relative bg-inner"
      style="min-height: 562px"
    >
      <template v-if="rune">
        <Button
          c-class="self-center"
          label="Flip Card"
          variant="secondary"
          @click="flipped = !flipped"
        >
          <template #icon>
            <component :is="FlipHorizontal2" class="w-5 h-5" />
          </template>
        </Button>
        <div :class="{ 'rune-flipped': flipped }" class="rune-preview">
          <div class="rune-front">
            <CardFront :rune="rune" />
          </div>
          <div class="rune-back">
            <CardBack :rune="rune" />
          </div>
        </div>
        <Button
          v-if="showAdd"
          c-class="self-center"
          label="Add Card"
          variant="success"
          @click="addToDeck(rune)"
        >
          <template #icon>
            <component :is="SquarePlusIcon" class="w-5 h-5" />
          </template>
        </Button>
        <div class="bottom-1.5 right-2 absolute">
          <p class="text-xs font-semibold text-gray-200">ID {{ rune.id }}</p>
        </div>
      </template>

      <!-- Empty State -->
      <template v-else>
        <div class="flex flex-col items-center justify-center text-center h-full px-4">
          <div
            class="flex items-center justify-center w-24 h-24 rounded-full bg-gray-700 border border-gray-600 mb-4"
          >
            <SquareAsterisk class="w-8 h-8 text-orange-400 absolute animate-pulse" />
          </div>
          <h2 class="text-2xl font-semibold text-white">No Rune Selected</h2>
          <p class="text-gray-400 mt-2 text-sm max-w-xs">
            Pick a rune from the list to preview its details here.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.rune-front {
  position: absolute;
  height: 418px;
  width: 332px;
  top: 0;
  left: 0;
  z-index: 4;
}

.rune-back {
  position: absolute;
  height: 418px;
  width: 332px;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
  z-index: 9;
}

.rune-front,
.rune-back {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.rune-flipped {
  transform: rotateY(180deg);
}

.rune-preview {
  position: relative;
  width: 332px;
  height: 428px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
</style>
