---
to: src/components/<%= component_type %>/<% if (typeof base_type !== 'undefined') { %><%= base_type %>/<% } %><% if (typeof component_path !== 'undefined') { %><%= h.changeCase.lower(component_path) %>/<% } %><%= component_name %>/<%= component_name %>.tsx
---
import React from 'react'

type Props = {

}

const <%= component_name %> = ({  }: Props) => {
  return (
  )
}

export default <%= component_name %>
