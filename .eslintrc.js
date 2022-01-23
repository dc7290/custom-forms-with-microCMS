module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    // 関数の引数や返り値に必ず型をつけるルールを off にする
    // アプリケーションをより堅牢にしたい場合は、このルールを on にしてください
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 未使用の変数がある場合エラーにする（デフォルトは warning）
    '@typescript-eslint/no-unused-vars': 'error',
    // named-exportを許可
    'import/prefer-default-export': 'off',
    // 絶対パスでのモジュールの読み込みをokにする
    'import/no-unresolved': 'off',
    // importの順番を整理する
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    // if文内のcontinueをokにする
    'no-continue': 'off',
    // for (const a of A) を許可
    'no-restricted-syntax': 'off',
    // onClick={e => handleClick(e)} で引っかかるため無効化
    'jsx-no-lambda': 'off',
    // <Component {...props}>を許可する
    'react/jsx-props-no-spreading': 'off',
    // console.errorを許容する
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // next/imageを使わないことを許容する
    '@next/next/no-img-element': 0,
  },
}
