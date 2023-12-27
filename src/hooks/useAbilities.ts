import { type Ability } from '@/types/Ability'
import useSWRV from 'swrv'

interface AbilityResponse {
  success: boolean
  data: Ability[]
}

const poxalaApi = import.meta.env.VITE_POXALA_API

export const useAbilities = () => {
  return useSWRV<AbilityResponse, Error>('abilities', () => {
    return fetch(`${poxalaApi}/getChampionAbilities`)
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  })
}
