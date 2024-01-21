<script lang="ts" setup>
import ComboBoxField from '@/components/form/ComboBoxField.vue'
import type { Champion } from '@/types/Champion'
import type { Ability } from '@/types/Ability'
import PageInnerSectionLayout from '@/components/layout/PageInnerSectionLayout.vue'
import RuneCreateInputLayout from '@/components/creator/RuneCreateInputLayout.vue'
import { useRouteStore } from '@/stores/storeRoute'

interface Props {
  rune: Champion
  abilities: Ability[]
  fireChanges?: (queryName: string, value: string) => void
}

const { rune, abilities, fireChanges } = defineProps<Props>()

const { getDefaultQuery } = useRouteStore()

const abilityOptions = [
  {
    name: 'Select an ability',
    value: 'undefined',
    disabled: true
  },
  {
    name: 'None',
    value: '999999'
  },
  ...abilities.map((ability) => {
    return {
      name: `${ability.name} ${ability.level ? `(${ability.level})` : ''}`,
      value: ability.ability_id.toString()
    }
  })
]
</script>

<template>
  <PageInnerSectionLayout header="Abilities">
    <div class="flex flex-col gap-6">
      <RuneCreateInputLayout header="Ability Set 1">
        <template
          v-for="(ability, index) in rune.transformedAbilities?.[0].options"
          :key="`s1-${ability.id + index}`"
        >
          <ComboBoxField
            :default-value="getDefaultQuery(`s1u${index + 1}`, ability.id)"
            :label="`Upgrade ${index + 1} ${ability.default ? '(Default)' : ''}`"
            :options="abilityOptions"
            :query-name="`s1u${index + 1}`"
          />
        </template>
      </RuneCreateInputLayout>

      <RuneCreateInputLayout header="Ability Set 2">
        <template
          v-for="(ability, index) in rune.transformedAbilities?.[1].options"
          :key="`s2-${ability.id + index}`"
        >
          <ComboBoxField
            :default-value="getDefaultQuery(`s2u${index + 1}`, ability.id)"
            :label="`Upgrade ${index + 1} ${ability.default ? '(Default)' : ''}`"
            :options="abilityOptions"
            :query-name="`s2u${index + 1}`"
          />
        </template>
      </RuneCreateInputLayout>

      <RuneCreateInputLayout header="Base Abilities">
        <template
          v-for="(ability, index) in rune.transformedAbilities"
          :key="`b-${ability.id + index}`"
        >
          <template v-if="!ability.default">
            <div class="flex flex-row gap-2 group items-start">
              <ComboBoxField
                :default-value="getDefaultQuery(`b${index - 2 + 1}`, ability.id)"
                :label="`Base Ability ${index - 2 + 1}`"
                :options="abilityOptions"
                :query-name="`b${index - 2 + 1}`"
              />
            </div>
          </template>
        </template>
      </RuneCreateInputLayout>
    </div>
  </PageInnerSectionLayout>
</template>

<style scoped></style>
