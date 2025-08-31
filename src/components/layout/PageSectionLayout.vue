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
  <div class="flex flex-col gap-2 w-full flex-1">
    <div
      class="flex flex-row items-center justify-center sm:justify-start gap-4 text-center w-full"
    >
      <h1 class="text-xl uppercase tracking-wider mb-2 text-gray-50">
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
