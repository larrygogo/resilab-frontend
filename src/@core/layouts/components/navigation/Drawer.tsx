import {LayoutConfig} from "src/@core/context/types";
import {ReactNode} from "react";
import MuiSwipeableDrawer, {SwipeableDrawerProps} from "@mui/material/SwipeableDrawer";
import {styled, useTheme} from "@mui/material/styles";

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none'
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 20,
    paddingRight: 20
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
  }
})

type Props = {
  hidden: boolean
  config: LayoutConfig
  saveConfig: (template: LayoutConfig) => void
  children: ReactNode
  setNavHover?: (values: boolean) => void
  navVisible?: boolean
  setNavVisible?: (value: boolean) => void
}

const Drawer = (props: Props) => {
  const {hidden = false, config, children, setNavHover, navVisible = true, setNavVisible} = props;
  const theme = useTheme()

  const {navCollapsed, navWidth, navCollapsedWidth} = config


  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible?.(true),
    onClose: () => setNavVisible?.(false),
    ModalProps: {
      keepMounted: true // Better open performance on mobile.
    }
  }

  // Drawer Props for Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
    onMouseEnter: () => {
      setNavHover?.(true)
    },
    onMouseLeave: () => {
      setNavHover?.(false)
    }
  }

  return <SwipeableDrawer
    className='layout-nav'
    variant={hidden ? 'temporary' : 'permanent'}
    {...(!hidden ? {...DesktopDrawerProps} : {...MobileDrawerProps})}
    PaperProps={{sx: { width: navCollapsed ? navCollapsedWidth : navWidth }}}
    sx={{
      width: navCollapsed ? navCollapsedWidth : navWidth,
      '& .MuiDrawer-paper': {
        backgroundColor: theme.palette.background.paper,
        borderRight: 0
      }
    }}
  >
    {children}
  </SwipeableDrawer>
}

export default Drawer
