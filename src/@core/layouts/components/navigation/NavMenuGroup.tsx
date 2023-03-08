// ** React Imports
import {useEffect, Fragment, ElementType} from 'react'

// ** Next Import
import {useRouter} from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import ListItem from '@mui/material/ListItem'
import Box, {BoxProps} from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import {styled, useTheme} from '@mui/material/styles'
import ListItemButton from '@mui/material/ListItemButton'

// ** Third Party Imports
import clsx from 'clsx'

// ** Icons Imports
import ChevronLeft from 'mdi-material-ui/ChevronLeft'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Utils
import {hasActiveChild, removeChildren} from 'src/@core/layouts/utils'

// ** Types
import {NavGroup} from 'src/@core/layouts/types'
import * as Icons from 'mdi-material-ui'

// ** Custom Components Imports
import NavMenuItems from './NavMenuItems'
import Translations from 'src/@core/layouts/components/Translations'
import CanViewNavGroup from 'src/@core/layouts/components/acl/CanViewNavGroup'
import {LayoutConfig} from "../../../context/types";
import {ListItemButtonProps} from "@mui/material";
import UserIcon from "../UserIcon";

interface Props {
  item: NavGroup
  navHover: boolean
  parent?: NavGroup
  config: LayoutConfig
  navVisible?: boolean
  groupActive: string[]
  collapsedNavWidth: number
  currentActiveGroup: string[]
  navigationBorderWidth: number
  isSubToSub: NavGroup | undefined
  saveConfig: (values: LayoutConfig) => void
  setGroupActive: (values: string[]) => void
  setCurrentActiveGroup: (items: string[]) => void
}

const MenuNavGroup = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
>(({theme}) => ({
  width: '100%',
  borderRadius: 4,
  padding: '0 14px',
  pr: 0,
  transition: 'padding-left .25s ease-in-out, background-color .25s ease-in-out, color .25s ease-in-out',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.text.secondary,
  },
  '& .MuiTypography-root': {
    color: theme.palette.text.secondary,
  },
  '&.hover': {
    backgroundColor: theme.palette.action.hover,
    '& .MuiTypography-root': {
      color: theme.palette.text.primary,
    }
  },
  '&.active': {
    color: theme.palette.customColors.main,
    backgroundColor: theme.palette.action.active,
    '& .MuiTypography-root': {
      color: theme.palette.text.primary,
    }
  },
}))

const MenuItemTextWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  overflow: 'hidden',
  fontSize: 14,
  height: 45,
}))

const MenuGroupToggleRightIcon = styled(ChevronRight)(({theme}) => ({
  color: theme.palette.text.primary,
  transition: 'transform .25s ease-in-out'
}))

const MenuGroupToggleLeftIcon = styled(ChevronLeft)(({theme}) => ({
  color: theme.palette.text.primary,
  transition: 'transform .25s ease-in-out'
}))

const NavMenuGroup = (props: Props) => {
  // ** Props
  const {
    item,
    config,
    parent,
    navHover,
    navVisible,
    isSubToSub,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    setCurrentActiveGroup,
  } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const router = useRouter()
  const currentURL = router.pathname
  const {navCollapsed, menuTextTruncate, verticalNavToggleType} = config

  // @ts-ignore
  const IconTag = parent && !item.icon ? Icons['CircleOutline'] : Icons[item.icon]

  // ** Accordion menu group open toggle
  const toggleActiveGroup = (item: NavGroup, parent: NavGroup | undefined) => {
    let openGroup = groupActive

    // ** If Group is already open and clicked, close the group
    if (openGroup.includes(item.title)) {
      openGroup.splice(openGroup.indexOf(item.title), 1)

      // If clicked Group has open group children, Also remove those children to close those groups
      if (item.children) {
        removeChildren(item.children, openGroup, currentActiveGroup)
      }
    } else if (parent) {
      // ** If Group clicked is the child of an open group, first remove all the open groups under that parent
      if (parent.children) {
        removeChildren(parent.children, openGroup, currentActiveGroup)
      }

      // ** After removing all the open groups under that parent, add the clicked group to open group array
      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title)
      }
    } else {
      // ** If clicked on another group that is not active or open, create openGroup array from scratch

      // ** Empty Open Group array
      openGroup = []

      // ** push Current Active Group To Open Group array
      if (currentActiveGroup.every(elem => groupActive.includes(elem))) {
        openGroup.push(...currentActiveGroup)
      }

      // ** Push current clicked group item to Open Group array
      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title)
      }
    }
    setGroupActive([...openGroup])
  }

  // ** Menu Group Click
  const handleGroupClick = () => {
    const openGroup = groupActive
    if (verticalNavToggleType === 'collapse') {
      if (openGroup.includes(item.title)) {
        openGroup.splice(openGroup.indexOf(item.title), 1)
      } else {
        openGroup.push(item.title)
      }
      setGroupActive([...openGroup])
    } else {
      toggleActiveGroup(item, parent)
    }
  }

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.title)) groupActive.push(item.title)
    } else {
      const index = groupActive.indexOf(item.title)
      if (index > -1) groupActive.splice(index, 1)
    }
    setGroupActive([...groupActive])
    setCurrentActiveGroup([...groupActive])

    // Empty Active Group When Menu is collapsed and not hovered, to fix issue route change
    if (navCollapsed && !navHover) {
      setGroupActive([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  useEffect(() => {
    if (navCollapsed && !navHover) {
      setGroupActive([])
    }

    if ((navCollapsed && navHover) || (groupActive.length === 0 && !navCollapsed)) {
      setGroupActive([...currentActiveGroup])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navCollapsed, navHover])

  useEffect(() => {
    if (groupActive.length === 0 && !navCollapsed) {
      setGroupActive([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navHover])

  const menuGroupCollapsedStyles = navCollapsed && !navHover ? {opacity: 0} : {opacity: 1}

  const conditionalColor = () => {
    return {
      color: `${theme.palette.text.secondary} !important`
    }
  }

  const conditionalBgColor = () => {
    // return {
    //   color: theme.palette.text.secondary,
    //   '&.Mui-selected': {
    //     color: theme.palette.customColors.main,
    //     backgroundColor: theme.palette.action.active,
    //     '&:hover': {
    //       backgroundColor: theme.palette.action.hover
    //     }
    //   }
    // }
  }

  return (
    <CanViewNavGroup navGroup={item}>
      <Fragment>
        <ListItem
          // className='nav-group'
          onClick={handleGroupClick}
          disablePadding
          sx={{flexDirection: 'column', pr: isSubToSub ? 10 : 0,}}
        >
          <MenuNavGroup
            className={clsx({
              'Mui-selected': groupActive.includes(item.title) || currentActiveGroup.includes(item.title)
            })}
            sx={{
              width: '100%',
              transition: 'padding-left .25s ease-in-out',
            }}
          >
            {isSubToSub ? null : (
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  transition: 'margin .25s ease-in-out',
                  mr: navCollapsed && !navHover ? 0 : 2.5,
                }}
              >
                <UserIcon
                  icon={IconTag}
                  componentType='menu'
                  iconProps={{
                    sx: {
                      fontSize: '0.875rem',
                      ...(!parent ? {fontSize: '1rem'} : {}),
                      ...(parent && item.icon ? {fontSize: '0.875rem'} : {})
                    }
                  }}
                />
              </ListItemIcon>
            )}
            <MenuItemTextWrapper sx={{...menuGroupCollapsedStyles, ...(isSubToSub ? {ml: 9} : {})}}>
              <Translations text={item.title}/>
              <Box className='menu-item-meta' sx={{ml: 0.8, display: 'flex', alignItems: 'center'}}>
                {item.badgeContent ? (
                  <Chip
                    label={item.badgeContent}
                    color={item.badgeColor || 'primary'}
                    sx={{
                      mr: 0.8,
                      height: 20,
                      fontWeight: 500,
                      '& .MuiChip-label': {px: 1.5, textTransform: 'capitalize'}
                    }}
                  />
                ) : null}
                <MenuGroupToggleRightIcon
                  sx={{
                    ...conditionalColor(),
                    ...(groupActive.includes(item.title) ? {transform: 'rotate(90deg)'} : {})
                  }}
                />
              </Box>
            </MenuItemTextWrapper>
          </MenuNavGroup>
          <Collapse
            component='ul'
            onClick={e => e.stopPropagation()}
            in={groupActive.includes(item.title)}
            sx={{
              pl: 0,
              width: '100%',
              ...menuGroupCollapsedStyles,
              transition: 'all .25s ease-in-out'
            }}
          >
            <NavMenuItems
              {...props}
              parent={item}
              navVisible={navVisible}
              menu={item.children}
            />
          </Collapse>
        </ListItem>
      </Fragment>
    </CanViewNavGroup>
  )
}

export default NavMenuGroup
