<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'

const relocation = [
  {
    title: 'Manic',
    src: 'https://cdn.discordapp.com/attachments/1003391812905476176/1018525744508452996/Manic.png'
  },
  {
    title: 'Pounce/beset',
    src: 'https://cdn.discordapp.com/attachments/1003391812905476176/1018525745007579177/Pouncerelocate.png'
  },
  {
    title: 'Knockback',
    src: 'https://cdn.discordapp.com/attachments/1003391812905476176/1018525743946403840/KB.png'
  }
]
</script>

<template>
  <PageLayout title="Relocation">
    <div class="flex flex-col gap-4 justify-center items-center w-full">
      <template v-for="item in relocation">
        <div>
          <h1 class="text-2xl font-semibold mb-2 text-neutral-100">{{ item.title }}</h1>
          <img :src="item.src" style="max-width: 600px" />
        </div>
      </template>
    </div>
  </PageLayout>
</template>

<style scoped></style>
