/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:storybook/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/padding-line-between-tags': [
      'error',
      [
        { blankLine: 'always', prev: '*', next: '*' },
        { blankLine: 'never', prev: 'b', next: '*' }
      ]
    ]
  }
}
