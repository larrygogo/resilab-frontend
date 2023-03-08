// ** React Imports
import {useState, SyntheticEvent, Fragment} from 'react'

// ** Next Import
import {useRouter} from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Context
import {useAuth} from 'src/@core/hooks/useAuth'

const UserDropdown = () => {

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const {userInfo, logout} = useAuth()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = async() => {
    await logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Avatar
        alt={userInfo.discordName}
        onClick={handleDropdownOpen}
        sx={(theme) => ({
          cursor: 'pointer',
          width: theme.spacing(8),
          height: theme.spacing(8),
        })}
        variant="rounded"
        src={userInfo.avatarUrl}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{'& .MuiMenu-paper': {width: 230, mt: 4}}}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <Box sx={{pt: 2, pb: 3, px: 4}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar
              alt={userInfo.discordName}
              src={userInfo.avatarUrl}
              variant="rounded"
              sx={(theme) => ({
                width: theme.spacing(8),
                height: theme.spacing(8),
              })}
            />
            <Box sx={{display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column'}}>
              <Typography sx={{fontWeight: 600}}>{userInfo.username}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider/>
        <MenuItem sx={{py: 2}} onClick={handleLogout}>
          退出登录
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
