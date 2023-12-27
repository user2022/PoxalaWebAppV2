<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import type { Spell } from '@/types/Spell'
import type { Equip } from '@/types/Equip'
import type { Relic } from '@/types/Relic'
import { getBorderColourFromRarity, getTextColourFromRarity } from '@/lib/getColoursFromRarity'
import { Plus } from 'lucide-vue-next'
import { useDeckStore } from '@/stores/deck'
import { useRuneStore } from '@/stores/rune'

interface Props {
  rune: Champion | Spell | Equip | Relic
  type: string
}

const { rune, type } = defineProps<Props>()

const poxApi = import.meta.env.VITE_POXAPI

const { addToDeck } = useDeckStore()

const { setRune } = useRuneStore()
</script>

<template>
  <div class="my-tooltip-cont relative plus-btn-parent select-none">
    <div
      class="plus-btn absolute cursor-pointer -top-0.5 -right-0.5 z-20 bg-green-600 border border-black overflow-visible text-xs rounded-full p-1"
      @click="addToDeck(rune)"
    >
      <Plus :size="18" :stroke-width="1.75" />
    </div>
    <img
      :id="`tip${rune.hash}${rune.id}`"
      :class="`shadow-md cursor-pointer rounded-lg border-3 ${getBorderColourFromRarity(
        rune.rarity
      )}`"
      :src="`${poxApi}/images/runes/med/${rune.hash}.jpg`"
      alt=""
      style="width: 85px; min-height: 97px; background-color: #252525"
      @click="setRune(rune)"
    />
    <div class="my-tooltip">
      <p class="text-sm text-white">
        Name:
        <span :class="`font-bold ${getTextColourFromRarity(rune.rarity)}`">{{ rune.name }}</span>
      </p>
      <p class="text-sm text-white">
        Nora Cost: <span class="text-blue-300 font-bold">{{ rune.noraCost }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.small-img {
  width: 40px;
}

.my-tooltip-cont {
  position: relative;
}

.my-tooltip-cont:hover .my-tooltip {
  visibility: visible;
  opacity: 1;
}

.my-tooltip {
  position: absolute;
  padding: 6px 10px;
  background-color: rgba(24, 24, 24, 0.88);
  visibility: hidden;
  width: auto;
  min-width: 150px;
  max-width: 210px;
  border-radius: 6px;
  z-index: 10;
  bottom: 105%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.my-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(24, 24, 24, 0.88) transparent transparent transparent;
}

.plus-btn {
  display: none;
}

.plus-btn-parent:hover .plus-btn {
  display: block;
}
</style>