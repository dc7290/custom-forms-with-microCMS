import '~/src/styles/index.css'
import 'focus-visible'

import { AppProps } from 'next/app'
import { SSRProvider } from 'react-aria'

import { Layout } from '~/src/components/layout/Layout'
import usePageBetweenFocus from '~/src/hooks/usePageBetweenFocus'
import useWindowNarrow from '~/src/hooks/useWindowNarrow'

function MyApp({ Component, pageProps }: AppProps) {
  useWindowNarrow()
  usePageBetweenFocus()

  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
