import type { GetStaticProps, NextLayoutPage } from 'next'

import { ContactForm } from '~/src/components/ContactForm'
import { Form } from '~/src/types/form'
import { getForm } from '~/src/utils/cms/getContents'

type Props = {
  form: Form
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview, previewData }) => {
  const { form } = await getForm({
    draftKey: preview ? (previewData as { [key: string]: string }).draftKey : undefined,
  })

  return {
    props: { form },
  }
}

const IndexPage: NextLayoutPage<Props> = ({ form }) => {
  return (
    <div className="py-10">
      <h1 className="font-bold text-3xl text-center">カスタムフォーム(仮)</h1>
      <p className="mt-8 text-center">※スタイルは仮です。自由にカスタマイズできます。</p>
      <ContactForm list={form} className="container sm:max-w-2xl mt-16 mx-auto" />
    </div>
  )
}

export default IndexPage
