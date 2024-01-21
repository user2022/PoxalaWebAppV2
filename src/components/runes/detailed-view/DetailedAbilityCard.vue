<script lang="ts" setup>
import AbilityIcon from '@/components/abilities/AbilityIcon.vue'
import RuneDetailAbilityBadge from '@/components/abilities/RuneDetailAbilityBadge.vue'
import type { AbilitiesEntity } from '@/types/Champion'

interface Props {
  ability: AbilitiesEntity
  defaultOption?: AbilitiesEntity | null
}

const { ability } = defineProps<Props>()
</script>

<template>
  <template v-if="ability.name !== 'None'">
    <div
      :class="`bg-neutral-700/50 rounded-md p-2 shadow-md max-w-xl shadow-inner border border-3 ${
        ability.default ? 'border-yellow-500/70' : 'border-neutral-900/70'
      }`"
    >
      <div class="flex flex-row items-center gap-2 w-full">
        <AbilityIcon :icon-name="ability.iconName" />
        <div class="flex flex-col gap-1 flex-grow">
          <div class="flex flex-row gap-2">
            <h2 class="text-neutral-200 font-semibold text-sm">
              {{ ability.name }} {{ ability.level ? `(${ability.level})` : '' }}
            </h2>
          </div>
          <p class="text-neutral-300 text-xs" v-html="ability.shortDescription" />
          <div class="flex flex-row gap-2 mt-2">
            <RuneDetailAbilityBadge :value="ability.noraCost" label="Nora" />
            <RuneDetailAbilityBadge :value="ability.apCost" label="AP" />
            <RuneDetailAbilityBadge :value="ability.cooldown" label="CD" />
            <template v-if="defaultOption">
              <p class="text-xs text-neutral-200">
                Adds {{ ability.noraCost - defaultOption.noraCost }} nora
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped></style>
