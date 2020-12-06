module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'max-len': ['error', { code: 100 }],
    'prefer-promise-reject-errors': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['warn'],
    'no-return-assign': ['off'],
    'react/jsx-closing-bracket-location': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-cycle': 0,
    'object-curly-newline': 0,
    'no-unused-expressions': 0,
    'react/jsx-wrap-multilines': 0,
    'react/forbid-prop-types': 0,
    indent: 0,
    'implicit-arrow-linebreak ': 0,
    'operator-linebreak': 0,
    'react/jsx-one-expression-per-line': 0,
  },
};
