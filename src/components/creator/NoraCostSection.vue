<script lang="ts" setup>
import PageInnerSectionLayout from '@/components/layout/PageInnerSectionLayout.vue'
import type { Champion } from '@/types/Champion'
import NoraCostDisplay from '@/components/creator/NoraCostDisplay.vue'

import { Equal, LoaderPinwheel, Plus } from 'lucide-vue-next'
import InputField from '@/components/form/InputField.vue'
import { useRouteStore } from '@/stores/storeRoute'

interface Props {
  rune: Champion
}

const { rune } = defineProps<Props>()

const { getDefaultQuery } = useRouteStore()
</script>

<template>
  <PageInnerSectionLayout :icon="LoaderPinwheel" header="Nora Cost" icon-color="text-sky-400">
    <div class="flex flex-row items-center gap-0 sm:gap-4">
      <NoraCostDisplay :value="rune.baseNoraCost" header="Base Nora Cost" />
      <Plus class="text-neutral-50 mt-8" />
      <NoraCostDisplay :value="rune.abilityNoraCost" header="Abilities Nora Cost" />
      <Plus class="text-neutral-50 mt-8" />
      <NoraCostDisplay :value="rune.noraMod" header="Nora Modifier" />
      <Equal class="text-neutral-50 mt-8" />
      <NoraCostDisplay
        :value="(rune.baseNoraCost ?? 0) + (rune.abilityNoraCost ?? 0) + (rune.noraMod ?? 0)"
        header="Total Nora Cost"
      />
    </div>
    <div class="mt-6 flex">
      <InputField
        :key="rune.noraMod"
        :default-value="getDefaultQuery('noraMod', rune.noraMod ?? 0)"
        :max="50"
        :min="-50"
        label="Nora Modifier"
        query-name="noraMod"
        type="number"
      />
    </div>
  </PageInnerSectionLayout>
</template>

<style scoped></style>
