<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import { onMounted, ref } from 'vue'
import type { StorageDeck } from '@/lib/util/saveDeckToStorage'
import { useRouter } from 'vue-router'
import Container from '@/components/shared/Container.vue'
import FactionAmount from '@/components/deck/FactionAmount.vue'
import Button from '@/components/shared/Button.vue'
import { BookOpenIcon, Eye, Trash } from 'lucide-vue-next'
import DetailAbilityText from '@/components/creator/DetailAbilityText.vue'

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
    <Container>
      <div class="flex flex-col gap-4">
        <p
          v-if="savedDecks.length === 0"
          class="flex flex-col items-center justify-center py-20 text-center"
        >
          <BookOpenIcon
            class="w-16 h-16 text-green-400 animate-pulse drop-shadow-[0_0_12px_rgba(34,197,94,0.8)]"
          />
          <span class="mt-4 text-lg font-semibold text-gray-300">
            This page will display the decks that you have saved.
          </span>
        </p>
        <div
          v-else
          class="flex flex-row flex-wrap items-center gap-4 justify-center md:justify-start"
        >
          <template v-for="(deck, index) in savedDecks" :key="index">
            <div
              class="transition-all duration-200 border rounded-xl bg-gray-800/30 hover:bg-gray-800/50 border-gray-700 hover:border-gray-500 shadow w-[320px] md:min-w-[360px]"
            >
              <div
                class="w-full rounded-t-xl h-32 bg-gradient-to-tl from-gray-700 to-gray-800 flex items-center justify-center"
              >
                <h2 class="text-3xl poxala-gradient font-bold text-shadow-md">{{ deck.name }}</h2>
              </div>
              <div class="p-4 border-b border-gray-700 text-gray-50 flex flex-col gap-3">
                <DetailAbilityText
                  :value="deck.user"
                  c-class="border border-gray-600"
                  custom-bg="bg-gray-800/50"
                  name="Created by"
                />
                <DetailAbilityText
                  :value="deck.timestamp"
                  c-class="border border-gray-600"
                  custom-bg="bg-gray-800/50"
                  name="At"
                />

                <div class="flex flex-row items-center gap-2 mx-auto mt-4">
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
              </div>

              <div class="p-4 flex flex-row gap-4 justify-between">
                <Button label="View" size="sm" variant="success" @click="() => onCardClick(deck)">
                  <template #icon>
                    <component :is="Eye" class="w-4 h-4" />
                  </template>
                </Button>
                <Button
                  label="Delete"
                  size="sm"
                  variant="destructive"
                  @click="() => onDeleteClick(index)"
                >
                  <template #icon>
                    <component :is="Trash" class="w-4 h-4" />
                  </template>
                </Button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </Container>
  </PageLayout>
</template>

<style scoped></style>
