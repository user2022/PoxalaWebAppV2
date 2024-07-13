import { type Ability } from '@/types/Ability'
import useSWRV from 'swrv'

const poxalaApi = import.meta.env.VITE_POXALA_API

interface AbilityResponse {
  abilities: Ability[]
}

export const useAbilities = () => {
  return useSWRV<AbilityResponse, Error>(
    'abilities',
    () => {
      return fetch(`${poxalaApi}/getPoxAbilities`)
        .then((res) => res.json())
        .then((res) => {
          return res
        })
    },
    {
      revalidateOnFocus: false
    }
  )
}
