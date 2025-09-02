<script lang="ts" setup>
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
</script>

<template>
  <div
    :class="`bg-gradient-to-r from-purple-400/50 to-orange-400/50 px-6 py-4 fixed right-10 top-20 rounded-full transition duration-300 ease-in-out ${
      toast.showToast ? 'opacity-100' : 'opacity-0'
    } ${toast.toast ? 'block' : 'none'}`"
  >
    <p class="text-white text-sm">{{ toast.toast }}</p>
  </div>
</template>

<style scoped></style>
