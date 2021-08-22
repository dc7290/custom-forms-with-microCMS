import React from 'react'

import { render } from '~/src/__tests__/utils'

import SubmitButton from './SubmitButton'

test('SubmitButton', () => {
  const { container } = render(<SubmitButton />)
  expect(container).toMatchSnapshot()
})
