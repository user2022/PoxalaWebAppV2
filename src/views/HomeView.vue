<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import type { Runes } from '@/types/Runes'
import RuneList from '@/components/runes/RuneList.vue'
import RuneDisplay from '@/components/runes/RuneDisplay.vue'
import DeckHolder from '@/components/deck/DeckHolder.vue'
import RuneFilter from '@/components/runes/RuneFilter.vue'
import DisplayRuneFilters from '@/components/runes/DisplayRuneFilters.vue'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { runePageFilters } from '@/lib/util/runePageFilters'
import { useRunes } from '@/hooks/useRunes'
import { useAbilities } from '@/hooks/useAbilities'
import PageSectionLayout from '@/components/layout/PageSectionLayout.vue'
import { useRouteStore } from '@/stores/storeRoute'
import { onShare } from '@/lib/util/copyURLtoClipboard'
import { useScreenSize } from '@/lib/util/useScreenSize'
import DeckSaveModal from '@/components/deck/DeckSaveModal.vue'

const poxalaApi = import.meta.env.VITE_POXALA_API

// const abilitiesResponse = await axios.get('https://us-central1-poxala-fa4ce.cloudfunctions.net/getChampionAbilities')
const { data: abilitiesRes, error: abilitiesError } = useAbilities()
const { data: res, error } = useRunes()

const runes = ref<Runes | undefined>(res.value)

const route = useRoute()

const routeStore = useRouteStore()

onMounted(() => {
  routeStore.initialiseQueries()
})

watch(res, () => {
  if (res.value) runes.value = res.value
})

watchEffect(() => {
  if (!runes.value || !res.value) return
  let data: Runes = JSON.parse(JSON.stringify(res.value)) // Keep copy of original data

  runePageFilters(route, data)

  runes.value = data
})

const runeType = computed(() => {
  return route.query.type || 'champs'
})

const getTypeHeader = computed(() => {
  if (route.query.type === 'champs') return 'Champions'
  else if (route.query.type === 'spells') return 'Spells'
  else if (route.query.type === 'equips') return 'Equips'
  else if (route.query.type === 'relics') return 'Relics'
  else return 'Champions'
})

const { isMobile } = useScreenSize()

const saveDeckModal = ref<boolean>(false)

const closeSaveModal = () => {
  saveDeckModal.value = false
}

const openSaveModal = () => {
  saveDeckModal.value = true
}
</script>

<template>
  <PageLayout :error="error" :is-loading="!res" title="Deck Builder">
    <DeckSaveModal :close-modal="closeSaveModal" :show-modal="saveDeckModal" />
    <template v-if="runes && abilitiesRes?.abilities">
      <RuneFilter :abilities="abilitiesRes.abilities" />
      <DisplayRuneFilters />
      <div class="flex md:flex-row flex-col gap-4 justify-center sm:justify-start">
        <PageSectionLayout header="Rune Detail">
          <RuneDisplay show-add />
        </PageSectionLayout>
        <PageSectionLayout :header="getTypeHeader" :on-share="onShare">
          <RuneList key="Champs" :per-page="70" :runes="runes[runeType as keyof Runes]" />
        </PageSectionLayout>
      </div>
      <DeckHolder v-if="!isMobile" :open-save-modal="openSaveModal" />
    </template>
  </PageLayout>
</template>

<style scoped></style>
