import { type Runes } from '@/types/Runes'
import useSWRV from 'swrv'

interface RunesResponse {
  success: boolean
  data: Runes
}

const poxalaApi = import.meta.env.VITE_POXALA_API

export const useRunes = () => {
  return useSWRV<RunesResponse, Error>('runes', () => {
    return fetch(`${poxalaApi}/getRunes`)
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  })
}
