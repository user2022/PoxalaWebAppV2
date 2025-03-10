import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import type { Options } from '@/types/Options'
import { getRouteQueriesForFilter, transformOptionsToQuery } from '@/lib/getRouteQueriesForFilter'

export const useRouteStore = defineStore('storeRoute', () => {
  const route = useRoute()
  const router = useRouter()

  const queries = ref<Options[]>()

  // Queries that are default on page load
  const defaultQueries = ref<Options[]>([])
  // Queries that have been used for a default value
  const defaultQueriesUsed = ref<Options[]>([])

  const setDefaultQueries = (q: Options[]) => {
    defaultQueries.value = q
  }

  const resetBothDefaultQueries = () => {
    defaultQueries.value = []
    defaultQueriesUsed.value = []
  }

  const getDefaultQuery = (queryName: string, value: number | string) => {
    const findQuery = defaultQueries.value.find((query) => query.name === queryName)
    const findInUsed = defaultQueriesUsed.value.find((query) => query.name === queryName)
    // return value

    if (findQuery && !findInUsed) {
      defaultQueriesUsed.value.push(findQuery)
      return findQuery.value
    } else {
      return value
    }
  }

  const removeAllQueries = (ignore?: string[]) => {
    if (ignore) {
      queries.value = queries.value?.filter((query) => ignore.includes(query.name))
    } else {
      queries.value = undefined
    }
  }

  const addToQuery = (opt: Options, allowMultipleQuery?: boolean) => {
    if (opt.value === '') removeFromQuery(opt)
    if (!opt.value) return
    if (allowMultipleQuery) {
      queries.value = [...(queries.value ?? []), opt]
    } else {
      const checkIfValExists = queries.value?.find((query) => query.name === opt.name)
      if (!checkIfValExists) {
        queries.value = [...(queries.value ?? []), opt]
        return
      } else {
        queries.value = queries.value?.map((query) => {
          if (query.name === opt.name) return opt
          else return query
        })
      }
    }
  }

  const removeFromQuery = (opt: Options) => {
    queries.value = queries.value?.filter((query) => query.value !== opt.value)
  }

  watch(queries, (newVal) => {
    const q = transformOptionsToQuery(newVal ?? [])
    router.push({ query: q })
  })

  watch(route.query, () => {
    updateQueriesFromURL()
  })

  const initialiseQueries = () => {
    const q = getRouteQueriesForFilter(route.query)
    queries.value = q
  }

  const updateQueriesFromURL = () => {
    const q = getRouteQueriesForFilter(route.query)
    queries.value = q
  }

  const getQuery = (name: string) => {
    return queries.value?.find((query) => query.name === name)
  }

  return {
    queries,
    addToQuery,
    removeAllQueries,
    removeFromQuery,
    updateQueriesFromURL,
    getQuery,
    initialiseQueries,
    // Default Queries
    defaultQueries,
    setDefaultQueries,
    getDefaultQuery,
    resetBothDefaultQueries
  }
})
