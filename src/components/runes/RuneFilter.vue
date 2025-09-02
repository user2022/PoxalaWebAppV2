<script lang="ts" setup>
import ComboBoxField from '@/components/form/ComboBoxField.vue'
import { RuneFactions } from '@/lib/data/RuneFactions'
import { RuneRarity } from '@/lib/data/RuneRarity'
import { formatString } from '@/lib/formatString'
import { RuneRaces } from '@/lib/data/RuneRaces'
import { RuneClasses } from '@/lib/data/RuneClasses'
import type { Ability } from '@/types/Ability'
import SelectWithInput from '@/components/form/SelectWithInput.vue'
import LargeSearchBox from '@/components/form/LargeSearchBox.vue'
import { Conditions } from '@/lib/data/Conditions'
import DisplayRuneFilters from '@/components/runes/DisplayRuneFilters.vue'

interface Props {
  abilities: Ability[]
}

const { abilities } = defineProps<Props>()

const defaultObj = {
  name: 'None',
  value: ''
}

const runeTypes = [
  defaultObj,
  { name: 'Champion', value: 'champs' },
  { name: 'Spell', value: 'spells' },
  { name: 'Relic', value: 'relics' },
  { name: 'Equipment', value: 'equips' }
]

const factions = [
  defaultObj,
  ...RuneFactions.map((faction) => {
    return { name: faction, value: faction }
  })
]

const rarities = [
  defaultObj,
  ...RuneRarity.map((rarity) => {
    return { name: formatString(rarity.toLowerCase()), value: rarity }
  })
]

const races = [
  defaultObj,
  ...RuneRaces.map((race) => {
    return { name: race, value: race }
  })
]

const classes = [
  defaultObj,
  ...RuneClasses.map((classType) => {
    return { name: classType, value: classType }
  })
]

const abilityOptions = [
  defaultObj,
  ...abilities.map((ability) => {
    return { name: ability.name, value: ability.name }
  })
]

const condOptions = [
  defaultObj,
  ...Conditions.map((con) => {
    return { name: con.name, value: con.value }
  })
]

const speed = [
  defaultObj,
  { name: '8', value: 8 },
  { name: '7', value: 7 },
  { name: '6', value: 6 },
  { name: '5', value: 5 },
  { name: '4', value: 4 },
  { name: '3', value: 3 }
]
</script>

<template>
  <div class="bg-gray-900/50 border-b border-gray-700">
    <div class="flex flex-col gap-2 p-4">
      <div
        class="flex flex-row sm:gap-6 gap-y-4 gap-x-2 sm:gap-x-3 py-4 items-start flex-wrap sm:justify-start"
      >
        <LargeSearchBox query-name="name" />
        <ComboBoxField :options="runeTypes" disable-input label="Card Type" query-name="type" />
        <ComboBoxField :options="factions" label="Faction" query-name="faction" />
        <ComboBoxField :options="rarities" label="Rarity" query-name="rarity" />
        <ComboBoxField :options="abilityOptions" label="Abilities" query-name="ability" />
        <ComboBoxField :options="races" label="Races" query-name="race" />
        <ComboBoxField :options="classes" label="Classes" query-name="class" />
        <SelectWithInput label="Nora Cost" query-name="noraCost" type="number" />
        <ComboBoxField :options="speed" label="Speed" query-name="speed" />
        <ComboBoxField :options="condOptions" label="Condition" query-name="condition" />
      </div>
    </div>
    <div>
      <DisplayRuneFilters />
    </div>
  </div>
</template>

<style scoped></style>
