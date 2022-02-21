type Props = {
  errors: string[]
}

const ErrorFormMessage = ({ errors }: Props) => {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-white/80" />
      <div className="absolute inset-x-0 top-52 m-auto w-4/5 max-w-lg bg-white p-10 shadow-[0_0_16px_rgba(0,0,0,0.16)]">
        フォーム生成中にエラーが発生しました。
        <br />
        以下のエラー内容を参考に、管理画面で修正をお願いします。
        <br />
        その後、もういちど画面プレビューをお試しください。
        <ul className="mt-10 list-disc text-red-600">
          {errors.map((message) => (
            <li key={message}>
              <p role="alert">{message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ErrorFormMessage
