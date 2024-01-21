import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toast = ref<string>('')
  const showToast = ref<boolean>(false)

  const setToast = (t: string) => {
    toast.value = t
    showToast.value = true
  }

  watch(toast, (t) => {
    if (t === '') return
    setTimeout(() => {
      showToast.value = false
    }, 3000)
    setTimeout(() => {
      toast.value = ''
    }, 3400)
  })

  return {
    toast,
    setToast,
    showToast
  }
})
