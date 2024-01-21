import { type Runes } from '@/types/Runes'
import useSWRV from 'swrv'

const poxalaApi = import.meta.env.VITE_POXALA_API

export const useRunes = () => {
  return useSWRV<Runes, Error>('runes', () => {
    return fetch(`${poxalaApi}/getPoxRunes`)
      .then((res) => res.json())
      .then((res) => {
        return res
      })
  })
}
