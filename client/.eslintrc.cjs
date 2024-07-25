module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',

    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',

    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',

    'plugin:import-x/recommended',
    'plugin:import-x/typescript',

    'plugin:tailwindcss/recommended',

    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'import-x',
    'react',
    'react-refresh',
    'unused-imports',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    'import-x/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: true,
    },
  },

  ignorePatterns: [
    '.eslintrc.cjs',
    '.prettierrc.cjs',
    'dist',
    'postcss.config.js',
    'tailwind.config.json',
  ],

  rules: {
    // React
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // turn on errors for missing imports
    'import-x/default': 'warn',
    'import-x/no-cycle': 'warn',
    'import-x/no-self-import': 'warn',
    'import-x/no-unassigned-import': [
      'warn',
      {
        allow: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less'],
      },
    ],
    'import-x/no-useless-path-segments': 'warn',

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        // allowBoolean: true,
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],

    // unused import
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
