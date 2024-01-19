<script lang="ts" setup>
import PageInnerSectionLayout from '@/components/layout/PageInnerSectionLayout.vue'
import type { Champion } from '@/types/Champion'
import InputField from '@/components/form/InputField.vue'
import RuneCreateInputLayout from '@/components/creator/RuneCreateInputLayout.vue'
import { useRouteStore } from '@/stores/storeRoute'

interface Props {
  rune: Champion
}

const { rune } = defineProps<Props>()

const { getDefaultQuery } = useRouteStore()
</script>

<template>
  <PageInnerSectionLayout header="Base Stats">
    <RuneCreateInputLayout>
      <InputField
        :key="rune.damage"
        :default-value="getDefaultQuery('damage', rune.damage)"
        :max="30"
        :min="0"
        label="Damage"
        query-name="damage"
        type="number"
      />
      <InputField
        :key="rune.speed"
        :default-value="getDefaultQuery('speed', rune.speed)"
        :max="10"
        :min="1"
        label="Speed"
        query-name="speed"
        type="number"
      />
      <InputField
        :key="rune.minRng"
        :default-value="getDefaultQuery('minRng', rune.minRng)"
        :max="10"
        :min="1"
        label="Min Range"
        query-name="minRng"
        type="number"
      />
      <InputField
        :key="rune.maxRng"
        :default-value="getDefaultQuery('maxRng', rune.maxRng)"
        :max="10"
        :min="1"
        label="Max Range"
        query-name="maxRng"
        type="number"
      />
      <InputField
        :key="rune.defense"
        :default-value="getDefaultQuery('defense', rune.defense)"
        :max="10"
        :min="0"
        label="Defense"
        query-name="defense"
        type="number"
      />
      <InputField
        :key="rune.hitPoints"
        :default-value="getDefaultQuery('hitPoints', rune.hitPoints)"
        :max="100"
        :min="1"
        label="Hit Points"
        query-name="hitPoints"
        type="number"
      />
    </RuneCreateInputLayout>
  </PageInnerSectionLayout>
</template>

<style scoped></style>