---
to: src/components/<%= component_type %>/<% if (typeof base_type !== 'undefined') { %><%= base_type %>/<% } %><% if (typeof component_path !== 'undefined') { %><%= h.changeCase.lower(component_path) %>/<% } %><%= component_name %>/<%= component_name %>.tsx
---
import clsx from 'clsx'

type Props = {
  className?: string
}

const <%= component_name %> = ({ className }: Props) => {
  return (
    <div className={clsx(className, '')}>

    </div>
  )
}

export default <%= component_name %>
