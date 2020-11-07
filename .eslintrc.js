const path = require('path')
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks', 'jest', 'jest-dom'],
  extends: [
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: path.resolve(__dirname, './tsconfig.eslint.json')
  },
  rules: {
    "react/display-name": "off", 
    "react/prop-types":"off"
  },
  settings: {
    "react": {
      "version": "detect"
    }
  }
}