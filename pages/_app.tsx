import '~/src/styles/index.css'
import 'scroll-behavior-polyfill'
import 'focus-visible'

import { SSRProvider } from '@react-aria/ssr'
import { AppLayoutProps } from 'next/app'

import { Layout } from '~/src/components/Layout'

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const layoutProps =
    typeof Component.layoutProps === 'function' ? Component.layoutProps(pageProps) : Component.layoutProps

  return (
    <SSRProvider>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
