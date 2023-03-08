// ** React Imports
import {ReactNode} from 'react'

// ** Component Imports
import {Action} from 'src/@core/context/AbilityContext'

// ** Types
import {NavLink} from 'src/@core/layouts/types'
import {useAbility} from "src/@core/hooks/useAbility";

interface Props {
  navLink?: NavLink
  children: ReactNode
}

const CanViewNavLink = (props: Props) => {
  // ** Props
  const {children, navLink} = props

  // ** Hook
  const ability = useAbility()
  return ability && ability.can(navLink?.action as Action, navLink?.subject as string) ? <>{children}</> : null
}

export default CanViewNavLink
