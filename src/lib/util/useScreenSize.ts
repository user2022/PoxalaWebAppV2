import { onMounted, onUnmounted, ref } from 'vue'

export function useScreenSize() {
  const isMobile = ref(false)
  const isSmaller = ref(false)

  const checkScreenSize = () => {
    isMobile.value = window.innerWidth <= 950
    isSmaller.value = window.innerWidth <= 515
  }

  onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
  })

  return { isMobile, isSmaller }
}
