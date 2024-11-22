<script lang="ts" setup>
import { RouterView } from 'vue-router'
import NavigationBar from './components/layout/NavigationBar.vue'
import './assets/main.css'
import Footer from '@/components/layout/Footer.vue'
import ToastDisplay from '@/components/shared/ToastDisplay.vue'
import { useScreenSize } from '@/lib/util/useScreenSize'
import MobileNav from '@/components/layout/MobileNav.vue'
import { onMounted } from 'vue'
import { ThemeList } from '@/lib/data/ThemeList'

// https://medium.com/@sididev3/6-simple-tricks-90-of-people-who-use-tailwind-css-dont-know-26c6a1318476

const { isMobile } = useScreenSize()

// If theme storage has invalid value, set it to skyblue
onMounted(() => {
  const theme = localStorage.getItem('theme')

  if (!ThemeList.find((item) => item.value === theme)) {
    localStorage.setItem('theme', 'skyblue')
  }
})
</script>

<template id="app1" class="poxala-main" data-theme="tyrion">
  <main class="bg-neutral-800 flex flex-col h-screen">
    <NavigationBar v-if="!isMobile" />
    <MobileNav v-else />
    <div class="flex-grow bg-neutral-800">
      <RouterView />
    </div>
    <Footer />
    <ToastDisplay />
  </main>
</template>

<style scoped></style>
