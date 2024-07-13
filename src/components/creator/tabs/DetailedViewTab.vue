<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import CardFront from '@/components/runes/rune-display/CardFront.vue'
import DetailedRune from '@/components/runes/detailed-view/DetailedRune.vue'
import { useBaseRunes } from '@/hooks/useRunes'
import ChangedAttribute from '@/components/runes/detailed-view/ChangedAttribute.vue'
import { ref, watch } from 'vue'
import { useRouteStore } from '@/stores/storeRoute'
import { storeToRefs } from 'pinia'

interface Props {
  rune: Champion
  highestLowestCost: (highest?: boolean) => number | undefined
}

const { rune, highestLowestCost } = defineProps<Props>()

const { data: runes, error } = useBaseRunes()

const baseRune = ref<Champion | undefined>()

const routeStore = useRouteStore()
const { queries } = storeToRefs(routeStore)

watch(runes, (newVal) => {
  baseRune.value = newVal?.champs.find((r) => r.id === rune.id)
})

watch(
  () => queries.value?.find((query) => query.name === 'rune'),
  (newVal) => {
    baseRune.value = runes.value?.champs.find((r) => r.id === newVal?.value)
  }
)
</script>

<template>
  <div class="flex sm:flex-row flex-col gap-12">
    <div class="flex flex-col gap-4 items-center">
      <CardFront :rune="rune" />
      <div class="flex flex-col gap-2 text-neutral-200 text-sm text-center -mt-4">
        <p class="text-xs text-alpha-700/80 font-semibold">
          Champion ID: <span class="font-bold">{{ rune.id }}</span>
        </p>
        <p>
          Base Nora Cost: <span class="font-semibold">{{ rune.baseNoraCost }}</span>
        </p>
        <p>
          Abilities Nora Cost: <span class="font-semibold">{{ rune.abilityNoraCost }}</span>
        </p>
        <p>
          Nora Modifier: <span class="font-semibold">{{ rune.noraMod }}</span>
        </p>
        <p
          class="py-1 px-2.5 border border-2 border-alpha-700/50 border-dashed rounded-md text-base"
        >
          Total Nora Cost: <span class="font-semibold">{{ rune.noraCost }}</span>
        </p>
        <p>
          Highest Possible Cost: <span class="font-semibold">{{ highestLowestCost(true) }}</span>
        </p>
        <p>
          Lowest Possible Cost: <span class="font-semibold">{{ highestLowestCost(false) }}</span>
        </p>

        <template v-if="baseRune">
          <div class="border-t border-neutral-600"></div>
          <div class="flex flex-col gap-0.5">
            <ChangedAttribute
              :base-rune-value="baseRune?.damage ?? 0"
              :rune-value="rune.damage"
              text="⚔️"
            />
            <ChangedAttribute
              :base-rune-value="baseRune?.speed ?? 0"
              :rune-value="rune.speed"
              text="🏃🏻"
            />
            <template v-if="baseRune?.minRng !== rune.minRng || baseRune?.maxRng !== rune.maxRng">
              <p>
                🏹
                <span class="text-red-500 font-semibold"
                  >{{ baseRune?.minRng }} - {{ baseRune?.maxRng }}</span
                >
                >
                <span class="text-green-500 font-semibold"
                  >{{ rune.minRng }} - {{ rune.maxRng }}</span
                >
              </p>
            </template>
            <ChangedAttribute
              :base-rune-value="baseRune?.defense ?? 0"
              :rune-value="rune.defense"
              text="🛡️"
            />
            <ChangedAttribute
              :base-rune-value="baseRune?.hitPoints ?? 0"
              :rune-value="rune.hitPoints"
              text="❤️"
            />
          </div>
        </template>
      </div>
    </div>
    <DetailedRune :rune="rune" />
  </div>
</template>

<style scoped></style>
