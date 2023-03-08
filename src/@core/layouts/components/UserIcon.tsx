// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { SvgIconProps } from '@mui/material'

interface UserIconProps {
  iconProps?: SvgIconProps
  icon: string | ReactNode
  componentType: 'search' | 'menu'
}

const UserIcon = (props: UserIconProps) => {
  // ** Props
  const { icon, iconProps, componentType } = props

  const IconTag = icon

  let styles

  if (componentType === 'search') {
    // Conditional Props based on component type, like have different font size or icon color
    /* styles = {
      color: 'blue',
      fontSize: '2rem'
    } */
  } else if (componentType === 'menu') {
    // Conditional Props based on component type, like have different font size or icon color
    /* styles = {
      color: 'red',
      fontSize: '1.5rem'
    } */
  } else {
    return null
  }

  // @ts-ignore
  return <IconTag {...iconProps} style={{ ...styles }} />
}

export default UserIcon
