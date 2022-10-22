const rootImportPatterns = [
  'lib',
  'services',
  'hooks',
  'ui-kit/*',
  'features/*',
  'pages',
  'constants',
  'constants-translations',
  'schemas',
].flatMap((path) => [
  `**/${path}`, // forbid relative imports
  `!src/${path}`, // allow all absolute imports
  `src/${path}/*`, // forbid absolute imports of private stuff
])

// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // Add this line!
  ],
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'warn',
          {patterns: [...rootImportPatterns, 'src/services']}, // in React components prefer hooks to services
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    "react/display-name": "off",
    'jsx-quotes': [2, 'prefer-single'],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'],
          // side effect imports
          ['^react', '^@?\\w'],
          // 3rd party packages, react comes first
          [
            'src/lib',
            'src/services',
            'src/hooks',
            'src/ui-kit/*',
            'src/constants',
            'src/constants-translations',
            'src',
          ],
          // src folder
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // parent imports, ".." comes last
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // relative imports, same folder and "." imports come last
          ['^.+\\.module.s?css$'],
          // style imports
        ],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/newline-after-import': 'warn',
    'import/no-default-export': 'error',
    'import/no-duplicates': 'warn',
    'import/no-unresolved': 'off', // conflicts with TypeScript
    'import/order': 'off', // simple-import-sort is used
    'no-restricted-imports': ['warn', {patterns: rootImportPatterns}],
  },
}
