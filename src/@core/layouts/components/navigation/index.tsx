import {LayoutConfig} from "src/@core/context/types";
import {useRef, useState} from "react";
import Drawer from "./Drawer";
import NavHeader from "./NavHeader";
import NavMenuItems from "./NavMenuItems";
import {NavMenu} from "../../types";
import {styled} from "@mui/material/styles";
import Box, {BoxProps} from "@mui/material/Box";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import {List} from "@mui/material";


const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  display: 'none',
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  '&.d-block': {
    display: 'block'
  }
}))

type NavigationProps = {
  hidden: boolean
  navMenu?: NavMenu
  navHover?: boolean
  config: LayoutConfig
  navVisible?: boolean
  setNavHover?: (values: boolean) => void
  setNavVisible?: (value: boolean) => void
  saveConfig: (template: LayoutConfig) => void
}

const Navigation = (props: NavigationProps) => {
  const { } = props;
  const shadowRef = useRef(null)
  const [groupActive, setGroupActive] = useState<string[]>([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([])

  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect

      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  const scrollMenu = (container: any) => {
    // @ts-ignore
    if(shadowRef.current && container) {
      if(container.scrollTop > 0) {
        // @ts-ignore
        if(!shadowRef.current.classList.contains('d-block')) {
          // @ts-ignore
          shadowRef.current.classList.add('d-block')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('d-block')
      }
    }

  }

  return <Drawer {...props}>
    <NavHeader {...props} />
    <StyledBoxForShadow className="d-block" />
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <PerfectScrollbar
        containerRef={handleInfiniteScroll}
        options={{ wheelPropagation: false }}
        onScrollY={scrollMenu}
      >
        <List className='nav-items' disablePadding>
          <NavMenuItems {...props} groupActive={groupActive} setGroupActive={setGroupActive} currentActiveGroup={currentActiveGroup} setCurrentActiveGroup={setCurrentActiveGroup} />
        </List>
      </PerfectScrollbar>
    </Box>
  </Drawer>
}

export default Navigation
