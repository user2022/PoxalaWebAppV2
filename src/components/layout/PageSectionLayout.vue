<script lang="ts" setup>
import SaveBtn from '@/components/shared/icon-btns/SaveBtn.vue'
import ShareBtn from '@/components/shared/icon-btns/ShareBtn.vue'

interface Props {
  header: string
  onSave?: () => void
  onShare?: () => void
}

const { header, onSave } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-2 mt-2">
    <div class="flex flex-row items-center justify-center sm:justify-start gap-4 text-center">
      <h1 class="text-3xl font-semibold mb-2 text-neutral-100">
        {{ header }}
      </h1>
      <template v-if="onSave">
        <SaveBtn :on-click="onSave" />
      </template>
      <template v-if="onShare">
        <ShareBtn :on-click="onShare" />
      </template>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
