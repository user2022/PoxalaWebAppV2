<script lang="ts" setup>
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
</script>

<template>
  <div
    :class="`bg-alpha-700/50 px-6 py-5 fixed right-10 top-20 rounded-lg transition duration-300 ease-in-out ${
      toast.showToast ? 'opacity-100' : 'opacity-0'
    } ${toast.toast ? 'block' : 'none'}`"
  >
    <p class="text-white">{{ toast.toast }}</p>
  </div>
</template>

<style scoped></style>
