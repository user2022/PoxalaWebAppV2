<script lang="ts" setup>
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot
} from '@headlessui/vue'
import { computed, onMounted, ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { Options } from '@/types/Options'
import InputLabel from '@/components/form/InputLabel.vue'
import ComboListItem from '@/components/form/ComboListItem.vue'
import { useRouteStore } from '@/stores/storeRoute'
import { storeToRefs } from 'pinia'

interface Props {
  options: Options[]
  label?: string
  queryName: string
  allowMultipleQuery?: boolean
  disableInput?: boolean
  defaultValue?: string | number
}

const { options, disableInput, queryName, label, allowMultipleQuery, defaultValue } =
  defineProps<Props>()

let selected = ref<Options>(options[0])
let query = ref<string>('')
const sliceAmount = ref<number>(100)

const increaseSliceAmount = () => {
  sliceAmount.value += 100
}

const filteredOptions = computed(() => {
  const filteredOps = options
    .filter((option) =>
      option.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
    .slice(0, sliceAmount.value)

  if (filteredOps.length === sliceAmount.value && options.length > sliceAmount.value) {
    filteredOps.push({
      name: 'Show More...',
      value: 'show-more',
      disabled: true
    })
  }

  return filteredOps
})

onMounted(() => {
  if (defaultValue) {
    const selectedOption = options.find((option) => {
      if (option.value === defaultValue.toString()) {
        return option.value
      }
    })
    if (selectedOption) {
      selected.value = selectedOption
    }
  }
})

const routeStore = useRouteStore()
const { queries } = storeToRefs(routeStore)

watch(selected, (newVal) => {
  routeStore.addToQuery({ name: queryName, value: newVal.value }, allowMultipleQuery)
})

// Update input field value to match filters being deleted
watch(
  () => queries.value?.find((query) => query.name === queryName)?.value,
  (newVal) => {
    if (newVal) {
      const selectedOption = options.find((option) => {
        const checkSplit = newVal.toString().split(',')
        if (option.value === checkSplit[checkSplit?.length - 1]) {
          return option.value
        }
      })
      if (selectedOption) {
        selected.value = selectedOption
      }
    } else {
      selected.value = options[0]
    }
  }
)
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <InputLabel :label="label" />
    <Combobox v-model="selected">
      <div class="relative mt-1">
        <div class="relative w-full cursor-default overflow-hidden text-left shadow-md sm:text-sm">
          <ComboboxInput
            :disabled="disableInput || false"
            :displayValue="
              (option) => ((option as Options).name === 'None' ? '' : (option as Options).name)
            "
            class="w-full py-2 pl-3 pr-10 text-sm leading-5 text-neutral-100 rounded-lg border-neutral-950 border bg-neutral-700 border-neutral-950 focus:outline-0 focus:ring-0"
            placeholder="None"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            :class="`${disableInput && 'w-full justify-end'}`"
            class="absolute inset-y-0 right-0 flex items-center pr-2 text-neutral-100"
          >
            <ChevronDown :size="16" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            v-slot="{ open }"
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-neutral-100"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="option in filteredOptions"
              :key="option.value"
              v-slot="{ selected, active }"
              :disabled="option.disabled"
              :value="option"
              as="template"
            >
              <ComboListItem
                :active="active"
                :increase-slice-amount="increaseSliceAmount"
                :option="option"
                :selected="selected"
              />
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<style scoped></style>