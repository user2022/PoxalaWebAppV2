import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { getRouteQueriesForFilter, transformOptionsToQuery } from '@/lib/getRouteQueriesForFilter'

interface Props {
  route: RouteLocationNormalizedLoaded
  router: Router
  newValue: string | number
  queryName: string
  allowMultipleQuery?: boolean
}

export const appendRouteQuery = ({
  route,
  router,
  queryName,
  allowMultipleQuery,
  newValue
}: Props) => {
  if (newValue === '') {
    const queries = getRouteQueriesForFilter(route.query)
    const newQueries = queries.filter((query) => query.name !== queryName)
    const newQuery = newQueries.length ? transformOptionsToQuery(newQueries) : {}
    router.push({ query: newQuery })
    return
  }

  const valToString = newValue.toString()

  const routeQuery = route.query[queryName]
  const curVal = routeQuery ? routeQuery.toString() : null
  const vals: string[] =
    curVal && allowMultipleQuery ? [...(curVal as string).split(','), valToString] : [valToString]

  if (curVal?.includes(valToString)) return
  else router.push({ query: { ...route.query, [queryName]: vals.join(',') } })
}
