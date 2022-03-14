module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
        'prettier',
        'import',
        '@typescript-eslint',
    ],
    settings: {
        react: { version: 'detect' },
    },
    rules: {
        'prettier/prettier': 'error',
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'react/display-name': 0,
        'react-hooks/exhaustive-deps': 0, // Disable until find a better alternative
        'space-before-function-paren': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
    },
}
