---
to: "<%= is_dynamic_route ? `pages/${path}/[${route_name}].tsx` : `pages/${path}/index.tsx` %>"
---
import type { <% if (is_dynamic_route) { %>GetStaticPaths, <% } %><% if (is_get_static_props) { %>GetStaticProps, <% } %>NextPage } from 'next'
<% if (is_dynamic_route) { %>
export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: false,
  }
}
<% } %>
<% if (is_get_static_props) { %>
type Props = {

}
<% } %>
<% if (is_get_static_props) { %>
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
<% if (is_dynamic_route) { %>  if (params === undefined || typeof params. !== 'string') {
    throw Error('pagesのディレクトリ構造かファイル名が間違っています。')
  }<% } %>

  return {
    props: {},
  }
}
<% } %>
const Page: NextPage<% if (is_get_static_props) { %><Props><% } %> = () => {
  return (
    <>
      <div></div>
    </>
  )
}

export default Page
