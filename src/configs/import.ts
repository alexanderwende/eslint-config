import type { ESLint, Linter } from 'eslint';
import * as pluginImport from 'eslint-plugin-import';
import { ECMA_VERSION, JSX, SOURCE_TYPE } from './utils.js';

// TODO: check back for eslint-import-resolver-typescript
// currently we install the package by installing eslint-plugin-import-x under an alias
// to satisfy this package's peer dependency of eslint-plugin-import

/**
 * The name of the plugin, used in rule prefixes and needed for custom rules records.
 */
const pluginName = 'import-x';

const jsExtensions = ['.js', '.jsx'];
const tsExtensions = ['.ts', '.tsx'];
const allExtensions = [...jsExtensions, ...tsExtensions];

const jsSettings = {
    [`${ pluginName }/extensions`]: jsExtensions,
};

const tsSettings = {
    [`${ pluginName }/extensions`]: allExtensions,
    [`${ pluginName }/external-module-folders`]: [
        'node_modules',
        'node_modules/@types',
    ],
    [`${ pluginName }/parsers`]: {
        '@typescript-eslint/parser': tsExtensions,
    },
    [`${ pluginName }/resolver`]: {
        node: {
            extensions: allExtensions,
        },
        typescript: {},
    },
};

/**
 * Enable the recommended rules for imports.
 *
 * @param sourceType - the type of JavaScript source code
 * @param ecmaVersion - the version of ECMAScript to support
 * @param typescript - enable TypeScript support
 * @param jsx - enable jsx support
 */
export const configImport = (
    sourceType: Linter.SourceType = SOURCE_TYPE,
    ecmaVersion: Linter.EcmaVersion = ECMA_VERSION,
    typescript = false,
    jsx = JSX,
): Linter.Config => ({
    plugins: {
        [pluginName]: pluginImport as unknown as ESLint.Plugin,
    },
    languageOptions: {
        sourceType,
        ecmaVersion,
        parserOptions: {
            sourceType,
            ecmaVersion,
            ecmaFeatures: {
                jsx,
            },
        },
    },
    settings: typescript ? tsSettings : jsSettings,
    rules: {
        ...rules,
    },
});

/**
 * Custom rules for imports.
 */
export const rules: Linter.RulesRecord = {
    'sort-imports': 'off',
    // this would be useful, but leads to false reports in .ts files...
    // in addition, using tsconfig moduleResolution "NodeNext" automatically enforces .js extensions
    // [`${pluginName}/extensions`]: [
    //     'error',
    //     'always',
    //     { ignorePackages: true },
    // ],
    [`${ pluginName }/first`]: 'error',
    // this rule disallows multiple export declarations in one file...
    // [`${ pluginName }/group-exports`]: 'error',
    [`${ pluginName }/newline-after-import`]: 'error',
    [`${ pluginName }/no-absolute-path`]: 'error',
    [`${ pluginName }/no-cycle`]: 'error',
    [`${ pluginName }/no-duplicates`]: 'error',
    [`${ pluginName }/no-empty-named-blocks`]: 'error',
    [`${ pluginName }/no-extraneous-dependencies`]: [
        'error',
        {
            // allow dev dependencies in test files by default (usually we import the test framework)
            devDependencies: [
                '**/*.test.js',
                '**/*.test.jsx',
                '**/*.test.ts',
                '**/*.test.tsx',
                '**/*.spec.js',
                '**/*.spec.jsx',
                '**/*.spec.ts',
                '**/*.spec.tsx',
            ],
            optionalDependencies: false,
            peerDependencies: false,
            includeInternal: true,
            includeTypes: true,
        },
    ],
    [`${ pluginName }/no-relative-packages`]: 'error',
    [`${ pluginName }/no-self-import`]: 'error',
    [`${ pluginName }/no-useless-path-segments`]: 'error',
    [`${ pluginName }/order`]: [
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
