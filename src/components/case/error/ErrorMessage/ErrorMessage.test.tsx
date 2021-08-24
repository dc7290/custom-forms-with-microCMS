import React from 'react'

import { render } from '~/src/__tests__/utils'

import ErrorMessage from './ErrorMessage'

test('ErrorMessage', () => {
  const { container } = render(<ErrorMessage />)
  expect(container).toMatchSnapshot()
})
