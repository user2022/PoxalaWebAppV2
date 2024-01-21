<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import type { Spell } from '@/types/Spell'
import type { Equip } from '@/types/Equip'
import type { Relic } from '@/types/Relic'
import { getFactionURL } from '@/lib/JoinFactionTwoUrl'
import { getRuneRarity } from '@/lib/getRuneRarity'
import CardFactionIcon from '@/components/runes/rune-display/CardFactionIcon.vue'
import CardFrontStats from '@/components/runes/rune-display/CardFrontStats.vue'
import CardName from '@/components/runes/rune-display/CardName.vue'
import { getRuneType } from '@/lib/getRuneType'

export interface CardProps {
  rune: Champion | Spell | Equip | Relic
}

const { rune } = defineProps<CardProps>()

const poxApi = import.meta.env.VITE_POXAPI
</script>

<template>
  <div class="relative rune-container">
    <!--  Rune Image  -->
    <img
      :src="`${poxApi}/images/runes/lg/${rune.hash}.jpg`"
      alt="rune"
      class="absolute rune-front-image z-10"
    />
    <!-- Card frame -->
    <img
      :src="`${poxApi}/_themes/global/frames/large/front/${getFactionURL(rune.factions ?? [])}.gif`"
      alt="card-frame"
      class="z-20 absolute"
    />
    <!--  Rarity border  -->
    <img
      :src="`${poxApi}/_themes/global/frames/large/lg_frame_rarity_${getRuneRarity(
        rune.rarity
      )}.gif`"
      alt="card-rarity"
      class="absolute top-0 left-0 z-30"
    />
    <!-- Faction Icon -->
    <CardFactionIcon
      :faction-one="rune.factionOneNum ?? ''"
      :faction-two="rune.factionTwoNum ?? ''"
      custom-class="absolute top-9 left-10 z-30"
    />
    <!-- Rune Name -->
    <CardName :name="rune.name" />

    <!-- Rune Cost -->
    <h1 class="rune-cost absolute top-8 z-30 right-7 text-white shadow">{{ rune.noraCost }}</h1>

    <!-- Rune Stats -->
    <template v-if="getRuneType(rune) === 'champ' || getRuneType(rune) === 'relic'">
      <CardFrontStats
        :rune="rune as Champion"
        custom-class="absolute bottom-5 left-0 z-30 mb-0.5"
      />
    </template>
  </div>
</template>

<style>
.rune-container {
  height: 418px;
  width: 332px;
}

.rune-front-image {
  top: 47px;
  left: 31px;
}

.rune-name {
  width: 240px;
  top: 36px;
  left: 45px;
  font:
    bold 17px arial,
    sans-serif;
}

.rune-cost {
  font:
    bold 20px arial,
    sans-serif;
}
</style>
