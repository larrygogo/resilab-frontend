import {ThemeColor} from "../@core/layouts/types";
import {PaletteMode} from "@mui/material";
import {createContext, useEffect, useState} from "react";
import axios from "axios";

type Settings = {
  appid: string;
  title: string
  logo: string
  mode: PaletteMode
  themeColor: ThemeColor
}

type SettingContextValue = {
  settings: Settings
  saveSettings: (updatedSettings: Settings) => void
}

const initialSettings: Settings = {
  appid: "app",
  title: 'NextJS Material Admin',
  logo: '/images/logo.svg',
  mode: 'light',
  themeColor: {
    main: '#5A8DEE',
    light: '#5A8DEE',
    dark: '#5A8DEE',
  },
}

const SettingContext = createContext<SettingContextValue>({
  settings: initialSettings,
  saveSettings: () => null
})

const SettingProvider = ({children}: any) => {
  const [settings, setSettings] = useState<Settings>(initialSettings)

  useEffect(() => {
    axios.get('/api/setting').then(res => {
      if(res.data.code === 200) {
        setSettings(res.data.data)
      }
    })
  })

  return (
    <SettingContext.Provider value={{
      settings,
      saveSettings: setSettings
    }}>
      {children}
    </SettingContext.Provider>
  )
}

const SettingConsumer = SettingContext.Consumer

export {
  SettingProvider,
  SettingConsumer
}

