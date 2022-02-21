import { ReactNode } from 'react'

export type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  // {/* <Header /> */}
  <main id="main">{children}</main>
  // {/* <Footer /> */}
)

export default Layout
