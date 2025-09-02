<script lang="ts" setup>
import type { Ability } from '@/types/Ability'
import AbilityIcon from '@/components/abilities/AbilityIcon.vue'
import AbilityLevelIcon from '@/components/abilities/AbilityLevelIcon.vue'
import AbilityInformationBadges from '@/components/abilities/AbilityInformationBadges.vue'
import CardContainer from '@/components/layout/CardContainer.vue'

interface Props {
  ability: Ability
}

const { ability } = defineProps<Props>()
</script>

<template>
  <CardContainer>
    <AbilityIcon :key="ability.icon_name" :icon-name="ability.icon_name" />
    <div class="flex flex-col gap-2 flex-grow">
      <div class="flex flex-row flex-wrap gap-2 justify-between w-full">
        <div class="flex flex-row gap-4 items-center">
          <h1 class="text-xl font-semibold text-neutral-50">{{ ability.name }}</h1>
          <AbilityLevelIcon :ability-level="ability.level" />
        </div>
        <AbilityInformationBadges
          :ap-cost="ability.ap_cost"
          :cooldown="ability.cooldown"
          :cost="ability.cost"
        />
      </div>
      <div class="mb-4">
        <p class="text-neutral-300 text-sm" v-html="ability.short_description" />
      </div>
    </div>
    <div class="absolute right-4 bottom-2 font-semibold">
      <p class="text-xs text-gray-900">ID {{ ability.ability_id }}</p>
    </div>
  </CardContainer>
</template>

<style scoped></style>
