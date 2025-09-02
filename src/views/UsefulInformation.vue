<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRunes } from '@/hooks/useRunes'
import { getBannedRunes } from '@/lib/util/getBannedRunes'
import { Ellipsis } from 'lucide-vue-next'

const relocation = [
  {
    title: 'Manic',
    src: 'https://i.imgur.com/mUW6GlH.png'
  },
  {
    title: 'Pounce/beset',
    src: 'https://i.imgur.com/aL34SW9.png'
  },
  {
    title: 'Knockback',
    src: 'https://i.imgur.com/mGg5uri.jpeg'
  }
]

const SPFF = [
  { noraCost: '0-12', deployRefund: 1, deathRefund: 1 },
  { noraCost: '13-25', deployRefund: 2, deathRefund: 1 },
  { noraCost: '26-37', deployRefund: 3, deathRefund: 2 },
  { noraCost: '38-50', deployRefund: 4, deathRefund: 2 },
  { noraCost: '51-62', deployRefund: 5, deathRefund: 3 },
  { noraCost: '63-75', deployRefund: 6, deathRefund: 3 },
  { noraCost: '76-87', deployRefund: 7, deathRefund: 4 },
  { noraCost: '88-100', deployRefund: 8, deathRefund: 4 },
  { noraCost: '101-112', deployRefund: 9, deathRefund: 5 },
  { noraCost: '113-125', deployRefund: 10, deathRefund: 5 },
  { noraCost: '126-137', deployRefund: 11, deathRefund: 6 },
  { noraCost: '138-150', deployRefund: 12, deathRefund: 6 }
]

const SPSplit = [
  { noraCost: '0-25', deployRefund: 1, deathRefund: 1 },
  { noraCost: '26-50', deployRefund: 2, deathRefund: 1 },
  { noraCost: '51-75', deployRefund: 3, deathRefund: 2 },
  { noraCost: '76-100', deployRefund: 4, deathRefund: 2 },
  { noraCost: '101-125', deployRefund: 5, deathRefund: 3 },
  { noraCost: '126-150', deployRefund: 6, deathRefund: 3 }
]

const { data: res, error } = useRunes()
</script>

<template>
  <PageLayout text-centered title="Useful Information">
    <div class="flex flex-col gap-10 justify-center items-center w-full max-w-4xl mx-auto px-4">
      <!-- Relocation -->
      <div class="w-full space-y-8">
        <template v-for="item in relocation" :key="item.title">
          <div class="bg-gray-800/20 rounded-xl shadow-md sm:p-4 p-2 flex flex-col items-center">
            <h1 class="text-xl uppercase tracking-wider mb-6 text-center text-gray-100">
              {{ item.title }}
            </h1>
            <img :src="item.src" class="max-w-full sm:max-w-2xl rounded-lg shadow" />
          </div>
        </template>
      </div>

      <!-- Banned Runes -->
      <div
        v-if="res"
        class="w-full bg-gray-800/40 border border-gray-700 rounded-xl shadow-md sm:p-4 p-3"
      >
        <h1 class="text-xl uppercase tracking-wider mb-6 text-center text-gray-100">
          Banned Runes
        </h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p class="text-xl font-semibold text-rose-500 mb-2">Champions</p>
            <div class="flex flex-col gap-1 text-sm text-neutral-300">
              <template v-for="banned in getBannedRunes(res)?.champs" :key="`${banned.id} champ`">
                <p class="px-2 py-1 bg-gray-700/50 rounded">{{ banned.name }}</p>
              </template>
            </div>
          </div>

          <div>
            <p class="text-xl font-semibold text-emerald-500 mb-2">Spells</p>
            <div class="flex flex-col gap-1 text-sm text-neutral-300">
              <template v-for="banned in getBannedRunes(res)?.spells" :key="`${banned.id} spell`">
                <p class="px-2 py-1 bg-gray-700/50 rounded">{{ banned.name }}</p>
              </template>
            </div>
          </div>

          <div>
            <p class="text-xl font-semibold text-amber-500 mb-2">Relics</p>
            <div class="flex flex-col gap-1 text-sm text-neutral-300">
              <template v-for="banned in getBannedRunes(res)?.relics" :key="`${banned.id} relic`">
                <p class="px-2 py-1 bg-gray-700/50 rounded">{{ banned.name }}</p>
              </template>
            </div>
          </div>

          <div>
            <p class="text-xl font-semibold text-cyan-500 mb-2">Equips</p>
            <div class="flex flex-col gap-1 text-sm text-neutral-300">
              <template v-for="banned in getBannedRunes(res)?.equips" :key="`${banned.id} equip`">
                <p class="px-2 py-1 bg-gray-700/50 rounded">{{ banned.name }}</p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Loader fallback -->
      <template v-else>
        <div class="flex flex-col items-center justify-center py-12 space-y-4">
          <Ellipsis
            class="w-12 h-12 text-cyan-400 animate-pulse drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]"
          />
          <p class="text-gray-300 text-sm tracking-wide">Loading banned runes...</p>
        </div>
      </template>

      <!-- Nora Refund -->
      <div class="w-full bg-gray-800/40 border border-gray-700 rounded-xl shadow-lg sm:p-4 p-3">
        <h1 class="text-xl uppercase tracking-wider mb-6 text-center text-gray-100">
          SP Nora Refund
        </h1>

        <div class="space-y-10">
          <!-- Full Faction -->
          <div>
            <p class="text-lg font-medium text-orange-400 mb-3 uppercase tracking-wide">
              Full Faction
            </p>
            <div class="overflow-hidden rounded-lg border border-gray-900/80">
              <table class="w-full border-collapse border-gray-700 text-sm text-neutral-300">
                <thead>
                  <tr
                    class="bg-gradient-to-r from-gray-800/90 to-gray-700/80 text-left uppercase tracking-wide text-xs text-gray-100"
                  >
                    <th class="px-4 py-3 font-medium">Nora Cost</th>
                    <th class="px-4 py-3 font-medium">Deploy Refund</th>
                    <th class="px-4 py-3 font-medium">Death Refund</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="refund in SPFF" :key="`${refund.noraCost}ff`">
                    <tr
                      class="odd:bg-gray-800/40 even:bg-gray-800/20 hover:bg-gray-700/30 transition-colors"
                    >
                      <td class="px-4 py-2 border-t border-gray-900/80">{{ refund.noraCost }}</td>
                      <td class="px-4 py-2 border-t border-gray-900/80">
                        {{ refund.deployRefund }}
                      </td>
                      <td class="px-4 py-2 border-t border-gray-900/80">
                        {{ refund.deathRefund }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Split Faction -->
          <div>
            <p class="text-lg font-medium text-orange-300 mb-3 uppercase tracking-wide">
              Split Faction
            </p>
            <div class="overflow-hidden rounded-lg border border-gray-700">
              <table class="w-full border-collapse border-gray-700 text-sm text-neutral-300">
                <thead>
                  <tr
                    class="bg-gradient-to-r from-gray-800/90 to-gray-700/80 text-left uppercase tracking-wide text-xs text-gray-100 border border-gray-700"
                  >
                    <th class="px-4 py-3 font-medium">Nora Cost</th>
                    <th class="px-4 py-3 font-medium">Deploy Refund</th>
                    <th class="px-4 py-3 font-medium">Death Refund</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="refund in SPSplit" :key="`${refund.noraCost}split`">
                    <tr
                      class="odd:bg-gray-800/40 even:bg-gray-800/20 hover:bg-gray-700/30 transition-colors"
                    >
                      <td class="px-4 py-2 border-t border-gray-900/80">{{ refund.noraCost }}</td>
                      <td class="px-4 py-2 border-t border-gray-900/80">
                        {{ refund.deployRefund }}
                      </td>
                      <td class="px-4 py-2 border-t border-gray-900/80">
                        {{ refund.deathRefund }}
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
.my-table,
th,
td {
  border: 1px solid oklch(37.3% 0.034 259.733);
  text-align: left;
  padding: 8px;
}
</style>
