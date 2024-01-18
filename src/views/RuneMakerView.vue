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
import { type AbilityQueryCode } from '@/lib/data/AbilityQueryCodes'
import NoraCostSection from '@/components/creator/NoraCostSection.vue'
import { EmptyNormalAbility } from '@/lib/data/EmptyAbility'

const { data: res, error } = useRunes()
const { data: abilitiesRes, error: abilitiesError } = useAbilities()

const poxApi = import.meta.env.VITE_POXAPI

const options = ref<Options[]>([
  {
    name: 'None',
    value: ''
  }
])

onMounted(() => {
  routeStore.initialiseQueries()

  if (queries.value && queries.value.length > 0) {
    routeStore.setDefaultQueries(queries.value)
  }
})

watch(res, () => {
  if (!res.value?.data?.champs) return
  const runeOpts: Options[] = res.value.data.champs.map((rune) => {
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

watch(
  () => queries.value?.find((query) => query.name === 'rune'),
  (newVal) => {
    if (res.value?.data.champs && newVal?.value) {
      const runes = res.value.data.champs
      const runeFind = runes.find((rune) => rune.id === parseInt(newVal.value.toString()))
      if (runeFind) {
        // routeStore.resetBothDefaultQueries()
        setRune(runeFind)
      }
    } else return
  }
)

const baseStatWatcher = (key: keyof Champion) => {
  watch(
    () => queries.value?.find((query) => query.name === key),
    (newVal, oldVal) => {
      if (newVal === oldVal) return
      if (newVal) {
        runeStore.updateUnit(key, newVal.value)
      }
    },
    { deep: true }
  )
}

const abilityWatcher = (key: AbilityQueryCode) => {
  watch(
    () => queries.value?.find((query) => query.name === key),
    (newVal, oldVal) => {
      if (newVal === oldVal) return
      if (newVal) {
        const ability = abilitiesRes.value?.abilities?.find(
          (ability) => ability.ability_id === parseInt(newVal.value.toString())
        )

        if (ability) {
          runeStore.setAbility(ability, key)
        } else if (!ability && newVal.value === '999999') {
          runeStore.setAbility(EmptyNormalAbility, key)
        }
      }
    },
    { deep: true }
  )
}

// Abilities
abilityWatcher('b1')
abilityWatcher('b2')
abilityWatcher('b3')
abilityWatcher('b4')
abilityWatcher('b5')
abilityWatcher('b6')
abilityWatcher('s1u1')
abilityWatcher('s1u2')
abilityWatcher('s1u3')
abilityWatcher('s2u1')
abilityWatcher('s2u2')
abilityWatcher('s2u3')
// Base Stats
baseStatWatcher('hitPoints')
baseStatWatcher('speed')
baseStatWatcher('damage')
baseStatWatcher('minRng')
baseStatWatcher('maxRng')
baseStatWatcher('defense')
// Nora mod
baseStatWatcher('noraMod')

// TODO bug with abom, when changing to it it resets all combo boxes. Possibly unrelated to watcher code

// TODO this needs redoing...
// watch(queries, (newVal, oldVal) => {
//   const checkOld = oldVal?.find((query) => query.name === 'rune')
//   const checkNew = newVal?.find((query) => query.name === 'rune')
//   // if (checkOld?.value !== checkNew?.value) {
//   //   // If the rune has changed, return nothing
//   //   // routeStore.removeAllQueries(['change', 'rune'])
//   //
//   //   // champions.value = res.value?.data?.champs ?? []
//   //
//   //   // TODO : Reset runes upon changing rune
//   //   // TODO : Find why its applying the ability to new champ
//   //   return
//   // }
//
//   if (newVal && newVal.length > 0) {
//     newVal.forEach((query) => {
//       // const findOld = oldVal?.find((oldQuery) => oldQuery.name === query.name)
//       // if (findOld) return
//     })
//   } else {
//     setRune(null)
//   }
// })
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
        <div class="w-20 h-20">
          <img
            :src="`${poxApi}/images/runes/idols/${rune.hash}.gif`"
            alt="rune-idol"
            class="idol"
          />
        </div>
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