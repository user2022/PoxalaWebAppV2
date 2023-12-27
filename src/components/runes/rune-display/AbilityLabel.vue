<script lang="ts" setup>
import type { AbilitiesEntity } from '@/types/Champion'

interface Props {
  ability: AbilitiesEntity
  isOptionAbility?: boolean
  defaultOption?: AbilitiesEntity
}

const { ability, isOptionAbility, defaultOption } = defineProps<Props>()

const poxApi = import.meta.env.VITE_POXAPI
</script>

<template>
  <div :class="isOptionAbility ? 'gap-2' : ''" class="flex flex-row items-center w-auto">
    <img :src="`${poxApi}/images/ability_icons/small/icon_${ability.iconName}.gif`" alt="" />
    <template v-if="!isOptionAbility">
      <p class="ability-text text-white ml-0.5 whitespace-nowrap">{{ ability.name }}</p>
    </template>
    <template v-else>
      <div class="flex flex-col">
        <p class="text-yellow-400 text-sm whitespace-nowrap">
          {{ ability.name }} {{ ability.level ? `(${ability.level})` : '' }}
        </p>
        <p class="text-white text-xs whitespace-nowrap">
          Adds {{ (defaultOption?.noraCost ?? 0) - ability.noraCost }} nora
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.ability-text {
  font-size: 11px;
}
</style>