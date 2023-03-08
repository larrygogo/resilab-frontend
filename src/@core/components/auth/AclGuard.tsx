// ** React Imports
import {ReactNode} from 'react'

// ** Next Imports
import {useRouter} from 'next/router'

// ** Types

// ** Context Imports
import {AbilityContext, AclType, AppAbility} from 'src/@core/context/AbilityContext'

// ** Config Import
import builderAbility from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import {useAuth} from 'src/@core/hooks/useAuth'
import {PureAbility} from "@casl/ability";

interface AclGuardProps {
  children: ReactNode
  guestGuard: boolean
  aclAbilities: AclType
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const {aclAbilities, children, guestGuard} = props

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  const ability = new PureAbility() as AppAbility

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>
  }
  builderAbility(ability, auth.userInfo)


  // Check the access of current user and render pages
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized/>
    </BlankLayout>
  )
}

export default AclGuard
