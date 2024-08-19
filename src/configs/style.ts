import pluginStylistic, { type RuleOptions } from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import { INDENT, JSX, QUOTES, SEMI } from './utils.js';

/**
 * The name of the plugin, used in rule prefixes and needed for custom rules records.
 */
const pluginName = '@stylistic';

/**
 * Enable the recommended stylistic rules.
 *
 * @remarks
 * This uses the [`@stylistic/eslint-plugin`](https://github.com/eslint-stylistic/eslint-stylistic) plugin.
 * For more information and rule details visit: https://eslint.style/.
 *
 * @param jsx - enable jsx support
 */
export const configStyle = (jsx = JSX): Linter.Config => {

    // use the customize helper to create a @stylistic config
    const config = pluginStylistic.configs.customize({
        flat: true,
        indent: INDENT,
        quotes: QUOTES,
        semi: SEMI,
        jsx,
    });

    // add our own style rules to it
    config.rules = {
        ...config.rules,
        ...indentRule(config),
        ...rules,
    };

    return config;
};

export const rules: Linter.RulesRecord = {
    [`${ pluginName }/array-bracket-newline`]: [
        'error',
        {
            multiline: true,
        },
    ],
    [`${ pluginName }/array-element-newline`]: [
        'error',
        'consistent',
    ],
    [`${ pluginName }/arrow-parens`]: [
        'error',
        'as-needed',
    ],
    [`${ pluginName }/brace-style`]: [
        'error',
        '1tbs',
        {
            allowSingleLine: true,
        },
    ],
    [`${ pluginName }/function-call-argument-newline`]: [
        'error',
        'consistent',
    ],
    [`${ pluginName }/function-call-spacing`]: [
        'error',
        'never',
    ],
    [`${ pluginName }/function-paren-newline`]: [
        'error',
        'multiline-arguments',
    ],
    [`${ pluginName }/generator-star-spacing`]: 'error',
    [`${ pluginName }/implicit-arrow-linebreak`]: 'error',
    [`${ pluginName }/linebreak-style`]: 'error',
    [`${ pluginName }/member-delimiter-style`]: [
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
    [`${ pluginName }/object-curly-newline`]: [
        'error',
        {
            consistent: true,
            multiline: true,
        },
    ],
    [`${ pluginName }/object-property-newline`]: [
        'error',
        {
            allowAllPropertiesOnSameLine: true,
        },
    ],
    // this rule forces padding at the beginning and end of blocks
    // padding at the end of blocks looks bad, so we disable it
    // to allow padding at the beginning but not force it at the end
    [`${ pluginName }/padded-blocks`]: [
        'off',
        'always',
        {
            allowSingleLineBlocks: true,
        },
    ],
    [`${ pluginName }/quote-props`]: [
        'error',
        'as-needed',
    ],
    [`${ pluginName }/semi-style`]: [
        'error',
        'last',
    ],
    [`${ pluginName }/space-before-function-paren`]: [
        'error',
        'always',
    ],
    [`${ pluginName }/spaced-comment`]: [
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
    [`${ pluginName }/switch-colon-spacing`]: [
        'error', {
            after: true,
            before: false,
        },
    ],
    [`${ pluginName }/template-curly-spacing`]: [
        'error',
        'always',
    ],
};

/**
 * Extend `@stylistic`s indent rule to ignore indentation within template literals.
 * We use template literals for custom element templates and we need a bit of
 * flexibility when indenting ternary expressions. We don't want to rewrite the
 * rule (it's pretty complex), to be able to update `@stylistic` and receive rule
 * updates.
 */
const indentRule = (config: Linter.Config): Linter.RulesRecord | undefined => {

    const rule = config.rules?.[`${ pluginName }/indent`];

    if (!rule) return undefined;

    const [severity, ...options] = rule as Linter.RuleSeverityAndOptions<RuleOptions['@stylistic/indent']>;
    const [indent, rest] = options as RuleOptions['@stylistic/indent'];

    const merged: RuleOptions['@stylistic/indent'][1] = {
        ...rest,
        ignoredNodes: [
            ...(rest?.ignoredNodes ?? []),
            'TemplateLiteral *',
        ],
    };

    return {
        [`${ pluginName }/indent`]: [
            severity,
            indent,
            merged,
        ],
    };
};
