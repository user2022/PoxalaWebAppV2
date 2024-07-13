<script lang="ts" setup>
import { RouterView } from 'vue-router'
import NavigationBar from './components/layout/NavigationBar.vue'
import './assets/main.css'
import Footer from '@/components/layout/Footer.vue'
import ToastDisplay from '@/components/shared/ToastDisplay.vue'
import { useScreenSize } from '@/lib/util/useScreenSize'
import MobileNav from '@/components/layout/MobileNav.vue'

// https://medium.com/@sididev3/6-simple-tricks-90-of-people-who-use-tailwind-css-dont-know-26c6a1318476

const { isMobile } = useScreenSize()
</script>

<template id="app1" class="poxala-main" data-theme="tyrion">
  <main class="bg-neutral-800 flex flex-col h-screen">
    <NavigationBar v-if="!isMobile" />
    <MobileNav v-else />
    <div class="flex-grow bg-neutral-800">
      <!--      <div-->
      <!--        class="absolute inset-x-0 m-auto h-5/6 max-w-lg bg-gradient-to-tr from-indigo-400 via-teal-900 to-[#C084FC] blur-[118px]"-->
      <!--      ></div>-->
      <RouterView />
    </div>
    <Footer />
    <ToastDisplay />
  </main>
</template>

<style scoped></style>
