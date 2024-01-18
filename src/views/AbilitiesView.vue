<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import LargeSearchBox from '@/components/form/LargeSearchBox.vue'
import { useAbilities } from '@/hooks/useAbilities'
import SelectorField from '@/components/form/SelectorField.vue'
import type { Options } from '@/types/Options'
import AbilityCard from '@/components/abilities/AbilityCard.vue'

const { data: res, error } = useAbilities()

console.log(res.value?.abilities)

const options: Options[] = [
  {
    name: 'None',
    value: '',
    disabled: true
  },
  {
    name: 'Nora Cost',
    value: 'noraCost'
  },
  {
    name: 'Name',
    value: 'name'
  },
  {
    name: 'AP Cost',
    value: 'apCost'
  }
]
</script>

<template>
  <PageLayout :error="error" title="Abilities">
    <LargeSearchBox query-name="abilityName" />
    <div class="flex flex-row flex-wrap gap-10">
      <SelectorField :options="options" label="Sort by (asc)" />
      <!--      <ToggleButton label="Show unused abilities" />-->
    </div>
    <template v-for="ability in res?.abilities" :key="ability.id">
      <AbilityCard :ability="ability" />
    </template>
  </PageLayout>
</template>

<style scoped></style>