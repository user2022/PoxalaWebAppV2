<script lang="ts" setup>
import PageLayout from '@/components/layout/PageLayout.vue'
import LargeSearchBox from '@/components/form/LargeSearchBox.vue'
import { useAbilities } from '@/hooks/useAbilities'
import type { Options } from '@/types/Options'
import AbilityCard from '@/components/abilities/AbilityCard.vue'
import ComboBoxField from '@/components/form/ComboBoxField.vue'
import { useRouteStore } from '@/stores/storeRoute'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import type { Ability } from '@/types/Ability'
import ClientPagination from '@/components/pagination/ClientPagination.vue'
import Container from '@/components/shared/Container.vue'
import { Zap } from 'lucide-vue-next'

const { data: res, error } = useAbilities()

const abilities = ref<Ability[] | undefined>(res.value?.abilities)

onMounted(() => {
  routeStore.initialiseQueries()
})

watch(res, () => {
  if (res.value?.abilities) abilities.value = res.value?.abilities
})

console.log(res.value, 'abilities')

const options: Options[] = [
  {
    name: 'None',
    value: ''
  },
  {
    name: 'Nora Cost',
    value: 'noraCost'
  },
  {
    name: 'Name',
    value: 'name'
  },
  {
    name: 'AP Cost',
    value: 'apCost'
  },
  {
    name: 'ID',
    value: 'id'
  }
]

const searchByOptions: Options[] = [
  {
    name: 'Name',
    value: 'name'
  },
  {
    name: 'All',
    value: 'all'
  }
]

const routeStore = useRouteStore()
const { queries } = storeToRefs(routeStore)

const route = useRoute()

watchEffect(() => {
  if (!abilities.value || !res.value?.abilities) return
  let data: Ability[] = JSON.parse(JSON.stringify(res.value.abilities)) // Keep copy of original data

  const sort = queries.value?.find((query) => query.name === 'sort')?.value
  const searchBy = queries.value?.find((query) => query.name === 'search-by')?.value
  const search = queries.value?.find((query) => query.name === 's')?.value

  if (sort) {
    switch (sort) {
      case 'noraCost':
        data.sort((a, b) => b.cost - a.cost)
        break
      case 'name':
        data.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'apCost':
        data.sort((a, b) => b.ap_cost - a.ap_cost)
        break
      case 'id':
        data.sort((a, b) => a.ability_id - b.ability_id)
        break
      default:
        data.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
  }

  if (search) {
    switch (searchBy) {
      case 'name':
        data = data.filter((ability) =>
          ability.name.toLowerCase().includes(search.toString().toLowerCase())
        )
        break
      case 'all':
        data = data.filter((ability) => {
          const str =
            ability.name +
            ' ' +
            ability.short_description.toString() +
            ' ' +
            ability.long_description.toString() +
            ' ' +
            ability.cost.toString() +
            ' ' +
            ability.ability_id.toString() +
            ' ' +
            ability.ap_cost.toString() +
            ' ' +
            ability.cooldown.toString()
          return str.toLowerCase().includes(search.toString().toLowerCase())
        })

        break
      default:
        data = data.filter((ability) =>
          ability.name.toLowerCase().includes(search.toString().toLowerCase())
        )
        break
    }
  }
  abilities.value = data
})

const curPage = computed(() => {
  return route.query.page ? parseInt(route.query.page as string) : 0
})

const perPage = 25
</script>

<template>
  <PageLayout :error="error" :is-loading="!abilities" title="Abilities">
    <template #children>
      <div class="py-4 border-b bg-gray-900/50 border-gray-700 flex flex-col px-4 gap-4">
        <LargeSearchBox placeholder="Search abilities..." query-name="s" />
        <div class="flex flex-row flex-wrap gap-4">
          <ComboBoxField :options="options" label="Sort by" query-name="sort" />
          <ComboBoxField :options="searchByOptions" label="Search by" query-name="search-by" />
          <!--      <ToggleButton label="Show unused abilities" />-->
        </div>
      </div>
    </template>
    <Container>
      <template v-if="abilities && abilities?.length > 0">
        <div class="h-[calc(100vh-400px)] overflow-y-scroll flex flex-col gap-2 shadow-inner">
          <template
            v-for="ability in abilities?.slice(curPage * perPage, (curPage + 1) * perPage)"
            :key="ability.id"
          >
            <AbilityCard :ability="ability" />
          </template>
        </div>
        <div class="mt-4">
          <template v-if="abilities?.length > perPage">
            <ClientPagination :count="abilities.length" :per-page="perPage" />
          </template>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col items-center justify-center gap-4 text-gray-400 py-20">
          <Zap
            class="w-12 h-12 text-yellow-400 animate-pulse drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
          />
          <p class="text-lg font-medium">No abilities match your search</p>
        </div>
      </template>
    </Container>
  </PageLayout>
</template>

<style scoped></style>
