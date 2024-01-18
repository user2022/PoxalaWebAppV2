<script lang="ts" setup>
interface Props {
  iconName: string
}

const { iconName } = defineProps<Props>()

const poxApi = import.meta.env.VITE_POXAPI

const getIconImage = () => {
  const img = new Image()
  let isError = false
  img.src = `${poxApi}/images/ability_icons/large/icon_${iconName}.gif`

  if (img.complete) isError = false
  else isError = true

  if (isError) {
    return `${poxApi}/images/ability_icons/small/icon_${iconName}.gif`
  } else {
    return img.src
  }
}
</script>

<template>
  <div
    class="w-12 h-12 overflow-hidden rounded-lg border border-3 border-neutral-900 flex-shrink-0 shadow-inner"
  >
    <img :src="getIconImage()" class="rounded-lg h-full" style="transform: scale(1.1, 1.1)" />
  </div>
</template>

<style scoped></style>
