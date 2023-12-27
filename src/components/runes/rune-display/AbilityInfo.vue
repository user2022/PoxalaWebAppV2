<script lang="ts" setup>
import type { AbilitiesEntity } from '@/types/Champion'

interface Props {
  ability: AbilitiesEntity
}

const { ability } = defineProps<Props>()
</script>

<template>
  <div
    class="popover popover-min-wid test group-hover:block hidden absolute left-1/2 transform -translate-x-1/2 mt-3"
  >
    <h2 class="font-semibold">{{ ability.name }}</h2>
    <div class="flex flex-col text-sky-500 text-sm popover-info">
      <p>Cooldown: {{ ability.cooldown }}</p>
      <p>AP Cost: {{ ability.apCost }}</p>
    </div>
    <p class="text-white popover-desc-text">
      {{ ability.shortDescription.replace(/<[^>]*>?/gm, '') }}
    </p>
  </div>
</template>

<style>
.popover {
  background-color: rgba(8, 8, 8, 0.89);
  padding: 7px 12px;
  color: white;
  max-width: 300px;
  z-index: 10;

  border: 2px solid rgb(96, 96, 96);
  border-radius: 0;
}

.popover-min-wid {
  width: 280px;
}

.popover-desc-text {
  font-size: 12px;
}

.popover-info {
  font-size: 14px;
}
</style>