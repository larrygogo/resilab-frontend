import {useState, SyntheticEvent, Fragment, useEffect} from 'react'
import {useRouter} from 'next/router'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import {useTranslation} from "react-i18next";
import {ChevronDown, Earth} from "mdi-material-ui";
import Button from "@mui/material/Button";
import {ThemeProvider} from "@mui/material/styles";
import Box, {BoxProps} from "@mui/material/Box";
import languages from "src/configs/languages";

type Props = BoxProps

const LangDropdown = (props: Props) => {
  const {i18n} = useTranslation();

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()

  const currentLang = languages.find(lang => lang.id === i18n.language)

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const changeLang = async (lang: string) => {
    await i18n.changeLanguage?.(lang)
    window.localStorage.setItem('lang', lang)
    handleDropdownClose()
  }

  useEffect(() => {
    i18n.changeLanguage?.(window.localStorage.getItem('lang') || 'en_US').then()
  }, [i18n])

  return (
    <Box {...props}>
      {currentLang && (
        <ThemeProvider theme={{
          typography: {
            button: {
              textTransform: 'none',
            }
          }
        }}>
          <Button sx={{display: 'flex'}} onClick={handleDropdownOpen} color="inherit">
            <Earth/>
            <Typography style={{margin: '0 5px'}} color="inherit" fontWeight={600}>{currentLang.title}</Typography>
            <ChevronDown/>
          </Button>
        </ThemeProvider>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{'& .MuiMenu-paper': {mt: 4}}}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        variant="selectedMenu"
      >
        {languages.map(lang => (
          <MenuItem
            key={lang.id}
            selected={lang.id === currentLang?.id}
            onClick={() => changeLang(lang.id)}
            sx={{
              py: 2,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {lang.title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default LangDropdown
