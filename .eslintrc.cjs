/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ignores: ['src/widget/*', 'public/*'],
  },
  rules: {
    semi: ['warn', 'never'],
    'comma-dangle': ['warn', 'only-multiline'],
    'eol-last': ['error', 'always'],
    quotes: ['warn', 'single', { 'allowTemplateLiterals': true }],
  }
}
