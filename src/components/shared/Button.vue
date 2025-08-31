<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  label: string
  onClick?: () => void
  /** visual style */
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'success'
    | 'warning'
    | 'purple'
  /** button size */
  size?: 'default' | 'sm' | 'lg' | 'icon'
  cClass?: string
}

const { label, onClick, variant = 'default', size = 'default', cClass = '' } = defineProps<Props>()

const variantClasses: Record<string, string> = {
  default:
    'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.75)] focus-visible:ring-blue-400 border border-blue-400/20',
  destructive:
    'bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white hover:shadow-[0_0_12px_rgba(239,68,68,0.75)] focus-visible:ring-red-400 border border-red-400/20',
  outline:
    'border-2 border-gray-600/60 bg-gray-800/40 backdrop-blur-sm text-gray-100 hover:shadow-[0_0_12px_rgba(156,163,175,0.6)] hover:bg-gray-700/60 hover:border-gray-500/80 hover:text-white focus-visible:ring-gray-400',
  secondary:
    'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-gray-100 hover:shadow-[0_0_12px_rgba(107,114,128,0.7)] focus-visible:ring-gray-400 border border-gray-500/20',
  ghost:
    'text-gray-300 hover:bg-gray-800/60 hover:text-white hover:shadow-[0_0_12px_rgba(156,163,175,0.5)] backdrop-blur-sm focus-visible:ring-gray-400',
  link: 'text-blue-400 underline-offset-4 hover:underline hover:text-blue-300',
  success:
    'bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white hover:shadow-[0_0_12px_rgba(34,197,94,0.75)] focus-visible:ring-green-400 border border-green-400/20',
  warning:
    'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-white hover:shadow-[0_0_12px_rgba(234,179,8,0.75)] focus-visible:ring-yellow-400 border border-yellow-400/20',
  purple:
    'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-white hover:shadow-[0_0_12px_rgba(168,85,247,0.75)] focus-visible:ring-purple-400 border border-purple-400/20'
}

const sizeClasses: Record<string, string> = {
  default: 'h-10 px-5 py-2.5 has-[>svg]:px-4',
  sm: 'h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
  lg: 'h-12 rounded-lg px-7 text-base has-[>svg]:px-5',
  icon: 'size-10 p-0.5 rounded-lg'
}

const classes = computed(() => {
  return [
    'inline-flex items-center justify-center rounded-md font-medium transition-all focus:ring-0 focus:outline-none gap-2',
    variantClasses[variant],
    sizeClasses[size],
    cClass
  ].join(' ')
})
</script>

<template>
  <button :class="classes" class="focus:outline-none focus:ring-0" label="" @click="onClick">
    <slot name="icon" />
    <span v-if="size !== 'icon'">{{ label }}</span>
  </button>
</template>
