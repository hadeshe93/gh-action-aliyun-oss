module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    // "browser": true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {},
  ignorePatterns: ['dist/'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  plugins: [],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
};
