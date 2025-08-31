<script lang="ts" setup>
import { ServerCrash } from 'lucide-vue-next'

interface Props {
  title: string
  error?: Error
  isLoading?: boolean
  textCentered?: boolean
}

const { title, error, isLoading = true, textCentered } = defineProps<Props>()
</script>

<template>
  <div>
    <slot name="children" />
    <div class="sm:mx-4 mx-2 my-4 flex flex-col gap-4">
      <template v-if="error">
        <div class="flex justify-center py-12">
          <div
            class="relative max-w-md w-full bg-red-900/40 border-2 border-red-600 rounded-xl p-6 text-center shadow-[0_0_25px_rgba(220,38,38,0.6)]"
          >
            <!-- Glowing skull / warning icon -->
            <div class="flex justify-center mb-3">
              <ServerCrash
                class="w-10 h-10 text-red-400 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
            </div>

            <!-- Error text -->
            <p class="text-red-300 font-semibold tracking-wide">An error has occurred</p>
            <p class="text-red-200 mt-2 text-sm">
              {{ error?.message ?? 'Error' }}
            </p>
          </div>
        </div>
      </template>
      <template v-else-if="isLoading">
        <div class="flex justify-center py-12">
          <div class="relative w-20 h-20">
            <!-- Outer glowing ring -->
            <div
              class="absolute inset-0 rounded-full border-4 opacity-50 animate-ping bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"
            ></div>

            <!-- Rotating rune-like symbols with colour cycle -->
            <div class="absolute inset-0 rounded-full border-2 animate-spin border-animate"></div>

            <!-- Center glowing dot with colour cycle -->
            <div
              class="absolute inset-4 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)] bg-animate"
            ></div>
          </div>
        </div>
      </template>

      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>

<style scoped>
@keyframes colorCycle {
  0% {
    border-color: #f97316;
    background-color: #f97316;
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.8);
  }
  25% {
    border-color: #ef4444;
    background-color: #ef4444;
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
  }
  50% {
    border-color: #eab308;
    background-color: #eab308;
    box-shadow: 0 0 20px rgba(234, 179, 8, 0.8);
  }
  75% {
    border-color: #a855f7;
    background-color: #a855f7;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
  }
  100% {
    border-color: #f97316;
    background-color: #f97316;
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.8);
  }
}

.border-animate {
  animation: colorCycle 6s linear infinite;
}

.bg-animate {
  animation: colorCycle 6s linear infinite;
}
</style>
