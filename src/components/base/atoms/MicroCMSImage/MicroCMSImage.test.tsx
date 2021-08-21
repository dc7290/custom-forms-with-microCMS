import React from 'react'

import { render } from '~/src/__tests__/utils'

import MicroCMSImage from './MicroCMSImage'

test('MicroCMSImage', () => {
  const { container } = render(<MicroCMSImage src="https://sample.png" width={640} height={360} alt="サンプル" />)
  expect(container).toMatchSnapshot()
})
