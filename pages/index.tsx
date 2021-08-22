import type { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TextArea } from '~/src/components/base/atoms/TextArea'
import { TextField } from '~/src/components/base/atoms/TextField'
import { SubmitButton } from '~/src/components/case/submit/SubmitButton'

type FormValues = {
  name: string
  body: string
}

const IndexPage: NextPage = () => {
  const { handleSubmit, formState, register } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  register('name')

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-28">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[600px] grid grid-cols-1 gap-4">
        <TextField
          id="name"
          label="名前"
          errors={formState.errors}
          isRequired
          {...register('name', { required: 'こちらは必須となります。お手数ですが、ご入力をお願いします。' })}
        />
        <TextArea
          id="body"
          label="お問い合わせ内容"
          errors={formState.errors}
          isRequired
          {...register('body', { required: 'こちらは必須となります。お手数ですが、ご入力をお願いします。' })}
        />
        <SubmitButton className="mt-10 mx-auto">送信する</SubmitButton>
      </form>
    </div>
  )
}

export default IndexPage
