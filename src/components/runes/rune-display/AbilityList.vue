<script lang="ts" setup>
import type { Champion } from '@/types/Champion'
import AbilityDisplay from '@/components/runes/rune-display/AbilityDisplay.vue'
import { transformAbilities, type TransformAbility } from '@/lib/util/transformAbilities'
import type { Rune } from '@/types/Runes'
import { ref, watch } from 'vue'
import { useRuneStore } from '@/stores/rune'
import { storeToRefs } from 'pinia'

interface Props {
  rune: Rune
}

const runeStore = useRuneStore()
const { rune } = storeToRefs(runeStore)

const poxApi = import.meta.env.VITE_POXAPI

watch(rune, (newVal) => {
  abilities.value = transformAbilities({
    abilityPath1: (newVal as Champion).abilitySets?.[0].abilities ?? [],
    abilityPath2: (newVal as Champion).abilitySets?.[1].abilities ?? [],
    startingAbilities: (newVal as Champion).startingAbilities ?? []
  })
})

const abilities = ref<TransformAbility[]>(
  transformAbilities({
    abilityPath1: (rune.value as Champion).abilitySets?.[0].abilities ?? [],
    abilityPath2: (rune.value as Champion).abilitySets?.[1].abilities ?? [],
    startingAbilities: (rune.value as Champion).startingAbilities ?? []
  })
)

console.log(abilities, 'abilities')
</script>

<template>
  <div
    class="grid grid-cols-2 grid-rows-4 grid-flow-col-dense gap-y-1 gap-x-3 absolute top-32 mt-2 left-9 z-30"
  >
    <template v-for="(ability, index) in abilities" :key="`${ability.id}-${index}`">
      <AbilityDisplay :ability="ability" />
    </template>
  </div>
</template>

<style scoped></style>