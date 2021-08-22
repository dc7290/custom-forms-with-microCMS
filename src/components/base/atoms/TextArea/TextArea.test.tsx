import React from 'react'

import { render } from '~/src/__tests__/utils'

import TextArea from './TextArea'

test('TextArea', () => {
  const { container } = render(<TextArea />)
  expect(container).toMatchSnapshot()
})
