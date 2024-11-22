<script lang="ts" setup>
import PageInnerSectionLayout from '@/components/layout/PageInnerSectionLayout.vue'
import RuneCreateInputLayout from '@/components/creator/RuneCreateInputLayout.vue'
import type { Champion } from '@/types/Champion'
import { useRouteStore } from '@/stores/storeRoute'
import ComboBoxField from '@/components/form/ComboBoxField.vue'

interface Props {
  rune: Champion
}

const { rune } = defineProps<Props>()

const { getDefaultQuery } = useRouteStore()

const opts = [
  {
    name: 'Select a size',
    value: 'undefined',
    disabled: true
  },
  {
    name: '1x1',
    value: '1x1'
  },
  {
    name: '2x2',
    value: '2x2'
  }
]
</script>

<template>
  <PageInnerSectionLayout header="Other">
    <RuneCreateInputLayout>
      <ComboBoxField
        :key="rune.size"
        :default-value="getDefaultQuery('size', rune.size)"
        :options="opts"
        label="Size"
        query-name="size"
      />
    </RuneCreateInputLayout>
  </PageInnerSectionLayout>
</template>

<style scoped></style>
