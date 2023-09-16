module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 'off',
    'no-restricted-syntax': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'guard-for-in': 'off',
    'no-use-before-define': 'off',
    'max-len': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-expressions': 'off',

  },
};
