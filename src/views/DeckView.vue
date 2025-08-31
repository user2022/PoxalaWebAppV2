<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRouteStore } from '@/stores/storeRoute'
import { computed, onMounted, ref, watch } from 'vue'
import { useRunes } from '@/hooks/useRunes'
import type { Rune, RuneType } from '@/types/Runes'
import RuneDisplay from '@/components/runes/RuneDisplay.vue'
import DeckRuneList from '@/components/deck/DeckRuneList.vue'
import { getFactionAmountFromDeck } from '@/lib/getFactionAmountFromDeck'
import FactionAmount from '@/components/deck/FactionAmount.vue'
import NoraCostDisplay from '@/components/creator/NoraCostDisplay.vue'
import ShareBtn from '@/components/shared/icon-btns/ShareBtn.vue'
import { onShare } from '@/lib/util/copyURLtoClipboard'
import SaveBtn from '@/components/shared/icon-btns/SaveBtn.vue'
import { useToastStore } from '@/stores/toast'
import { saveDeckToStorage, type StorageDeck } from '@/lib/util/saveDeckToStorage'
import Container from '@/components/shared/Container.vue'

const routeStore = useRouteStore()

const { data: res, error } = useRunes()

const runes = ref<Rune[]>([])

onMounted(() => {
  routeStore.initialiseQueries()
})

const appendRunes = () => {
  if (res.value) {
    // Proceed
    const runeString = routeStore.getQuery('runes')

    if (runeString?.value) {
      const runeData = runeString.value.toString().split('-')

      let champs: number[] = []
      let spells: number[] = []
      let equips: number[] = []
      let relics: number[] = []

      for (const rune of runeData) {
        const [runeType, runeId] = rune.split(':')
        if (runeType === 'c') {
          champs.push(parseInt(runeId))
        } else if (runeType === 's') {
          spells.push(parseInt(runeId))
        } else if (runeType === 'e') {
          equips.push(parseInt(runeId))
        } else if (runeType === 'r') {
          relics.push(parseInt(runeId))
        }
      }

      const runeList: Rune[] = []

      const addRunesToList = (items: number[], type: RuneType) => {
        for (const item of items) {
          const find = res?.value?.[type].find((rune: Rune) => rune.id === item)
          if (find) {
            find.type = type.slice(0, -1)
            runeList.push(find)
          }
        }
      }

      addRunesToList(champs, 'champs')
      addRunesToList(spells, 'spells')
      addRunesToList(relics, 'relics')
      addRunesToList(equips, 'equips')

      runes.value = runeList.filter((rune): rune is Rune => rune !== undefined)
    }
  }
}

watch(res, () => {
  appendRunes()
})

watch(
  () => routeStore.getQuery('runes')?.value,
  () => {
    appendRunes()
  }
)

const facAmount = computed(() => {
  return getFactionAmountFromDeck(runes.value)
})

const averageNoraCost = computed(() => {
  const champRunes = runes.value.filter((rune) => rune.type === 'champ')
  const totalCost = champRunes.reduce((acc, rune) => acc + rune.noraCost, 0)
  const average = totalCost / champRunes.length
  return Math.round(average)
})

const totalChampRunes = computed(() => {
  return runes.value.filter((rune) => rune.type === 'champ').length
})
const totalSpellRunes = computed(() => {
  return runes.value.filter((rune) => rune.type === 'spell').length
})
const totalRelicRunes = computed(() => {
  return runes.value.filter((rune) => rune.type === 'relic').length
})
const totalEquipRunes = computed(() => {
  return runes.value.filter((rune) => rune.type === 'equip').length
})

const onSave = async () => {
  const toast = useToastStore()
  try {
    // Check if already exists in localStorage
    const decks = localStorage.getItem('storageDeck')

    const query = window.location.search

    if (decks) {
      const parsedDecks = JSON.parse(decks) as StorageDeck[]
      const exists = parsedDecks.find((deck) => deck.deckUrl === query)
      if (exists) {
        toast.setToast('Deck already exists in your saved decks')
        return
      }
    }

    const name = routeStore.getQuery('deckName')?.value.toString() ?? 'Deck'
    const user = routeStore.getQuery('user')?.value.toString() ?? 'Unknown'
    const facs = getFactionAmountFromDeck(runes.value)

    saveDeckToStorage(query, name, user, facs)

    toast.setToast('Deck saved successfully')
  } catch (err) {
    toast.setToast('Error saving deck')
  }
}
</script>

<template>
  <PageLayout
    :error="error"
    :is-loading="!res"
    :title="routeStore?.getQuery('deckName')?.value.toString() ?? 'Deck'"
  >
    <Container>
      <div class="flex flex-row gap-4 justify-center md:justify-start mt-2 mb-4">
        <p class="text-3xl poxala-gradient font-bold">
          Created by {{ routeStore?.getQuery('user')?.value.toString() ?? 'Unknown' }}
        </p>

        <ShareBtn :on-click="onShare" />
        <SaveBtn :on-click="onSave" />
      </div>
      <div class="flex flex-col gap-3">
        <div
          class="flex flex-row gap-4 flex-wrap md:justify-start sm:justify-center lg:flex-nowrap sm:flex-shrink items-start"
        >
          <div>
            <RuneDisplay />
          </div>
          <div class="flex flex-col gap-4">
            <div>
              <Container>
                <DeckRuneList :deck-holder="runes" large-rune />
              </Container>
            </div>
            <Container>
              <div class="flex flex-row md:justify-between justify-center gap-4 flex-wrap">
                <div class="flex flex-row gap-8">
                  <NoraCostDisplay
                    :value="totalChampRunes"
                    custom-color="bg-red-700/50"
                    header="Champs"
                  />
                  <NoraCostDisplay
                    :value="totalSpellRunes"
                    custom-color="bg-blue-400/50"
                    header="Spells"
                  />
                  <NoraCostDisplay
                    :value="totalRelicRunes"
                    custom-color="bg-green-300/50"
                    header="Relics"
                  />
                  <NoraCostDisplay
                    :value="totalEquipRunes"
                    custom-color="bg-purple-600/50"
                    header="Equips"
                  />
                </div>
                <div class="flex flex-row gap-2">
                  <template v-for="(detail, index) in facAmount" :key="detail.amount + index">
                    <FactionAmount
                      :amount="detail.amount"
                      :faction-number="detail.factionNumber"
                      text-col="text-neutral-300"
                    />
                  </template>
                </div>
              </div>
              <div class="flex justify-center md:justify-start">
                <NoraCostDisplay :value="averageNoraCost" header="Avg Champ Cost" />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </Container>
  </PageLayout>
</template>

<style scoped></style>
