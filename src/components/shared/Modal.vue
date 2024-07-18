<script lang="ts" setup>
import { X } from 'lucide-vue-next'
import Button from '@/components/shared/Button.vue'

interface Props {
  closeModal: (val: boolean) => void
  header: string
  onSave?: () => void
}

const { closeModal, header, onSave } = defineProps<Props>()
</script>

<template>
  <div
    class="z-50 flex justify-center items-center bg-neutral-950/60 fixed w-full h-full top-0 left-0 inset-0"
  >
    <!-- Create a div that is centered both vertically and horizontally-->
    <div class="bg-neutral-800 w-96 h-auto rounded-xl inset-0 px-6 py-4 drop-shadow">
      <!-- A basic modal dialog with title, body and one button to close-->
      <div class="flex flex-col gap-4">
        <div class="flex flex-row justify-between">
          <h1 class="text-neutral-300 text-xl">{{ header }}</h1>
          <X class="text-neutral-500 cursor-pointer" @click="closeModal(false)" />
        </div>

        <hr />

        <slot />

        <div v-if="onSave" class="flex justify-end">
          <Button label="Save" @click="onSave" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
