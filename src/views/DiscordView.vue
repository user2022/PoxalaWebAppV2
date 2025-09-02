<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import Container from '@/components/shared/Container.vue'

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
  'https://i.imgur.com/iVjXVCy.png',
  'https://i.imgur.com/KNStTS0.png'
]
</script>

<template>
  <PageLayout text-centered title="Discord xD">
    <Container>
      <div class="columns-1 sm:columns-2 lg:columns-3 gap-6">
        <template v-for="(image, index) in images" :key="image">
          <img
            :alt="`${index}+${image}`"
            :src="image"
            class="mb-4 w-full break-inside-avoid shadow-md hover:opacity-90 transition"
          />
        </template>
      </div>
    </Container>
  </PageLayout>
</template>

<style scoped>
/* Masonry-style collage look */
@media (min-width: 640px) {
  .grid > div:nth-child(5n) {
    grid-row: span 2;
  }
  .grid > div:nth-child(7n) {
    grid-column: span 2;
  }
}
</style>
