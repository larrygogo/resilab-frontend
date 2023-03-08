import {ReactElement, ReactNode, useEffect} from "react";
import { useAuth } from "src/@core/hooks/useAuth";
import {useRouter} from "next/router";

type GuestGuardProps = {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.userInfo) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, auth.userInfo])

  if (auth.loading || (!auth.loading && auth.userInfo !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
