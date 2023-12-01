/* eslint-disable typescript/no-unsafe-member-access */
/* eslint-disable typescript/no-unsafe-assignment */
import { Linter } from 'eslint';
import * as pluginImport from 'eslint-plugin-import';
import { ECMA_VERSION, SOURCE_TYPE } from './utils.js';

/**
 * Enable the recommended rules for imports.
 *
 * @param sourceType - the type of JavaScript source code
 * @param ecmaVersion - the version of ECMAScript to support
 * @param typescript - whether to enable TypeScript rules
 */
export const configImport = (sourceType = SOURCE_TYPE, ecmaVersion = ECMA_VERSION, typescript = false): Linter.FlatConfig => ({
    languageOptions: {
        parserOptions: {
            sourceType,
            ecmaVersion,
        },
    },
    plugins: {
        import: pluginImport,
    },
    settings: {
        ...pluginImport.configs.typescript.settings,
        'import/parsers': {
            ...pluginImport.configs.typescript.settings['import/parsers'],
            espree: ['.js', '.cjs', '.mjs', '.jsx'],

        },
        'import/resolver': {
            ...pluginImport.configs.typescript.settings['import/resolver'],
            typescript: {},
        },
    },
    rules: {
        // load the recommended rules from the plugin
        ...pluginImport.configs.recommended.rules,
        // load the typescript rules from the plugin
        ...(typescript ? pluginImport.configs.typescript.rules : []),
        // load the custom rules
        ...rules,
    },
});

/**
 * Custom rules for imports.
 */
export const rules: Linter.RulesRecord = {
    'sort-imports': 'off',
    // this would be useful, but leads to false reports in .ts files...
    // 'import/extensions': [
    //     'error',
    //     'always',
    //     { ignorePackages: true },
    // ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/order': [
        'error',
        {
            alphabetize: {
                order: 'asc',
            },
            groups: [
                'builtin',
                'external',
                'parent',
                'sibling',
                'index',
            ],
            'newlines-between': 'never',
        },
    ],
};
