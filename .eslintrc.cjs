module.exports = {
  env: {
    'jest/globals': true,
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'prettier', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
  plugins: ['jest'],
}
