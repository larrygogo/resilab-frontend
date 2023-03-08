import {NavMenu} from 'src/@core/layouts/types'

const menus = (): NavMenu => {
  return [
    {
      title: 'Dashboard',
      icon: 'HomeOutline',
      path: '/dashboard',
      action: "access",
      subject: "dashboard"
    },
    {
      title: 'Manager',
      icon: 'HomeOutline',
      path: '/manager',
    },
    {
      title: 'Purchase',
      icon: 'HomeOutline',
      path: '/purchase',
      action: "access",
      subject: "purchase"
    },
    {
      title: 'Settings',
      icon: 'HomeOutline',
      path: '/settings',
    },
  ]
}

export default menus;
