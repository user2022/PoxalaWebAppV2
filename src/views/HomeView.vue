<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import type { Runes } from '@/types/Runes'
import RuneList from '@/components/runes/RuneList.vue'
import RuneDisplay from '@/components/runes/RuneDisplay.vue'
import DeckHolder from '@/components/deck/DeckHolder.vue'
import RuneFilter from '@/components/runes/RuneFilter.vue'
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
import Container from '@/components/shared/Container.vue'

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

const saveDeckModal = ref<boolean>(false)

const closeSaveModal = () => {
  saveDeckModal.value = false
}

const openSaveModal = () => {
  saveDeckModal.value = true
}

const { isMobile, isSmaller } = useScreenSize()

const perPage = computed(() => {
  if (isMobile.value && isSmaller.value) return 20
  if (isMobile.value && !isSmaller.value) return 45
  return 70
})
</script>

<template>
  <PageLayout :error="error" :is-loading="!res" title="Deck Builder">
    <template v-if="runes && abilitiesRes?.abilities" #children>
      <RuneFilter :abilities="abilitiesRes.abilities" />
    </template>
    <DeckSaveModal :close-modal="closeSaveModal" :show-modal="saveDeckModal" />
    <template v-if="runes && abilitiesRes?.abilities">
      <div class="flex md:flex-row-reverse flex-col gap-4 justify-center sm:justify-start">
        <Container>
          <PageSectionLayout :header="getTypeHeader" :on-share="onShare">
            <RuneList key="Champs" :per-page="perPage" :runes="runes[runeType as keyof Runes]" />
          </PageSectionLayout>
        </Container>
        <div v-if="!isMobile">
          <Container>
            <PageSectionLayout header="Rune Detail">
              <RuneDisplay show-add />
            </PageSectionLayout>
          </Container>
        </div>
        <div v-else>
          <RuneDisplay show-add />
        </div>
      </div>
      <DeckHolder :open-save-modal="openSaveModal" />
    </template>
  </PageLayout>
</template>

<style scoped></style>
