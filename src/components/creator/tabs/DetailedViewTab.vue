<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import CardFront from '@/components/runes/rune-display/CardFront.vue'
import DetailedRune from '@/components/runes/detailed-view/DetailedRune.vue'
import { useBaseRunes } from '@/hooks/useRunes'
import ChangedAttribute from '@/components/runes/detailed-view/ChangedAttribute.vue'
import { ref, watch } from 'vue'
import { useRouteStore } from '@/stores/storeRoute'
import { storeToRefs } from 'pinia'
import DetailAbilityText from '@/components/creator/DetailAbilityText.vue'

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
    <div class="flex flex-col gap-4">
      <CardFront :rune="rune" />
      <div class="flex flex-col gap-2 text-neutral-200 text-sm text-left -mt-4">
        <p class="text-xs text-gray-500 font-semibold text-center">
          Champion ID: <span class="font-bold">{{ rune.id }}</span>
        </p>
        <DetailAbilityText :value="rune.baseNoraCost" name="Base Nora Cost" />
        <DetailAbilityText :value="rune.abilityNoraCost" name="Abilities Nora Cost" />
        <DetailAbilityText :value="rune.noraMod" name="Nora Modifier" />
        <DetailAbilityText
          :value="rune.noraCost"
          c-class="border border-blue-800"
          custom-bg="bg-blue-800/50"
          name="Total Nora Cost"
        />

        <DetailAbilityText :value="highestLowestCost(true)" name="Max Cost" />
        <DetailAbilityText :value="highestLowestCost(false)" name="Min Cost" />

        <template v-if="baseRune">
          <div class="border-t border-gray-600/70 my-1.5"></div>
          <div class="flex flex-col gap-0.5 justify-center items-center mx-auto">
            <ChangedAttribute
              :base-rune-value="baseRune?.damage ?? 0"
              :rune-value="rune.damage"
              text="⚔️"
            />
            <ChangedAttribute
              :base-rune-value="baseRune?.speed ?? 0"
              :rune-value="rune.speed"
              text="🏃"
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
            <ChangedAttribute
              :base-rune-value="baseRune?.size ?? '1x1'"
              :rune-value="rune.size"
              text="📏"
            />
          </div>
        </template>
      </div>
    </div>
    <DetailedRune :rune="rune" />
  </div>
</template>

<style scoped></style>
