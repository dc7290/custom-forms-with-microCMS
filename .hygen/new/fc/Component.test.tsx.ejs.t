---
to: src/components/<%= component_type %>/<% if (typeof base_type !== 'undefined') { %><%= base_type %>/<% } %><% if (typeof component_path !== 'undefined') { %><%= h.changeCase.lower(component_path) %>/<% } %><%= component_name %>/<%= component_name %>.test.tsx
---
import React from 'react'

import { render } from '~/src/__tests__/utils'

import <%= component_name %> from './<%= component_name %>'

test('<%= component_name %>', () => {
  const { container } = render(<<%= component_name %> />)
  expect(container).toMatchSnapshot()
})
