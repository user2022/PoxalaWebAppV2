<script lang="ts" setup>
import AbilityIcon from '@/components/abilities/AbilityIcon.vue'
import type { AbilitiesEntity } from '@/types/Champion'
import { useRuneStore } from '@/stores/rune'
import { useRouteStore } from '@/stores/storeRoute'
import DetailBlock from '@/components/abilities/DetailBlock.vue'

interface Props {
  ability: AbilitiesEntity
  defaultOption?: AbilitiesEntity | null
  set?: '1' | '2'
}

const { ability, defaultOption, set } = defineProps<Props>()

const runeStore = useRuneStore()
const { setAbilityToDefault } = runeStore

const routeStore = useRouteStore()
const { addToQuery } = routeStore

const onClick = () => {
  if (defaultOption && set) {
    setAbilityToDefault(ability)
  }
}

const diff = (defaultOption && ability.noraCost - defaultOption.noraCost) || 0
</script>

<template>
  <template v-if="ability.name !== 'None'">
    <div
      :class="`rounded-md p-2 max-w-xl transition-all duration-200 hover:bg-gray-800 border ${
        ability.default ? 'border-gray-500 bg-gray-800' : 'border-gray-800/50 bg-gray-800/50'
      } ${defaultOption ? 'cursor-pointer' : ''}`"
      @click="onClick"
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
          <div class="flex flex-row items-center gap-2 mt-2">
            <DetailBlock
              :value="ability.noraCost"
              c-class="bg-blue-600/30 border border-blue-600"
              font-size="12px"
              label="Nora"
            />
            <DetailBlock
              :value="ability.apCost"
              c-class="bg-purple-600/30 border border-purple-600"
              font-size="12px"
              label="AP"
            />
            <DetailBlock
              :value="ability.cooldown"
              c-class="bg-teal-600/30 border border-teal-600"
              font-size="12px"
              label="CD"
            />
            <template v-if="defaultOption">
              <p class="flex items-center gap-1 text-xs text-neutral-200 py-1 px-2 rounded-md">
                <span> Adds {{ diff }} nora </span>
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped></style>
