<script lang="ts" setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

interface Props {
  label?: string
}

const { label } = defineProps<Props>()

const enabled = ref<boolean>(false)
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <template v-if="label">
      <span class="text-neutral-50 text-sm">{{ label }}</span>
    </template>
    <Switch
      v-model="enabled"
      class="relative bg-neutral-600 inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      <span class="sr-only">Use setting</span>
      <span
        :class="enabled ? 'translate-x-9 bg-green-500' : 'translate-x-0 bg-neutral-100'"
        aria-hidden="true"
        class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </div>
</template>

<style scoped></style>