<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import type { Runes } from '@/types/Runes'
import RuneList from '@/components/runes/RuneList.vue'
import RuneDisplay from '@/components/runes/RuneDisplay.vue'
import DeckHolder from '@/components/deck/DeckHolder.vue'
import RuneFilter from '@/components/runes/RuneFilter.vue'
import DisplayRuneFilters from '@/components/runes/DisplayRuneFilters.vue'
import type { Ability } from '@/types/Ability'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { runePageFilters } from '@/lib/util/runePageFilters'
import { useRunes } from '@/hooks/useRunes'
import { useAbilities } from '@/hooks/useAbilities'
import PageSectionLayout from '@/components/layout/PageSectionLayout.vue'
import { useRouteStore } from '@/stores/storeRoute'

interface AbilityResponse {
  success: boolean
  data: Ability[]
}

const poxalaApi = import.meta.env.VITE_POXALA_API

// const abilitiesResponse = await axios.get('https://us-central1-poxala-fa4ce.cloudfunctions.net/getChampionAbilities')
const { data: abilities, error: abilitiesError } = useAbilities()
const { data: res, error } = useRunes()

const runes = ref<Runes | undefined>(res.value?.data)

const route = useRoute()

const routeStore = useRouteStore()

onMounted(() => {
  routeStore.initialiseQueries()
})

watch(res, () => {
  if (res.value?.data) runes.value = res.value?.data
})

watchEffect(() => {
  if (!runes.value || !res.value?.data) return
  let data: Runes = JSON.parse(JSON.stringify(res.value.data)) // Keep copy of original data

  runePageFilters(route, data)

  runes.value = data
})

const runeType = computed(() => {
  return route.query.type || 'champs'
})
</script>

<template>
  <PageLayout :error="error" title="Deck Builder">
    <template v-if="runes && abilities?.abilities">
      <RuneFilter :abilities="abilities?.abilities" />
      <DisplayRuneFilters />
      <div class="flex flex-row gap-4">
        <PageSectionLayout header="Rune Detail">
          <RuneDisplay />
        </PageSectionLayout>
        <PageSectionLayout header="Champions">
          <RuneList key="Champs" :per-page="70" :runes="runes[runeType as keyof Runes]" />
        </PageSectionLayout>
      </div>
      <DeckHolder />
    </template>
  </PageLayout>
</template>

<style scoped></style>