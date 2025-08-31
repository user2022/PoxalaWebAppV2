<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import { ref } from 'vue'
import NormalViewTab from '@/components/creator/tabs/NormalViewTab.vue'
import DetailedViewTab from '@/components/creator/tabs/DetailedViewTab.vue'
import { storeToRefs } from 'pinia'
import { useRuneStore } from '@/stores/rune'
import CodeViewTab from '@/components/creator/tabs/CodeViewTab.vue'

const runeStore = useRuneStore()
const { rune } = storeToRefs(runeStore)

const headers = ['Card View', 'Detailed View', 'JSON View']

const selectedTab = ref(headers[0])
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="bg-gray-800/50 sm:mx-0 mx-auto text-muted-foreground inline-flex gap-2 h-11 w-fit items-center justify-center rounded-full py-4 px-2"
    >
      <template v-for="header in headers" :key="header">
        <button
          :class="[
            'sm:w-40 w-24 rounded-full py-1 text-xs sm:text-sm font-medium leading-5 border text-gray-50 hover:bg-gray-700/50 transition-all duration-150',
            'ring-0 focus:outline-none focus:ring-0 focus:outline-0',
            selectedTab === header
              ? 'shadow border-transparent bg-gradient-to-r from-purple-400/50 to-orange-400/50'
              : 'border-transparent'
          ]"
          @click="selectedTab = header"
        >
          {{ header }}
        </button>
      </template>
    </div>
    <template v-if="selectedTab === 'Card View'">
      <NormalViewTab :rune="rune as Champion" />
    </template>
    <template v-else-if="selectedTab === 'Detailed View'">
      <DetailedViewTab
        :highest-lowest-cost="runeStore.getHighestOrLowestPossibleCost"
        :rune="rune as Champion"
      />
    </template>
    <template v-else-if="selectedTab === 'JSON View'">
      <CodeViewTab :rune="rune as Champion" />
    </template>
  </div>
</template>

<style scoped></style>
