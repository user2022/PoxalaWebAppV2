<script lang="ts" setup>
import InputLabel from '@/components/form/InputLabel.vue'
import { onMounted, ref, watch } from 'vue'
import { useRouteStore } from '@/stores/storeRoute'
import { storeToRefs } from 'pinia'

interface Props {
  queryName: string
  label?: string
  type?: string
  min?: number
  max?: number
  defaultValue?: string | number
}

const { label, type, min, max, queryName, defaultValue } = defineProps<Props>()

const input = ref<number | string>('')

console.log(defaultValue, 'defaultValue2')
// TODO - default value not updating when change rune

onMounted(() => {
  if (defaultValue || defaultValue === 0) {
    input.value = defaultValue
  }
})

// onMounted(() => {
//   const findQuery = queries.value?.find((query) => query.name === queryName)
//   if (findQuery) {
//     if (type === 'number') {
//       input.value = parseInt(findQuery.value.toString())
//     } else {
//       input.value = findQuery.value.toString()
//     }
//   }
// })

const storeRoute = useRouteStore()
const { queries } = storeToRefs(storeRoute)

watch(input, (newVal) => {
  const valToUse = newVal || newVal === 0 ? `${newVal}` : ''

  if (valToUse) {
    storeRoute.addToQuery({ name: queryName, value: valToUse })
  }
})

watch(
  () => queries.value?.find((query) => query.name === queryName)?.value,
  (newVal) => {
    if (newVal || newVal === 0) {
      input.value = newVal
    }
  }
)
</script>

<template>
  <div class="flex flex-col gap-1.5 relative self-start">
    <InputLabel :label="label" />
    <input
      :id="queryName"
      :max="max"
      :min="min"
      :name="queryName"
      :placeholder="label"
      :type="type ? type : 'text'"
      :value="input"
      class="px-3 py-2 text-sm leading-5 text-neutral-100 rounded-lg border-neutral-950 border bg-neutral-700 focus:outline-0 focus:ring-0"
      @change="input = ($event.target as HTMLInputElement).value"
      @keyup.enter="input = ($event.target as HTMLInputElement).value"
    />
  </div>
</template>

<style scoped></style>