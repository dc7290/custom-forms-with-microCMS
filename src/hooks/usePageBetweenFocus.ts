import { useRouter } from 'next/router'
import { useEffect } from 'react'

const usePageBetweenFocus = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      const main = document.getElementById('main')
      main?.focus()
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])
}

export default usePageBetweenFocus
