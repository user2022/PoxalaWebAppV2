<script lang="ts" setup>
import { Save } from 'lucide-vue-next'
import IconBtnHolder from '@/components/shared/icon-btns/IconBtnHolder.vue'

interface Props {
  onClick: () => void
}

const { onClick } = defineProps<Props>()
</script>

<template>
  <IconBtnHolder :on-click="onClick" tool-tip-text="Save">
    <Save :size="19" :stroke-width="1" />
  </IconBtnHolder>
</template>

<style scoped></style>
