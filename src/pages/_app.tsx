import {Fragment, ReactNode} from 'react'
import Head from 'next/head'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {TemplateConsumer, LayoutProvider} from 'src/@core/context/LayoutContext'
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'
import {CacheProvider, EmotionCache} from "@emotion/react";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import AclGuard from "src/@core/components/auth/AclGuard";
import UserLayout from "src/layouts/UserLayout";
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import Spinner from 'src/@core/components/spinner'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import {AuthProvider} from "src/@core/context/AuthContext";
import WindowWrapper from "src/@core/components/window-wrapper";
import {Router} from "next/router";
import NProgress from 'nprogress'
import {LayoutPageProps} from "src/@core/layouts/types";
import {defaultAbility} from "src/configs/acl";
import 'styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & LayoutPageProps

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

const Guard = ({children, authGuard, guestGuard}: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner/>}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner/>}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultAbility

  return (
    <CacheProvider value={emotionCache}>
      <AuthProvider>
          <LayoutProvider>
            <TemplateConsumer>
              {({config}) => {
                import('src/configs/i18n')
                return (
                  <Fragment>
                    <ThemeComponent config={config}>
                      <WindowWrapper>
                        <Head>
                          <title>Hello Dashboard</title>
                          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template'/>
                          <meta name='viewport' content='initial-scale=1, width=device-width'/>
                        </Head>
                        <Guard authGuard={authGuard} guestGuard={guestGuard}>
                          <AclGuard guestGuard={guestGuard} aclAbilities={aclAbilities}>
                            {getLayout(<Component {...pageProps} />)}
                          </AclGuard>
                        </Guard>
                      </WindowWrapper>
                    </ThemeComponent>
                  </Fragment>
                )
              }}
            </TemplateConsumer>
          </LayoutProvider>
      </AuthProvider>
    </CacheProvider>
  )
}

export default App
