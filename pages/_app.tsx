import '~/src/styles/index.css'
import 'focus-visible'

import { AppProps } from 'next/app'

import { Layout } from '~/src/components/layout/Layout'
import usePageBetweenFocus from '~/src/hooks/usePageBetweenFocus'
import useWindowNarrow from '~/src/hooks/useWindowNarrow'

// Google Analytics を使うとき
// import Script from 'next/script'
// import usePageView from '~/src/hooks/usePageView'
// import { GA_ID } from '~/src/utils/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  useWindowNarrow()
  usePageBetweenFocus()
  // Google Analytics を使うとき
  // usePageView()

  return (
    <>
      {/* {GA_ID !== undefined && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
          <Script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });`,
            }}
          />
        </>
      )} */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
