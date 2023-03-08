import { useContext } from 'react'
import { AbilityContext } from 'src/@core/context/AbilityContext'

export const useAbility = () => useContext(AbilityContext)
