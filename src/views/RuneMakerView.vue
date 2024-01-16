<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRunes } from '@/hooks/useRunes'
import ComboBoxField from '@/components/form/ComboBoxField.vue'
import { onMounted, ref, watch } from 'vue'
import type { Options } from '@/types/Options'
import RuneViewTabs from '@/components/creator/RuneViewTabs.vue'
import { useRuneStore } from '@/stores/rune'
import { storeToRefs } from 'pinia'
import PageSectionLayout from '@/components/layout/PageSectionLayout.vue'
import { useAbilities } from '@/hooks/useAbilities'
import BaseStatsSection from '@/components/creator/BaseStatsSection.vue'
import type { Champion } from '../types/Champion'
import AbilitiesSection from '@/components/creator/AbilitiesSection.vue'
import { useRouteStore } from '@/stores/storeRoute'
import { AbilityQueryCodes } from '@/lib/data/AbilityQueryCodes'
import { BaseStatQueryCodes } from '@/lib/data/BaseStatQueryCodes'
import NoraCostSection from '@/components/creator/NoraCostSection.vue'
import { EmptyNormalAbility } from '@/lib/data/EmptyAbility'

const { data: res, error } = useRunes()
const { data: abilitiesRes, error: abilitiesError } = useAbilities()

const options = ref<Options[]>([
  {
    name: 'None',
    value: ''
  }
])

const defaultVals = ref<Options[]>()

onMounted(() => {
  routeStore.initialiseQueries()

  if (queries.value && queries.value.length > 0) {
    routeStore.setDefaultQueries(queries.value)
  }
})

watch(res, () => {
  if (!res.value?.data?.champs) return
  const runes = res.value.data.champs
  const runeOpts: Options[] = runes.map((rune) => {
    return {
      name: rune.name,
      value: rune.id
    }
  })
  routeStore.updateQueriesFromURL()
  options.value.push(...runeOpts)
})

const routeStore = useRouteStore()
const { queries } = storeToRefs(routeStore)

const runeStore = useRuneStore()
const { setRune } = runeStore
const { rune } = storeToRefs(runeStore)

// TODO - Can't update abilities that already have a value :sad:

watch(
  () => queries.value?.find((query) => query.name === 'rune'),
  (newVal) => {
    if (res.value?.data?.champs && newVal?.value) {
      const runes = res.value.data.champs
      const runeFind = runes.find((rune) => rune.id === parseInt(newVal.value.toString()))
      if (runeFind) {
        setRune(runeFind)
      }
    } else return
  }
)

watch(queries, (newVal, oldVal) => {
  const checkOld = oldVal?.find((query) => query.name === 'rune')
  const checkNew = newVal?.find((query) => query.name === 'rune')
  if (checkOld?.value !== checkNew?.value) {
    // If the rune has changed, return nothing
    routeStore.removeAllQueries(['change', 'rune'])
    return
  }
  if (newVal && newVal.length > 0) {
    newVal.forEach((query) => {
      const findAbilityQuery = AbilityQueryCodes.find((code) => code === query.name)
      if (findAbilityQuery) {
        const ability = abilitiesRes.value?.abilities?.find(
          (ability) => ability.ability_id === parseInt(query.value.toString())
        )

        if (ability) {
          runeStore.setAbility(ability, findAbilityQuery)
        } else if (!ability && query.value === '999999') {
          runeStore.setAbility(EmptyNormalAbility, findAbilityQuery)
        }
      }

      const findBaseStat = BaseStatQueryCodes.find((code) => code === query.name)
      if (findBaseStat) {
        runeStore.updateUnit(query.name as keyof Champion, query.value)
      }

      if (query.name === 'noraMod') {
        runeStore.updateUnit(query.name as keyof Champion, query.value)
      }
    })
  } else {
    setRune(null)
  }
})
</script>

<template>
  <PageLayout :error="error" :is-loading="!res?.data.champs" title="Rune Creator">
    <PageSectionLayout header="Select a Champion">
      <div class="w-1/6">
        <ComboBoxField :options="options" query-name="rune" />
      </div>
    </PageSectionLayout>

    <!-- Form -->
    <template v-if="rune && abilitiesRes?.abilities">
      <hr />

      <PageSectionLayout :header="rune.name">
        <div class="flex flex-col gap-8">
          <NoraCostSection :rune="rune as Champion" />
          <BaseStatsSection :rune="rune as Champion" />
          <AbilitiesSection :abilities="abilitiesRes.abilities" :rune="rune as Champion" />
        </div>
      </PageSectionLayout>

      <hr />

      <PageSectionLayout header="Rune Preview">
        <span class="text-white">{{ JSON.stringify(queries) }}</span>
        <RuneViewTabs />
      </PageSectionLayout>
    </template>
  </PageLayout>
</template>

<style scoped></style>