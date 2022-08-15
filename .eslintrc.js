module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 12,
    },
    env: {
        node: true,
        es6: true,
        browser: false,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
