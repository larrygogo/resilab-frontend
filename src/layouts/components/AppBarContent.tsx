import Box from "@mui/material/Box";
import UserDropdown from "./UserDropdown";
import {FormatAlignJustify} from 'mdi-material-ui';
import IconButton from "@mui/material/IconButton";
import LangDropdown from "./LangDropdown";

type Props = {
  hidden: boolean
  navVisible: boolean
  setNavVisible: (value: boolean) => void
}

const AppBarContent = (props: Props) => {

  const {hidden} = props

  const toggleNavVisibility = () => {
    props.setNavVisible(!props.navVisible)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          {hidden && (<IconButton color='inherit' onClick={toggleNavVisibility}>
            <FormatAlignJustify />
          </IconButton>)}
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <LangDropdown />
          <UserDropdown />
        </Box>
      </Box>
    </Box>
  )
}

export default AppBarContent
