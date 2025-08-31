<script lang="ts" setup>
import IconBtnHolder from '@/components/shared/icon-btns/IconBtnHolder.vue'
import { ClipboardCopy } from 'lucide-vue-next'

interface Props {
  onClick: () => void
}

const { onClick } = defineProps<Props>()
</script>

<template>
  <IconBtnHolder :on-click="onClick" tool-tip-text="Share">
    <ClipboardCopy :size="19" :stroke-width="1" />
  </IconBtnHolder>
</template>

<style scoped></style>
