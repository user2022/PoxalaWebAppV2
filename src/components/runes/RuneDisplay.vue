<script lang="ts" setup>
import { ref, watch } from 'vue'
import CardFront from '@/components/runes/rune-display/CardFront.vue'
import CardBack from '@/components/runes/rune-display/CardBack.vue'
import Button from '@/components/shared/Button.vue'
import { useRuneStore } from '@/stores/rune'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDeckStore } from '@/stores/deck'

const runeStore = useRuneStore()
const { rune } = storeToRefs(runeStore)

const route = useRoute()

const { addToDeck } = useDeckStore()

watch(rune, (newVal) => {
  if (newVal) {
    flipped.value = false
  }
})

// const factionOne = useRuneFactionOne(rune.value)

const flipped = ref<boolean>(false)
</script>

<template>
  <div
    class="p-6 border rounded-lg w-96 dark:bg-zinc-700 bg-neutral-700 border-neutral-900 flex flex-col gap-2 justify-center"
    style="min-height: 562px"
  >
    <template v-if="rune">
      <Button c-class="self-center" label="Flip Card" @click="flipped = !flipped" />
      <div :class="{ 'rune-flipped': flipped }" class="rune-preview">
        <div class="rune-front">
          <CardFront :rune="rune" />
        </div>
        <div class="rune-back">
          <CardBack :rune="rune" />
        </div>
      </div>
      <Button c-class="self-center" label="Add Card" type="secondary" @click="addToDeck(rune)" />
    </template>
    <template v-else>
      <h2 class="text-neutral-500 font-bold text-6xl text-center m-auto">Select a Rune</h2>
    </template>
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
  transform: rotateY(180deg);
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