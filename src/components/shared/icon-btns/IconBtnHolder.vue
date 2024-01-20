<script lang="ts" setup>
interface Props {
  onClick: () => void
  toolTipText?: string
}

const { onClick, toolTipText } = defineProps<Props>()
</script>

<template>
  <div class="my-tooltip-cont">
    <div
      class="cursor-pointer bg-alpha-700/20 px-1 py-0.5 rounded-md border border-alpha-900/70 drop-shadow transition duration-100 ease-in-out text-alpha-200 hover:text-neutral-50 hover:bg-alpha-700/50 hover:border-alpha-400"
      @click="onClick"
    >
      <slot />
    </div>
    <template v-if="toolTipText">
      <div class="my-tooltip-small text-sm text-center">
        <span class="text-neutral-200">{{ toolTipText }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
