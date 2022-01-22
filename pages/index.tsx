import type { GetStaticProps, NextLayoutPage } from 'next'
import Head from 'next/head'

import { ContactForm } from '~/src/components/ContactForm'
import { Form } from '~/src/types/form'
import { getForm } from '~/src/utils/cms/getContents'

type Props = {
  form: Form
  error: string[] | null
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
      props: { form, error: null },
    }
  }

  const fieldIds = form.map(({ fieldId }) => fieldId)

  const isDuplication = new Set(fieldIds).size !== fieldIds.length
  const isDuplicationAddress = fieldIds.includes('postalCodeAndAddress') && fieldIds.includes('address')
  if (!isDuplication && !isDuplicationAddress) {
    return {
      props: { form, error: null },
    }
  }

  const error: string[] = []

  if (isDuplication) {
    const messages = fieldIds
      .map((id) => {
        if (fieldIds.indexOf(id) !== fieldIds.lastIndexOf(id)) {
          return `「${customFieldMap.get(id)}」フィールドは複数使用できません。`
        }

        return null
      })
      .filter((message): message is string => typeof message === 'string')

    new Set(messages).forEach((message) => {
      error.push(message)
    })
  }

  if (isDuplicationAddress) {
    error.push('「郵便番号+住所」フィールドと「住所」フィールドは併用できません。')
  }

  return {
    props: { form, error },
  }
}

const IndexPage: NextLayoutPage<Props> = ({ form, error }) => {
  return (
    <>
      <Head>
        <title>カスタムフォーム</title>
        <meta name="description" content="Zennの記事「microCMSを使ってフォーム作成アプリを作る」のデモサイトです。" />
      </Head>
      <div className="py-10">
        <h1 className="font-bold text-3xl text-center">カスタムフォーム</h1>
        <p className="mt-8 text-center">※スタイルは仮です。自由にカスタマイズできます。</p>
        {error === null ? (
          <ContactForm list={form} className="container sm:max-w-2xl mt-16 mx-auto" />
        ) : (
          <div className="fixed z-50 inset-0">
            <div className="absolute inset-0 bg-white/80" />
            <div className="absolute inset-x-0 top-52 m-auto w-4/5 max-w-lg p-10 bg-white shadow-[0_0_16px_rgba(0,0,0,0.16)]">
              フォーム生成中にエラーが発生しました。
              <br />
              以下のエラー内容を参考に、管理画面で修正をお願いします。
              <br />
              その後、もういちど画面プレビューをお試しください。
              <ul className="mt-10 text-red-600 list-disc">
                {error.map((message) => (
                  <li key={message}>
                    <p role="alert">{message}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default IndexPage
