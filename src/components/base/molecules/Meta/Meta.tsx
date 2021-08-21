import { NextSeo } from 'next-seo'
import React from 'react'

type Props = {
  title?: string
  description?: string
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

const Meta: React.VFC<Props> = ({ title, description, ogImage, canonical, noindex = false }) => {
  return (
    <NextSeo
      title={`${title ? `${title} | ` : ''}`}
      description={description ?? ''}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/images/favicon.ico',
        },
      ]}
      openGraph={{
        images: [
          {
            url: ogImage ?? '/images/og.png',
          },
        ],
      }}
      twitter={{
        cardType: 'summary_large_image',
      }}
      noindex={noindex}
      canonical={canonical}
    />
  )
}

export default Meta
