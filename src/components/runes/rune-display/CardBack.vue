<script lang="ts" setup>
import type { CardProps } from '@/components/runes/rune-display/CardFront.vue'
import { getFactionURL } from '@/lib/JoinFactionTwoUrl'
import CardName from '@/components/runes/rune-display/CardName.vue'
import { getRuneTitle } from '@/lib/getRuneTitle'
import CardFactionIcon from '@/components/runes/rune-display/CardFactionIcon.vue'
import AbilityList from '@/components/runes/rune-display/AbilityList.vue'
import type { Champion } from '@/types/Champion'
import InfoText from '@/components/runes/rune-display/InfoText.vue'
import { type Spell } from '@/types/Spell'
import { getRuneType } from '@/lib/getRuneType'

const { rune } = defineProps<CardProps>()

const poxApi = import.meta.env.VITE_POXAPI
</script>

<template>
  <div class="relative rune-container">
    <!-- Rune BG -->
    <img
      :src="`${poxApi}/_themes/global/frames/large/back/${getFactionURL(rune.factions ?? [])}.gif`"
      alt="card-back"
    />
    <!-- Back header -->
    <CardName :name="getRuneTitle(getRuneType(rune))" />
    <!-- Fac Icon -->
    <CardFactionIcon
      :faction-one="rune.factionOneNum ?? ''"
      :faction-two="rune.factionTwoNum ?? ''"
      custom-class="absolute top-9 left-10 z-30"
    />
    <!-- Rune Description -->
    <p class="text-white description-text text-center absolute top-16 left-8 z-30">
      {{
        getRuneType(rune) === 'champ' ? (rune as Champion).description : (rune as Spell).flavorText
      }}
    </p>

    <!-- Rune Abilities (Starter) -->
    <template v-if="getRuneType(rune) === 'champ'">
      <AbilityList :rune="rune as Champion" />
    </template>

    <!-- Info -->
    <template v-if="getRuneType(rune) === 'champ'">
      <div class="flex flex-col info-wid">
        <InfoText :value="rune.deckLimit" label="Deck Limit" />
        <InfoText :value="(rune as Champion).races?.join(', ')" label="Races" />
        <InfoText :value="(rune as Champion).classes?.join(', ')" label="Classes" />
        <InfoText :value="(rune as Champion).size" label="Size" />
        <InfoText :value="rune.artist" label="Artist" />
      </div>
    </template>

    <template v-if="getRuneType(rune) !== 'champ'">
      <div class="flex flex-col info-wid">
        <InfoText :value="rune.deckLimit" label="Deck Limit" />
        <InfoText :value="rune.artist" label="Artist" />
      </div>
    </template>

    <!-- Rune Idol -->
    <template v-if="getRuneType(rune) === 'champ'">
      <div class="rune-idol">
        <div style="position: absolute; bottom: 0; width: 100%">
          <img
            :src="`${poxApi}/images/runes/idols/${rune.hash}.gif`"
            alt="rune-idol"
            class="idol"
          />
        </div>
      </div>
    </template>

    <!-- Spell/Relic/Equip Info -->
    <template v-if="getRuneType(rune) !== 'champ'">
      <div class="spell-info-container">
        <div class="spell-info">
          <span>{{ (rune as Spell).description }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.description-text {
  font:
    10px arial,
    sans-serif;
  width: 262px;
}

.info-wid {
  width: 100px;
  top: 285px;
  left: 45px;
  position: absolute;
}

.rune-idol {
  position: absolute;
  bottom: 31px;
  right: 30px;
  width: 160px;
  height: 120px;
}

.idol {
  display: block;
  margin: 0 auto;
}

.spell-info-container {
  position: absolute;
  width: 255px;
  height: 132px;
  top: 135px;
  left: 35px;
}

.spell-info {
  text-align: center;
  font:
    10px arial,
    sans-serif;
  line-height: 11px;
  color: #fff;
  overflow: hidden;
}
</style>