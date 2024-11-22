import type { Champion } from '@/types/Champion'

export type BaseStatQueryCode =
  | 'hitPoints'
  | 'damage'
  | 'speed'
  | 'defense'
  | 'minRng'
  | 'maxRng'
  | 'noraCost'

export const BaseStatQueryCodes: Partial<keyof Champion>[] = [
  'hitPoints',
  'damage',
  'speed',
  'defense',
  'minRng',
  'maxRng',
  'noraCost'
]

export const OtherQueryCodes: Partial<keyof Champion>[] = ['size']
