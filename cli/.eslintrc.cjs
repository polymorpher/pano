module.exports = {
  env: {
    browser: true,
    node: false,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['compat', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
  },
  rules: {
    'no-await-in-loop': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 1,
    'comma-dangle': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    'new-cap': 0,
    'max-len': 0,
    'promise/always-return': 'off',
    'import/no-cycle': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'import/extensions': 'off',
    'object-curly-newline': ['error', { multiline: true }],
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-misused-promises': 0,
    'react/jsx-indent': ['error', 2],
    '@typescript-eslint/strict-boolean-expressions': 0,
    'react/prop-types': [0],
    'react/button-has-type': 'off',
    'react/jsx-props-no-spreading': [0],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
}
