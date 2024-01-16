<script lang="ts" setup>
import InfoHeader from '@/components/shared/InfoHeader.vue'

interface Props {
  header?: string
}

const { header } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <template v-if="header">
      <InfoHeader :label="header" />
    </template>

    <div class="flex flex-row gap-4">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>