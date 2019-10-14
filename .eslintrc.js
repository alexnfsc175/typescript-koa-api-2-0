module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript', // this line does the trick
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        // createDefaultProgram: true, // habilitar a menos que seja realmente necessário
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['prettier', 'eslint-plugin-import-helpers', '@typescript-eslint'],
    rules: {
        'import-helpers/order-imports': [
            'warn',
            {
                // example configuration
                newlinesBetween: 'always',
                groups: ['module', '/^@shared/', ['parent', 'sibling', 'index']],
                alphabetize: { order: 'asc', ignoreCase: true },
            },
        ],

        semi: 0,
        eqeqeq: [1, 'always'],
        quotes: [1, 'single'],
        'jsx-quotes': [2, 'prefer-double'],
        'no-undef': 0,
        'no-console': 1,
        'no-unused-vars': 0,
        'no-mixed-operators': [
            1,
            {
                allowSamePrecedence: true,
            },
        ],
        "require-atomic-updates": 0,
        'eol-last': [2, 'always'],
        'no-confusing-arrow': 0,
        'arrow-parens': [2, 'as-needed'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'arrow-body-style': [2, 'as-needed'],
        'no-extra-parens': [
            'warn',
            'all',
            {
                conditionalAssign: false,
                nestedBinaryExpressions: false,
                ignoreJSX: 'none',
                enforceForArrowConditionals: false,
            },
        ],
        'no-param-reassign': 'error',
        'prefer-template': 0,
        'prefer-promise-reject-errors': 0,
        'no-script-url': 0,
        'prefer-promise-reject-errors': 0,
        'no-unused-expressions': 0,
        'spaced-comment': ['error', 'always'],
        // "dot-notation": 0,

        'import/prefer-default-export': 0,
        'import/no-useless-path-segments': 1,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/no-duplicates': 0,
        'import/order': 0,
        'import/newline-after-import': 1,
        'import/no-named-as-default-member': 0,
        'import/namespace': 0,
        'import/named': 0,

        '@typescript-eslint/indent': 0,
        // '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        // '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    },
};
