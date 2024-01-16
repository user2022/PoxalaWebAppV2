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
  // console.log(route.query, 'route.query from appendRoute')

  if (newValue === '') {
    const queries = getRouteQueriesForFilter(route.query)
    const newQueries = queries.filter((query) => query.name !== queryName)
    const newQuery = newQueries.length ? transformOptionsToQuery(newQueries) : {}
    router.push({ query: newQuery })
    return
  }

  // Set the value to a string
  const valToString = newValue.toString()

  // Get the current value of the query
  const routeQuery = route.query[queryName]
  // Set the current query value into a string or return null
  const curVal = routeQuery ? routeQuery.toString() : null

  const vals: string[] =
    curVal && allowMultipleQuery ? [...(curVal as string).split(','), valToString] : [valToString]

  // console.log(curVal, valToString, vals, 'vals from appendRoute')
  // console.log({ ...route.query, [queryName]: vals.join(',') }, 'new query')

  router.push({ query: { ...route.query, [queryName]: vals.join(',') } })
  //
  // if (curVal?.includes(valToString)) return
  // else router.push({ query: { ...route.query, [queryName]: vals.join(',') } })
}
