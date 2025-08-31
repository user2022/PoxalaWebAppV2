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
}

const { rune } = defineProps<Props>()

const poxApi = import.meta.env.VITE_POXAPI

const { addToDeck } = useDeckStore()

const { setRune } = useRuneStore()
</script>

<template>
  <div class="my-tooltip-cont relative plus-btn-parent select-none">
    <div class="relative group">
      <!-- Plus button -->
      <div
        class="absolute -top-1.5 -right-1.5 z-20 rounded-full hidden group-hover:flex"
        @click.stop="addToDeck(rune)"
      >
        <button
          class="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white hover:shadow-[0_0_12px_rgba(34,197,94,0.75)] border border-green-400/20 focus:outline-none focus:ring-0 transition-all duration-200"
        >
          <Plus class="w-4 h-4" stroke-width="2" />
        </button>
      </div>

      <!-- Image div with glow -->
      <div
        :class="`shadow-md cursor-pointer rounded-lg md:border-3 border-2 ${getBorderColourFromRarity(
          rune.rarity
        )} ${getTextColourFromRarity(
          rune.rarity
        )} transition-all duration-300 group-hover:shadow-[0_0_20px] w-[66px] h-[79px] md:w-[85px] md:h-[97px] bg-[#252525] overflow-hidden group-hover:shadow-current`"
        @click="setRune(rune)"
      >
        <img
          :id="`tip${rune.hash}${rune.id}`"
          :src="`${poxApi}/images/runes/med/${rune.hash}.jpg`"
          alt="rune"
          class="w-full h-full object-cover scale-105"
        />
      </div>
    </div>

    <div class="t-tooltip">
      <p class="text-sm">
        <span
          class="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-orange-400"
        >
          {{ rune.name }}
        </span>
      </p>
      <p class="text-xs text-gray-300 mt-1">
        Nora Cost: <span class="text-blue-300 font-bold">{{ rune.noraCost }}</span>
      </p>
      <p class="text-xs text-gray-300 mt-0.5">
        Rarity:
        <span :class="`font-bold ${getTextColourFromRarity(rune.rarity)}`">{{ rune.rarity }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.small-img {
  width: 40px;
}

.plus-btn {
  display: none;
}

.plus-btn-parent:hover .plus-btn {
  display: block;
}

.zoomed-img {
  width: 110%; /* adjust this for more/less zoom */
  height: 110%;
  object-fit: cover;
  object-position: center;
}

.group:hover {
  box-shadow:
    0 0 7px currentColor,
    0 0 10px currentColor;
  transition: box-shadow 0.3s ease-in-out;
}
</style>
