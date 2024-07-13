<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRunes } from '@/hooks/useRunes'
import { getBannedRunes } from '@/lib/util/getBannedRunes'

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
    <div class="flex flex-col gap-4 justify-center items-center w-full">
      <template v-for="item in relocation" :key="item.title">
        <div>
          <h1 class="text-2xl font-semibold text-center mb-2 text-neutral-100">{{ item.title }}</h1>
          <img :src="item.src" class="max-w-full sm:max-w-2xl" />
        </div>
      </template>
      <hr />
      <h1 class="text-2xl font-semibold mb-2 text-neutral-100">Banned Runes</h1>
      <template v-if="res">
        <p class="text-xl font-semibold text-rose-700">Champs</p>
        <div class="flex flex-col gap-0.5 text-center">
          <template v-for="banned in getBannedRunes(res)?.champs" :key="`${banned.id} champ`">
            <p class="text-neutral-300 text-sm">{{ banned.name }}</p>
          </template>
        </div>

        <p class="text-xl font-semibold text-emerald-700">Spells</p>
        <div class="flex flex-col gap-0.5 text-center">
          <template v-for="banned in getBannedRunes(res)?.spells" :key="`${banned.id} spell`">
            <p class="text-neutral-300 text-sm">{{ banned.name }}</p>
          </template>
        </div>

        <p class="text-xl font-semibold text-amber-700">Relics</p>
        <div class="flex flex-col gap-0.5 text-center">
          <template v-for="banned in getBannedRunes(res)?.relics" :key="`${banned.id} relic`">
            <p class="text-neutral-300 text-sm">{{ banned.name }}</p>
          </template>
        </div>

        <p class="text-xl font-semibold text-cyan-700">Equips</p>
        <div class="flex flex-col gap-0.5 text-center">
          <template v-for="banned in getBannedRunes(res)?.equips" :key="`${banned.id} equip`">
            <p class="text-neutral-300 text-sm">{{ banned.name }}</p>
          </template>
        </div>
      </template>
      <template v-else>
        <p class="text-neutral-50">Loading...</p>
      </template>

      <h1 class="text-2xl font-semibold mb-2 text-neutral-100">SP Nora Refund</h1>
      <p class="text-xl font-semibold text-orange-700">Full Faction</p>
      <table class="border-collapse my-table text-neutral-200">
        <tr>
          <th>Nora Cost</th>
          <th>Deploy Refund</th>
          <th>Death Refund</th>
        </tr>
        <template v-for="refund in SPFF" :key="`${refund.noraCost}ff`">
          <tr>
            <td>{{ refund.noraCost }}</td>
            <td>{{ refund.deployRefund }}</td>
            <td>{{ refund.deathRefund }}</td>
          </tr>
        </template>
      </table>

      <p class="text-xl font-semibold text-orange-300">Split Faction</p>
      <table class="border-collapse my-table text-neutral-200">
        <tr>
          <th>Nora Cost</th>
          <th>Deploy Refund</th>
          <th>Death Refund</th>
        </tr>
        <template v-for="refund in SPSplit" :key="`${refund.noraCost}split`">
          <tr>
            <td>{{ refund.noraCost }}</td>
            <td>{{ refund.deployRefund }}</td>
            <td>{{ refund.deathRefund }}</td>
          </tr>
        </template>
      </table>
    </div>
  </PageLayout>
</template>

<style scoped>
.my-table,
th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
