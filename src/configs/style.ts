import pluginStylistic from '@stylistic/eslint-plugin';
import type { ESLint, Linter } from 'eslint';
import { INDENT, QUOTES, SEMI } from './utils.js';

/**
 * Customize the plugin name for nicer rules prefixes.
 */
const pluginName = 'style';

/**
 * Enable the recommended stylistic rules.
 *
 * @remarks
 * This uses the [`@stylistic/eslint-plugin`](https://github.com/eslint-stylistic/eslint-stylistic) plugin.
 *
 * For more information and rule details visit: https://eslint.style/.
 */
export const configStyle = (): Linter.FlatConfig => ({
    plugins: {
        style: pluginStylistic as ESLint.Plugin,
    },
    rules: {
        // load the recommended rules from the plugin
        ...pluginStylistic.configs.customize({
            indent: INDENT,
            quotes: QUOTES,
            semi: SEMI,
            jsx: false,
            pluginName,
        }).rules as Linter.RulesRecord,
        // load the custom rules
        ...rules,
    },
});

export const rules: Linter.RulesRecord = {
    'style/array-bracket-newline': [
        'error',
        {
            multiline: true,
        },
    ],
    'style/array-element-newline': [
        'error',
        'consistent',
    ],
    'style/arrow-parens': [
        'error',
        'as-needed',
    ],
    'style/brace-style': [
        'error',
        '1tbs',
        {
            allowSingleLine: true,
        },
    ],
    'style/function-call-argument-newline': [
        'error',
        'consistent',
    ],
    'style/function-call-spacing': [
        'error',
        'never',
    ],
    'style/function-paren-newline': [
        'error',
        'multiline-arguments',
    ],
    'style/generator-star-spacing': 'error',
    'style/indent': [
        'error',
        INDENT,
        {
            ArrayExpression: 1,
            CallExpression: { arguments: 1 },
            FunctionDeclaration: { body: 1, parameters: 1 },
            FunctionExpression: { body: 1, parameters: 1 },
            ImportDeclaration: 1,
            MemberExpression: 1,
            ObjectExpression: 1,
            flatTernaryExpressions: false,
            offsetTernaryExpressions: false,
            outerIIFEBody: 1,
            SwitchCase: 1,
            VariableDeclarator: 1,
            ignoreComments: false,
            ignoredNodes: [
                'TemplateLiteral *',
                'JSXElement',
                'JSXElement > *',
                'JSXAttribute',
                'JSXIdentifier',
                'JSXNamespacedName',
                'JSXMemberExpression',
                'JSXSpreadAttribute',
                'JSXExpressionContainer',
                'JSXOpeningElement',
                'JSXClosingElement',
                'JSXFragment',
                'JSXOpeningFragment',
                'JSXClosingFragment',
                'JSXText',
                'JSXEmptyExpression',
                'JSXSpreadChild',
                'TSUnionType',
                'TSIntersectionType',
                'TSTypeParameterInstantiation',
                'FunctionExpression > .params[decorators.length > 0]',
                'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
            ],
        },
    ],
    'style/implicit-arrow-linebreak': 'error',
    'style/linebreak-style': 'error',
    'style/member-delimiter-style': [
        'error',
        {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: false,
            },
            multilineDetection: 'brackets',
        },
    ],
    'style/object-curly-newline': [
        'error',
        {
            consistent: true,
            multiline: true,
        },
    ],
    'style/object-property-newline': [
        'error',
        {
            allowAllPropertiesOnSameLine: true,
        },
    ],
    // this rule forces padding at the beginning and end of blocks
    // padding at the end of blocks looks bad, so we disable it
    // to allow padding at the beginning but not force it at the end
    'style/padded-blocks': [
        'off',
        'always',
        {
            allowSingleLineBlocks: true,
        },
    ],
    'style/quote-props': [
        'error',
        'as-needed',
    ],
    'style/semi-style': [
        'error',
        'last',
    ],
    'style/space-before-function-paren': [
        'error',
        'always',
    ],
    'style/spaced-comment': [
        'error',
        'always',
        {
            block: {
                balanced: true,
                exceptions: ['*'],
                markers: ['!'],
            },
            line: {
                exceptions: ['/', '#', '-'],
                markers: ['/', '#'],
            },
        },
    ],
    'style/switch-colon-spacing': [
        'error', {
            after: true,
            before: false,
        },
    ],
    'style/template-curly-spacing': [
        'error',
        'always',
    ],
};
