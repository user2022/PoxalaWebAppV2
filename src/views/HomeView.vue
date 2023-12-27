<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import type { Runes } from '@/types/Runes'
import RuneList from '@/components/runes/RuneList.vue'
import RuneDisplay from '@/components/runes/RuneDisplay.vue'
import DeckHolder from '@/components/deck/DeckHolder.vue'
import RuneFilter from '@/components/runes/RuneFilter.vue'
import DisplayRuneFilters from '@/components/runes/DisplayRuneFilters.vue'
import type { Ability } from '@/types/Ability'
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { runePageFilters } from '@/lib/util/runePageFilters'
import { useRunes } from '@/hooks/useRunes'
import { useAbilities } from '@/hooks/useAbilities'

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

console.log(res)
</script>

<template>
  <PageLayout :error="error" title="Deck Builder">
    <template v-if="runes && abilities?.data">
      <RuneFilter :abilities="abilities.data" />
      <DisplayRuneFilters />
      <div class="flex flex-row gap-4">
        <RuneDisplay />
        <RuneList
          key="Champs"
          :runes="runes[runeType as keyof Runes]"
          header="Champions"
          type="champ"
        />
      </div>
      <DeckHolder />
    </template>
  </PageLayout>
</template>

<style scoped></style>