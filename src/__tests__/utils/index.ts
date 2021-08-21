import { queries, render, RenderOptions } from '@testing-library/react'

const customRender = (ui: JSX.Element, options?: Omit<RenderOptions<typeof queries, HTMLElement>, 'queries'>) => {
  return render(ui, options)
}

export { customRender as render }
