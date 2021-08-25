import React from 'react'

import { render } from '~/src/__tests__/utils'

import DateField from './DateField'

test('DateField', () => {
  const { container } = render(<DateField />)
  expect(container).toMatchSnapshot()
})
