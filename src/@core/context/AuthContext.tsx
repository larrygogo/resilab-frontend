import {createContext, useEffect, useState} from "react";
import {AuthContextOptions, AuthContextValue, AuthProviderProps} from "./types";
import {useRouter} from "next/router";
import axios from "axios";

const initialOptions: AuthContextOptions =  {
  storageKey: 'userData',
  currentUserUrl: '/api/auth/current',
  loginUrl: '/api/auth/login',
  logoutUrl: '/api/auth/logout',
  registerUrl: '/api/auth/register',
}

const defaultContextValue: AuthContextValue = {
  loading: true,
  userInfo: null,
  options: initialOptions,
  saveOptions: () => null,
  setUserInfo: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext<AuthContextValue>(defaultContextValue)

const AuthProvider = function<T = any> ({children, options: initOptions}: AuthProviderProps) {
  const [options, setOptions] = useState<AuthContextOptions>({...initialOptions, ...initOptions})
  const [userInfo, setUserInfo] = useState<T | null>(defaultContextValue.userInfo)
  const [loading, setLoading] = useState<boolean>(defaultContextValue.loading)

  const router = useRouter()

  useEffect(() => {
    (async() => {
      setLoading(true)
      await axios
        .get(options.currentUserUrl)
        .then(response => {
          setLoading(false)
          if(response.data.code === 200) {
            setUserInfo({...response.data.data})
          }
        })
        .catch(() => {
          localStorage.removeItem(options.storageKey)
          setLoading(false)
        })
      setLoading(false)
    })()
  }, [options.currentUserUrl, options.storageKey])

  const handleLogin = (data: any) => {
    return axios.post(options.loginUrl, data)
      .then(() => {
        axios
          .get(options.currentUserUrl)
          .then(async response => {
            const fallback = router.query.fallback
            if(response.data.code === 200) {
              setUserInfo(response.data.data)
              await window.localStorage.setItem(options.storageKey, JSON.stringify(response.data.data))
              const redirectUrl = fallback && fallback !== '/' ? fallback : '/'
              await router.replace(redirectUrl as string)
            }
          })
      })
  }

  const handleLogout = () => {
    return axios.post(options.logoutUrl)
      .then(async () => {
        localStorage.removeItem('userData')
        setUserInfo(null)
        await router.push('/login')
      })
  }

  const handleRegister = (data: any) => {
    return axios.post(options.registerUrl, data)
  }

  return (
    <AuthContext.Provider value={{
      loading,
      userInfo,
      options,
      saveOptions: setOptions,
      setUserInfo,
      login: handleLogin,
      logout: handleLogout,
      register: handleRegister
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}
