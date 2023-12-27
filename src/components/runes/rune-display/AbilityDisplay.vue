<script lang="ts" setup>
import AbilityLabel from '@/components/runes/rune-display/AbilityLabel.vue'
import { type TransformAbility } from '@/lib/util/transformAbilities'
import AbilityInfo from '@/components/runes/rune-display/AbilityInfo.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface Props {
  ability?: TransformAbility
}

const { ability } = defineProps<Props>()

const open = ref<boolean>(false)

const setOpen = (val: boolean) => {
  if (ability?.options) {
    open.value = val
  }
}

const target = ref(null)

onClickOutside(target, () => {
  if (open.value) {
    setOpen(false)
  }
})

const selectedAbility = ability?.options?.find((optAbility) => optAbility.default)
</script>

<template>
  <div v-if="ability">
    <div ref="target" class="hidden"></div>
    <div class="group relative cursor-pointer">
      <div @click="setOpen(true)">
        <AbilityLabel :ability="ability" />
      </div>

      <AbilityInfo :ability="ability" />
    </div>

    <template v-if="open">
      <div class="relative w-fit">
        <div
          id="main"
          class="popover custom-popover z-100 flex flex-col w-auto absolute w-max left-1/2 transform -translate-x-1/2 mt-3 cursor-default"
        >
          <p class="text-white text-sm mb-2 whitespace-nowrap">Select an ability</p>
          <template
            v-for="(optAbility, index) in ability.options"
            :key="`${index}-${optAbility.id}`"
          >
            <div class="group relative">
              <AbilityLabel
                :ability="optAbility"
                :default-option="selectedAbility"
                is-option-ability
              />

              <AbilityInfo :ability="optAbility" />
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.test {
}

.ability-text {
  font-size: 11px;
}

.v-popper__inner {
  border-radius: 0;
  background-color: rgba(8, 8, 8, 0.89);
}

.popover {
  background-color: rgba(8, 8, 8, 0.89);
  padding: 7px 12px;
  color: white;
  max-width: 300px;
  z-index: 10;

  border: 2px solid rgb(96, 96, 96);
  border-radius: 0;
}

.popover-min-wid {
  width: 280px;
}
</style>