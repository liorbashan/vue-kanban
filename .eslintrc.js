// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 6,
        requireConfigFile: false,
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
    ],
    // required to lint *.vue files
    plugins: ['vue'],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 0,
        quotes: 0,
        semi: 0,
        'space-before-function-paren': 0,
        indent: 0,
        'function-paren-newline': ['error', 'never'],
        'no-undef': 0,
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: [],
            },
        ],
        'vue/no-reserved-component-names': [
            'error',
            {
                disallowVueBuiltInComponents: false,
                disallowVue3BuiltInComponents: false,
            },
        ],
    },
};
