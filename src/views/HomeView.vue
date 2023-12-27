<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import type { Runes } from '@/types/Runes'
import RuneList from '@/components/runes/RuneList.vue'
import useSWRV from 'swrv'
import RuneDisplay from '@/components/runes/RuneDisplay.vue'
import DeckHolder from '@/components/deck/DeckHolder.vue'
import RuneFilter from '@/components/runes/RuneFilter.vue'
import DisplayRuneFilters from '@/components/runes/DisplayRuneFilters.vue'
import type { Ability } from '@/types/Ability'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { runePageFilters } from '@/lib/util/runePageFilters'

interface RunesResponse {
  success: boolean
  data: Runes
}

interface AbilityResponse {
  success: boolean
  data: Ability[]
}

const poxalaApi = import.meta.env.VITE_POXALA_API

// const abilitiesResponse = await axios.get('https://us-central1-poxala-fa4ce.cloudfunctions.net/getChampionAbilities')
const { data: abilities, error: abilitiesError } = useSWRV<AbilityResponse, Error>(
  'abilities',
  () => {
    return fetch(`${poxalaApi}/getChampionAbilities`)
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  }
)

const runes = ref<Runes>()

const { data: res, error } = useSWRV<RunesResponse, Error>('runes', () => {
  return fetch(`${poxalaApi}/getRunes`)
    .then((res) => res.json())
    .then((res) => {
      runes.value = res.data
      console.log(res.data)
      return res
    })
})

console.log(res.value)

const route = useRoute()

watchEffect(() => {
  if (!runes.value || !res.value?.data) return
  let data: Runes = JSON.parse(JSON.stringify(res.value.data)) // Keep copy of original data

  runePageFilters(route, data)

  runes.value = data
})

const runeType = computed(() => {
  return route.query.type || 'champs'
})

console.log(res)
</script>

<template>
  <PageLayout :error="error" title="Deck Builder">
    <template v-if="runes && abilities?.data">
      <RuneFilter :abilities="abilities.data" />
      <DisplayRuneFilters />
      <div class="flex flex-row gap-4">
        <RuneDisplay />
        <RuneList key="Champs" :runes="runes[runeType]" header="Champions" type="champ" />
      </div>
      <DeckHolder />
    </template>
  </PageLayout>
</template>

<style scoped></style>