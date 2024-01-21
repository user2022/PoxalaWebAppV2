import { useToastStore } from '@/stores/toast'

export const onShare = async () => {
  const toast = useToastStore()
  try {
    if (!navigator.clipboard) {
      return
    }
    await navigator.clipboard.writeText(window.location.href)

    toast.setToast('Copied to Clipboard')
  } catch (err) {
    toast.setToast('Error copying to clipboard')
  }
}
