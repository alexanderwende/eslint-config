import pluginJavaScript from '@eslint/js';
import type { Linter } from 'eslint';
import { ECMA_VERSION, JSX, SOURCE_TYPE, getEcmaGlobals } from './utils.js';

/**
 * Enable the recommended rules for JavaScript files.
 *
 * @param sourceType - the type of JavaScript source code
 * @param ecmaVersion - the version of ECMAScript to support
 * @param jsx - enable jsx support
 */
export const configJavaScript = (
    sourceType: Linter.SourceType = SOURCE_TYPE,
    ecmaVersion: Linter.EcmaVersion = ECMA_VERSION,
    jsx = JSX,
): Linter.Config => ({
    languageOptions: {
        sourceType,
        ecmaVersion,
        globals: {
            ...getEcmaGlobals(ecmaVersion),
        },
        parserOptions: {
            ecmaVersion,
            sourceType,
            ecmaFeatures: {
                jsx,
            },
        },
    },
    linterOptions: {
        reportUnusedDisableDirectives: true,
    },
    rules: {
        // load the recommended rules from the plugin
        ...pluginJavaScript.configs.recommended.rules,
        // load the custom rules
        ...rules,
    },
});

/**
 * Custom rules for JavaScript files.
 */
export const rules: Linter.RulesRecord = {
    'no-new-wrappers': 'error',
    'no-useless-constructor': 'error',
    'no-var': 'error',
    'object-shorthand': 'warn',
};
