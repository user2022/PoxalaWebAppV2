<script lang="ts" setup>
import type { Ability } from '@/types/Ability'
import DetailBlock from '@/components/abilities/DetailBlock.vue'

interface Props {
  ability: Ability
}

const { ability } = defineProps<Props>()

const poxApi = import.meta.env.VITE_POXAPI

const getIconImage = () => {
  const img = new Image()
  let isError = false
  img.src = `${poxApi}/images/ability_icons/large/icon_${ability.iconName}.gif`

  if (img.complete) isError = false
  else isError = true

  if (isError) {
    return `${poxApi}/images/ability_icons/small/icon_${ability.iconName}.gif`
  } else {
    return img.src
  }
}
</script>

<template>
  <div
    class="flex flex-row gap-4 bg-neutral-700 rounded-md shadow py-2 px-4 items-center"
    style="min-height: 100px"
  >
    <div
      class="w-12 h-12 overflow-hidden rounded-lg border border-3 border-neutral-900 flex-shrink-0 shadow-inner"
    >
      <img :src="getIconImage()" class="rounded-lg h-full" style="transform: scale(1.1, 1.1)" />
    </div>
    <div class="flex flex-col gap-2 flex-grow">
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-row gap-4 items-center">
          <h1 class="text-xl font-semibold text-neutral-50">{{ ability.name }}</h1>
          <div
            v-if="ability.level"
            class="w-[18px] h-[18px] bg-alpha-400 rounded-full flex justify-center items-center"
          >
            <p class="text-white font-semibold text-sm text-outline">{{ ability.level }}</p>
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <DetailBlock :value="ability.noraCost" label="Nora" />
          <DetailBlock :value="ability.apCost" c-class="bg-purple-400" label="AP" />
          <DetailBlock :value="ability.cooldown" c-class="bg-teal-400" label="CD" />
        </div>
      </div>
      <div>
        <p class="text-neutral-300 text-sm" v-html="ability.shortDescription" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>