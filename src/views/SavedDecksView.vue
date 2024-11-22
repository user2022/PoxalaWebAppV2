<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import CardContainer from '@/components/layout/CardContainer.vue'
import { onMounted, ref } from 'vue'
import type { StorageDeck } from '@/lib/util/saveDeckToStorage'
import FactionAmount from '@/components/deck/FactionAmount.vue'
import { X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const savedDecks = ref<StorageDeck[]>([])

onMounted(() => {
  // Get the saved decks from local storage
  const decks = localStorage.getItem('storageDeck')
  if (decks) {
    savedDecks.value = JSON.parse(decks)
  }
})

const router = useRouter()

const onCardClick = (deck: StorageDeck) => {
  router.push(`/deck${deck.deckUrl}`)
}

const onDeleteClick = (index: number) => {
  // Remove the deck from the saved decks
  savedDecks.value.splice(index, 1)
  // Save the new saved decks to local storage
  localStorage.setItem('storageDeck', JSON.stringify(savedDecks.value))
}
</script>

<template>
  <PageLayout title="Saved Decks">
    <div class="flex flex-col gap-4 mt-6">
      <p v-if="savedDecks.length === 0" class="text-neutral-300">
        This page will display all the decks that you have saved.
      </p>
      <div v-else class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <template v-for="(deck, index) in savedDecks" :key="index">
          <CardContainer no-padding>
            <div class="flex flex-row justify-between items-center w-full h-full">
              <div
                class="flex flex-col gap-4 h-full w-full justify-start pl-4 py-2 cursor-pointer hover:bg-neutral-600 rounded-l-md"
                @click="() => onCardClick(deck)"
              >
                <div class="flex flex-row gap-2 items-center w-full">
                  <h1 class="text-xl text-alpha-200 font-bold mr-4">{{ deck.name }}</h1>
                  <template
                    v-for="(detail, index) in deck.factionAmount"
                    :key="detail.amount + index"
                  >
                    <FactionAmount
                      :amount="detail.amount"
                      :faction-number="detail.factionNumber"
                      text-col="text-neutral-300"
                    />
                  </template>
                </div>
                <h2 class="text-neutral-50 text-sm">
                  By <span class="font-semibold">{{ deck.user }},</span>
                  <span class="text-xs text-neutral-300">
                    saved on <span class="italic">{{ deck.timestamp }}</span></span
                  >
                </h2>
              </div>
              <div
                class="h-full flex justify-center items-center cursor-pointer px-4 border-l border-neutral-800 rounded-r-md hover:bg-neutral-600"
                @click="() => onDeleteClick(index)"
              >
                <X class="text-neutral-300" />
              </div>
            </div>
          </CardContainer>
        </template>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped></style>
