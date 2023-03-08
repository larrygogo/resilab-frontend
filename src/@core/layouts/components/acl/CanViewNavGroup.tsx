// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { NavGroup, NavLink } from 'src/@core/layouts/types'

// ** Hooks
import {useAbility} from "src/@core/hooks/useAbility";
import {Action} from "src/@core/context/AbilityContext";

interface Props {
  navGroup?: NavGroup
  children: ReactNode
}

const CanViewNavGroup = (props: Props) => {
  // ** Props
  const { children, navGroup } = props

  // ** Hook
  const ability = useAbility()

  const canViewMenuGroup = (item: NavGroup) => {
    const hasAnyVisibleChild =
      item.children && item.children.some((i: NavLink) => ability && ability.can(i.action as Action, i.subject as string))

    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild
    }

    return ability && ability.can(item.action as Action, item.subject) && hasAnyVisibleChild
  }

  return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null
}

export default CanViewNavGroup
