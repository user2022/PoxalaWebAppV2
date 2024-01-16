import { type Ability } from '@/types/Ability'
import useSWRV from 'swrv'

interface AbilityResponse {
  abilities: Ability[]
}

const poxalaApi = import.meta.env.VITE_POXALA_API

export const useAbilities = () => {
  return useSWRV<AbilityResponse, Error>('abilities', () => {
    return fetch(`/abilities.json`)
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  })
}

// export const useAbilities = () => {
//   return useSWRV<AbilityResponse, Error>('abilities', () => {
//     return fetch(`${poxalaApi}/getAbilities`)
//       .then((res) => res.json())
//       .then((res) => {
//         return res
//       })
//   })
// }
