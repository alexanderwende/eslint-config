import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import { JSX, SOURCE_TYPE, TS_SOURCE_FILES } from './utils.js';

/**
 * The name of the plugin, used in rule prefixes and needed for custom rules records.
 */
const pluginName = '@typescript-eslint';

/**
 * Enable the recommended rules for TypeScript files.
 *
 * @remarks
 * https://typescript-eslint.io/getting-started/typed-linting
 *
 * @param files - the files to enable typescript linting for
 * @param jsx - enable jsx support
 */
export const configTypeScript = (files: Linter.Config['files'] = TS_SOURCE_FILES, jsx = JSX) => tseslint.config({
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
        parserOptions: {
            projectService: true,
            sourceType: SOURCE_TYPE,
            ecmaFeatures: {
                jsx,
            },
        },
    },
    rules: {
        ...rules,
    },
    files,
});

/**
 * Custom rules for TypeScript files.
 */
export const rules: Linter.RulesRecord = {
    // would be nice to have, but also reports on method calls
    // inside of try/catch blocks which return void
    [`${ pluginName }/no-confusing-void-expression`]: [
        'off',
        {
            ignoreArrowShorthand: true,
            ignoreVoidOperator: true,
        },
    ],
    // allows us to use async functions as event handlers or
    // promise initializers
    [`${ pluginName }/no-misused-promises`]: [
        'error',
        {
            checksVoidReturn: {
                arguments: false,
            },
        },
    ],
};
