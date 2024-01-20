<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import DetailedAbilityCard from '@/components/runes/detailed-view/DetailedAbilityCard.vue'

interface Props {
  rune: Champion
}

const { rune } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-row gap-4">
    <div class="flex flex-col gap-2">
      <p class="text-neutral-200 uppercase tracking-wide">Ability Set 1</p>
      <template
        v-for="(ability, index) in rune.abilitySets?.[0].abilities"
        :key="`detail-u1-${ability.id + index}`"
      >
        <DetailedAbilityCard
          :ability="ability"
          :default-option="rune.abilitySets[0].abilities.find((abil) => abil.default)"
        />
      </template>
      <p class="text-neutral-200 uppercase tracking-wide">Ability Set 2</p>
      <template
        v-for="(ability, index) in rune.abilitySets?.[1].abilities"
        :key="`detail-u2-${ability.id + index}`"
      >
        <DetailedAbilityCard
          :ability="ability"
          :default-option="rune.abilitySets[1]?.abilities.find((abil) => abil.default)"
        />
      </template>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-neutral-200 uppercase tracking-wide">Base Abilities</p>
      <template
        v-for="(ability, index) in rune.startingAbilities"
        :key="`detail-b-${ability.id + index}`"
      >
        <DetailedAbilityCard :ability="ability" />
      </template>
    </div>
  </div>
</template>

<style scoped></style>