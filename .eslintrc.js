module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'react'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  ignorePatterns: ['**/__tests__/**/*'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'typescript-eslint/prefer-async-await': 'off',
    'prettier/prettier': 0,
    'quotes': [
      'error',
      'single'
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'react/prop-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types':
      'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'args': 'none',
        'ignoreRestSiblings': true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type':
      'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        'variables': false
      }
    ],
    'no-unused-vars': 'off',
    'object-curly-spacing': ['error', 'always'],
    'one-var': 'off',
    'no-multi-assign': 'off',
    'no-nested-ternary': 'off',
    'no-undef': 'off',
    'global-require': 'off',
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'pathGroups': [
        {
          'pattern': '@/*',
          'group': 'internal'
        }
      ],
      'pathGroupsExcludedImportTypes': ['builtin'],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true
      }
    }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-max-props-per-line': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        'declaration': 'parens-new-line',
        'assignment': 'parens-new-line',
        'return': 'parens-new-line',
        'arrow': 'parens-new-line',
        'condition': 'parens-new-line',
        'logical': 'parens-new-line',
        'prop': 'parens-new-line'
      },
    ],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'semi': ['error', 'never']
  }
}
