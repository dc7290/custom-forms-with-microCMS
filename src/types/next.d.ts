/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextComponentType, NextPage, NextPageContext, NextLayoutComponentType } from 'next'
import type { AppProps } from 'next/app'

import { LayoutProps } from '../components/Layout'

declare module 'next' {
  type NextLayoutComponentType<P = {}> = NextComponentType<NextPageContext, any, P> & {
    layoutProps?: LayoutProps | ((props: P) => LayoutProps)
  }
  type NextLayoutPage<P = {}> = NextPage<P> & {
    layoutProps?: LayoutProps | ((props: P) => LayoutProps)
  }
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponentType<P>
  }
}
