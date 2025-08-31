<script lang="ts" setup>
import Button from '@/components/shared/Button.vue'

interface Props {
  onClick: () => void
  toolTipText?: string
}

const { onClick, toolTipText } = defineProps<Props>()
</script>

<template>
  <div class="my-tooltip-cont">
    <Button :on-click="onClick" label="" size="icon" variant="ghost">
      <template #icon>
        <slot />
      </template>
    </Button>
    <template v-if="toolTipText">
      <div class="my-tooltip-small t-tooltip text-sm text-center">
        <span class="text-neutral-200">{{ toolTipText }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
