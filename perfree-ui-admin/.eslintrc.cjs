/* eslint-env node */

module.exports = {
  root: true,
  extends: ['@zclzone', '.eslint-global-variables.json'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-for': 'off',
  },
}
