module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: 'コンポーネントの名前を入力してください。',
      },
      {
        type: 'select',
        name: 'component_type',
        message: 'コンポーネントのタイプを選択してください。',
        choices: ['base', 'case', 'domain', 'layout'],
      },
    ]

    return inquirer.prompt(questions).then((answers) => {
      const { component_type } = answers
      const questions = []

      if (component_type === 'base') {
        questions.push({
          type: 'select',
          name: 'base_type',
          message: 'コンポーネントはatomsですか？それともmoleculesですか',
          choices: ['atoms', 'molecules'],
        })
      }

      if (component_type === 'case' || component_type === 'domain') {
        questions.push({
          type: 'input',
          name: 'component_path',
          message: 'コンポーネントの接頭辞を入力してください。例: InterviewCard → interviewを入力',
        })
      }

      return inquirer.prompt(questions).then((nextAnswers) => Object.assign({}, answers, nextAnswers))
    })
  },
}
