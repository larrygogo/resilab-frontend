// ** Types Import
import { LayoutConfig } from 'src/@core/context/types'
import { NavGroup, NavLink, NavSectionTitle, NavMenu } from 'src/@core/layouts/types'

// ** Custom Menu Components
import NavMenuLink from './NavMenuLink'
import NavMenuSectionTitle from './NavMenuSectionTitle'
import NavMenuGroup from "./NavMenuGroup";

interface Props {
  parent?: NavGroup
  config: LayoutConfig
  navHover?: boolean
  menu?: NavMenu
  navVisible?: boolean
  isSubToSub?: NavGroup
  saveConfig: (values: LayoutConfig) => void
  groupActive: string[]
  setGroupActive: (value: string[]) => void
  currentActiveGroup: string[]
  setCurrentActiveGroup: (item: string[]) => void
}

const resolveNavItemComponent = (item: NavGroup | NavLink | NavSectionTitle) => {
  if ((item as NavLink).path) return NavMenuLink
  if ((item as NavGroup).children) return NavMenuGroup
  return NavMenuSectionTitle
}

const NavMenuItems = (props: Props) => {
  // ** Props
  const { menu } = props

  const RenderMenuItems = menu?.map((item: NavGroup | NavLink | NavSectionTitle, index: number) => {
    const TagName: any = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default NavMenuItems
