module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    // 'semi': ['error', 'always']
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: true
      }
    }]
  }
}
