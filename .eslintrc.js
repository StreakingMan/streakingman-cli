module.exports = {
    parserOptions: {
        ecmaVersion: 11,
    },
    env: {
        es6: true,
    },
    plugins: ['eslint-plugin-prettier'],
    extends: ['plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': 'error',
    },
};
