// ** React Imports
import {ReactNode} from 'react'

// ** Component Imports
import {Action} from 'src/@core/context/AbilityContext'

// ** Types
import {NavSectionTitle} from 'src/@core/layouts/types'
import {useAbility} from "src/@core/hooks/useAbility";

interface Props {
  children: ReactNode
  navTitle?: NavSectionTitle
}

const CanViewNavSectionTitle = (props: Props) => {
  // ** Props
  const {children, navTitle} = props

  // ** Hook
  const ability = useAbility()

  return ability && ability.can(navTitle?.action as Action, navTitle?.subject as string) ? <>{children}</> : null
}

export default CanViewNavSectionTitle
