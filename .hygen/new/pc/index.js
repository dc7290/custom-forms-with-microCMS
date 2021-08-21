module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'path',
        message: 'パスを入力してください。例: pages/about/index.tsx → about',
      },
      {
        type: 'confirm',
        name: 'is_get_static_props',
        message: 'getStaticPropsは使いますか？',
      },
      {
        type: 'confirm',
        name: 'is_dynamic_route',
        message: '動的ルートですか？',
      },
    ]

    return inquirer.prompt(questions).then((answers) => {
      const { is_dynamic_route } = answers
      const questions = []

      if (is_dynamic_route) {
        questions.push({
          type: 'input',
          name: 'route_name',
          message: '動的ルートに用いるIDを入力してください。例: pages/tag/[tagId].tsx → tagId',
        })
      }

      return inquirer.prompt(questions).then((nextAnswers) => Object.assign({}, answers, nextAnswers))
    })
  },
}
