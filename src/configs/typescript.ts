// import pluginTypeScript from '@typescript-eslint/eslint-plugin';
// import parserTypeScript from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import pluginTypeScript from 'typescript-eslint';
import { JSX, SOURCE_TYPE, TS_CONFIG_PATH, TS_SOURCE_FILES } from './utils.js';

/**
 * Customize the plugin name for nicer rules prefixes.
 */
// const pluginName = 'typescript';
const pluginName = '@typescript-eslint';

/**
 * Enable the recommended rules for TypeScript files.
 *
 * @remarks
 * https://typescript-eslint.io/linting/typed-linting#specifying-tsconfigs
 *
 * @param project - the project's `tsconfig.json` file
 * @param files - the files to enable typescript linting for
 */
// export const configTypeScript = (project: string | string[] | true = [TS_CONFIG_PATH], files = TS_SOURCE_FILES): Linter.FlatConfig => ({
//     files,
//     languageOptions: {
//         parser: parserTypeScript as Linter.ParserModule,
//         parserOptions: {
//             sourceType: SOURCE_TYPE,
//             project,
//         },
//     },
//     plugins: {
//         [pluginName]: pluginTypeScript as unknown as ESLint.Plugin,
//     },
//     rules: {
//         // load the recommended rules from the plugin
//         ...changeRulesPrefix(
//             // eslint-disable-next-line typescript/no-non-null-assertion
//             pluginTypeScript.configs['eslint-recommended'].overrides![0].rules!,
//             '@typescript-eslint',
//             pluginName,
//         ),
//         // load the strict rules from the plugin with type-checking
//         ...changeRulesPrefix(
//             // eslint-disable-next-line typescript/no-non-null-assertion
//             pluginTypeScript.configs['strict-type-checked'].rules!,
//             '@typescript-eslint',
//             pluginName,
//         ),
//         // load the custom rules
//         ...rules,
//     },
// });

export const configTypeScript = (
    project: string | string[] | true = [TS_CONFIG_PATH],
    files = TS_SOURCE_FILES,
    jsx = JSX,
) => pluginTypeScript.config({
    files,
    plugins: {
        [pluginName]: pluginTypeScript.plugin,
    },
    languageOptions: {
        parser: pluginTypeScript.parser,
        parserOptions: {
            project,
            sourceType: SOURCE_TYPE,
            ecmaFeatures: {
                jsx,
            },
        },
    },
    extends: [
        ...pluginTypeScript.configs.recommended,
        ...pluginTypeScript.configs.strictTypeChecked,
    ],
    rules: {
        ...rules,
    }
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
