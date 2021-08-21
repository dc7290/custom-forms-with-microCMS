---
to: src/components/<%= component_type %>/<% if (typeof base_type !== 'undefined') { %><%= base_type %>/<% } %><% if (typeof component_path !== 'undefined') { %><%= h.changeCase.lower(component_path) %>/<% } %><%= component_name %>/index.ts
---
export { default as <%= component_name %> } from './<%= component_name %>'
