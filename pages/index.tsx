import type { GetStaticProps, NextLayoutPage } from 'next'
import Head from 'next/head'

import { Form } from '~/src/components/base/molecules/Form'
import { ErrorFormMessage } from '~/src/components/case/error/ErrorFormMessage'
import { FormType } from '~/src/types/microCMS/Form'
import { getForm } from '~/src/utils/cms/getContents'

type Props = {
  form: FormType
  errors?: string[]
}

const customFieldMap = new Map([
  ['name', 'お名前'],
  ['email', 'メールアドレス'],
  ['tel', '電話番号'],
  ['organization', '会社名'],
  ['postalCodeAndAddress', '郵便番号+住所'],
  ['address', '住所'],
])

export const getStaticProps: GetStaticProps<Props> = async ({ preview, previewData }) => {
  const { form } = await getForm({
    draftKey: preview ? (previewData as { [key: string]: string }).draftKey : undefined,
  })

  if (!preview) {
    return {
      props: { form },
    }
  }

  const fieldIds = form.map(({ fieldId }) => fieldId)

  const isDuplication = new Set(fieldIds).size !== fieldIds.length
  const isDuplicationAddress = fieldIds.includes('postalCodeAndAddress') && fieldIds.includes('address')
  if (!isDuplication && !isDuplicationAddress) {
    return {
      props: { form },
    }
  }

  const errors: string[] = []

  if (isDuplication) {
    const messages = fieldIds
      .map((id) => {
        if (fieldIds.indexOf(id) !== fieldIds.lastIndexOf(id) && customFieldMap.get(id) !== undefined) {
          return `「${customFieldMap.get(id)}」フィールドは複数使用できません。`
        }

        return null
      })
      .filter((message): message is string => typeof message === 'string')

    new Set(messages).forEach((message) => {
      errors.push(message)
    })
  }

  if (isDuplicationAddress) {
    errors.push('「郵便番号+住所」フィールドと「住所」フィールドは併用できません。')
  }

  return {
    props: { form, errors },
  }
}

const IndexPage: NextLayoutPage<Props> = ({ form, errors }) => {
  return (
    <>
      <Head>
        <title>カスタムフォームデモサイト</title>
        <meta name="description" content="microcmsを用いて、フォームをカスタマイズするデモサイト" />
      </Head>
      <div className="py-10">
        <h1 className="text-center text-3xl font-bold">カスタムフォーム(仮)</h1>
        <p className="mt-8 text-center">※スタイルは仮です。自由にカスタマイズできます。</p>
        {errors === undefined || errors.length === 0 ? (
          <Form list={form} className="container mx-auto mt-16 sm:max-w-2xl" />
        ) : (
          <ErrorFormMessage errors={errors} />
        )}
      </div>
    </>
  )
}

export default IndexPage
