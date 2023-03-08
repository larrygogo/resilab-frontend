import {ReactNode} from "react";
import {AppBar, Content, Footer, ThemeColor} from "src/@core/layouts/types";
import {PaletteMode} from "@mui/material";

export type LayoutConfig = {
  logo?: string
  // layout?: Layout
  appBar?: AppBar
  footer?: Footer
  minLogo?: string
  content?: Content
  navWidth?: number
  mode: PaletteMode
  navCollapsed?: boolean
  themeColor: ThemeColor
  navAllowHover?: boolean
  allowModeSwitch?: boolean
  navAllowCollapse?: boolean
  navCollapsedWidth?: number
  menuTextTruncate?: boolean
  verticalNavToggleType?: 'accordion' | 'collapse'
}

export type LayoutContextValue = {
  config: LayoutConfig
  saveConfig: (theme: LayoutConfig) => void
}

export type TemplateProviderProps = {
  initConfig?: LayoutConfig
  children: ReactNode
}

export type AuthContextOptions = {
  storageKey: string
  currentUserUrl: string
  loginUrl: string
  registerUrl: string
  logoutUrl: string
}

export type AuthContextValue<T = any> = {
  loading: boolean
  userInfo: T
  setUserInfo: (value: T) => void
  options: AuthContextOptions
  saveOptions: (options: AuthContextOptions) => void
  login: (data: any) => Promise<any>
  logout: () => Promise<any>
  register: (data: any) => Promise<any>
}

export type AuthProviderProps = {
  children: ReactNode
  options?: Partial<AuthContextOptions>
}

export type ErrCallbackType = (err: { [key: string]: string }) => void
