import type { LocationQuery } from 'vue-router'
import type { Options } from '@/types/Options'

export const getRouteQueriesForFilter = (queries: LocationQuery): Options[] => {
  const headers = Object.keys(queries)
  const options: Options[] = []

  // Loop through each query and add it to the options array
  headers.forEach((header) => {
    const value = queries[header]?.toString() || ''
    const splitVal = value.split(',')

    for (let i = 0; i < splitVal.length; i++) {
      const option: Options = {
        name: header,
        value: splitVal[i]
      }
      options.push(option)
    }
  })

  return options
}

export const transformOptionsToQuery = (options: Options[]): LocationQuery => {
  const queries: LocationQuery = {}

  // Loop through each option and add it to the queries object
  options.forEach((option) => {
    const { name, value } = option

    if (queries[name]) {
      queries[name] = `${queries[name]},${value}`
    } else {
      queries[name] = value.toString()
    }
  })

  return queries
}
