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
import { onShare } from '@/lib/util/copyURLtoClipboard'
import Modal from '@/components/shared/Modal.vue'
import InputNormal from '@/components/form/normal/InputNormal.vue'
import { format } from 'date-fns'
import { useRoute } from 'vue-router'
import RuneFavorites from '@/components/creator/RuneFavorites.vue'
import type { FavoriteRune } from '@/types/FavoriteRune'

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
  if (!res.value?.champs) return
  const runeOpts: Options[] = res.value.champs.map((rune) => {
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
    if (res.value?.champs && newVal?.value) {
      const runes = res.value.champs
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

const input = ref<string>('')
const setInput = (val: string) => {
  input.value = val
}

const showModal = ref<boolean>(false)
const setModal = (val: boolean) => {
  showModal.value = val
}

const route = useRoute()

const onSave = () => {
  if (!rune.value) return
  const date = new Date()

  const objToSave: FavoriteRune = {
    name: input.value,
    date: format(date, 'dd/MM/yyyy'),
    path: route.fullPath,
    sprite: rune.value.hash,
    champName: rune.value.name
  }

  const currentData = localStorage.getItem('savedRunes')
  if (currentData) {
    const parsed = JSON.parse(currentData)
    parsed.push(objToSave)
    localStorage.setItem('savedRunes', JSON.stringify(parsed))
  } else {
    localStorage.setItem('savedRunes', JSON.stringify([objToSave]))
  }
  setModal(false)
  input.value = ''
}
</script>

<template>
  <PageLayout :error="error" :is-loading="!res?.champs" title="Rune Creator">
    <Modal v-if="showModal" :close-modal="setModal" :on-save="onSave" header="Save to Favorites">
      <InputNormal :input="input" :set-input="setInput" label="Name" name="name" />
      <p class="text-neutral-300 text-xs">
        * This will save the rune data into your browsers local storage, which means this data will
        be permanently removed in the event you clear your browsers cache.
      </p>
    </Modal>
    <!-- Saved Runes -->
    <RuneFavorites />

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

      <PageSectionLayout :on-save="() => setModal(true)" :on-share="onShare" header="Rune Preview">
        <RuneViewTabs />
      </PageSectionLayout>
    </template>
  </PageLayout>
</template>

<style scoped></style>
