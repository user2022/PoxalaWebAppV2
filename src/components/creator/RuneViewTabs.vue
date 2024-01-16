<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import { ref } from 'vue'
import NormalViewTab from '@/components/creator/tabs/NormalViewTab.vue'
import DetailedViewTab from '@/components/creator/tabs/DetailedViewTab.vue'
import { storeToRefs } from 'pinia'
import { useRuneStore } from '@/stores/rune'

const runeStore = useRuneStore()
const { rune } = storeToRefs(runeStore)

const headers = ['Card View', 'Detailed View']

const selectedTab = ref(headers[0])
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row items-center gap-4">
      <template v-for="header in headers" :key="header">
        <button
          :class="[
            'w-40 rounded-lg py-2.5 text-sm font-medium leading-5 border',
            'ring-white/60 focus:outline-none focus:ring-0',
            selectedTab === header
              ? 'bg-alpha-700/50 border-alpha-400 text-neutral-50 shadow text-white'
              : 'text-blue-100 bg-alpha-700/20 border-transparent hover:bg-alpha-700/50 text-alpha-200'
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
      <DetailedViewTab />
    </template>
  </div>
</template>

<style scoped></style>