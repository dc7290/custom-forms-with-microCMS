import React from 'react'

import { render } from '~/src/__tests__/utils'

import TextField from './TextField'

test('TextField', () => {
  const { container } = render(<TextField />)
  expect(container).toMatchSnapshot()
})
