import type { AbilitiesEntity, StartingAbilitiesEntity } from '@/types/Champion'

interface AbilityProps {
  abilityPath1: AbilitiesEntity[]
  abilityPath2: AbilitiesEntity[]
  startingAbilities: StartingAbilitiesEntity[]
}

export interface TransformAbility extends AbilitiesEntity {
  options?: AbilitiesEntity[]
}

export const transformAbilities = (props: AbilityProps): TransformAbility[] => {
  const { startingAbilities, abilityPath2, abilityPath1 } = props

  const defaultAbility1 = abilityPath1?.find((ability) => ability.default)!

  const defaultAbility2 = abilityPath2?.find((ability) => ability.default)!

  const a1: TransformAbility = { ...defaultAbility1, options: abilityPath1 }
  const a2: TransformAbility = { ...defaultAbility2, options: abilityPath2 }

  return [a1, a2, ...startingAbilities]
}
