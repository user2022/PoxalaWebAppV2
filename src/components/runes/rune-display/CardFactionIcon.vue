<script lang="ts" setup>
interface Props {
  factionOne: string
  factionTwo: string
  customClass?: string
}

const { factionOne, factionTwo, customClass } = defineProps<Props>()

const poxApi = import.meta.env.VITE_POXAPI
</script>

<template>
  <div :class="customClass" class="flex flex-row">
    <img :src="`${poxApi}/_themes/global/frames/large/faction_${factionOne}_1.png`" alt="fac_1" />
    <img
      :src="`${poxApi}/_themes/global/frames/large/faction_${factionTwo}_2.png`"
      alt="fac_2"
      style="margin-left: -30px"
    />
  </div>
</template>

<style scoped></style>
