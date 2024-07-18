<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'

const images = [
  'https://i.imgur.com/Aav5oIL.png',
  'https://i.imgur.com/9snRq8n.png',
  'https://i.imgur.com/Rqmdul7.png',
  'https://i.imgur.com/B0PfkZc.png',
  'https://i.imgur.com/HlXrYC9.png',
  'https://i.imgur.com/6qldbxG.png',
  'https://i.imgur.com/POmNSkm.png',
  'https://i.imgur.com/v077MOU.png',
  'https://i.imgur.com/O9mvLBY.png',
  'https://i.imgur.com/Q28hIlP.png',
  'https://i.imgur.com/qlyJ8vs.png',
  'https://i.imgur.com/S623q9Y.png',
  'https://i.imgur.com/lG4YStl.png',
  'https://i.imgur.com/IepJVHg.png',
  'https://i.imgur.com/SaVwZMO.png',
  'https://i.imgur.com/zCW2Cyw.png',
  'https://i.imgur.com/iVjXVCy.png'
]
</script>

<template>
  <PageLayout text-centered title="Discord xD">
    <div class="flex flex-col items-center justify-center gap-3">
      <template v-for="(image, index) in images" :key="image">
        <img :alt="`${index}+${image}`" :src="image" class="rounded-md max-w-full sm:max-w-2xl" />
      </template>
    </div>
  </PageLayout>
</template>

<style scoped></style>
