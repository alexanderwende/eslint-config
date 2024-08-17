import type { TSESLint } from '@typescript-eslint/utils';
import type { Linter } from 'eslint';
import { Environment, configEnvironment } from './configs/environment.js';
import { configImport } from './configs/import.js';
import { configJavaScript } from './configs/javascript.js';
import { configStyle } from './configs/style.js';
import { configTypeScript } from './configs/typescript.js';

export type Config = Linter.Config | TSESLint.FlatConfig.Config;

/**
 * Configuration options for the {@link create} factory method.
 */
export interface ConfigOptions {
    /**
     * Ignore files matching the given glob patterns.
     */
    ignores?: Linter.Config['ignores'];
    /**
     * The type of JavaScript source code (defaults to `'module'`).
     */
    sourceType?: Linter.ParserOptions['sourceType'];
    /**
     * The version of ECMAScript to support (defaults to `'latest'`).
     */
    ecmaVersion?: Linter.ParserOptions['ecmaVersion'];
    /**
     * Enable jsx support.
     */
    jsx?: boolean;
    /**
     * Enable TypeScript support.
     *
     * @remarks
     * If set to `true`, TypeScript will be enabled for all `.ts` files in the project. If set to `false`,
     * TypeScript support will be disabled. You can also pass an object to configure TypeScript support.
     * See {@link configTypeScript} for details.
     */
    typescript?: boolean | {
        /**
         * The files to enable typescript linting for (defaults to `['**\/*.ts', '**\/*.tsx']`).
         */
        files?: Linter.Config['files'];
    };
    /**
     * Enable environment-specific globals for matching files.
     */
    environments?: {
        /**
         * The environment to enable (i.e. 'browser', 'node' or 'worker').
         */
        env: Environment;
        /**
         * The files to enable the environment for. If not set, the environment will be enabled for all files.
         */
        files?: Linter.Config['files'];
    }[];
    /**
     * Enable style rules.
     *
     * @remarks
     * Use this option if you want to use eslint to enforce code style and formatting.
     * Not recommended if you are using an external formatter, like prettier.
     */
    style?: boolean;
}

/**
 * Create a {@link Config} array for eslint from the given options.
 *
 * @remarks
 * This is a factory method for creating an eslint config using the new {@link Linter.Config} format.
 * You can use this method to simplify the creation of your eslint config, or you can use the individual
 * `config*` methods exported from this module to create your own config.
 *
 * @example
 * ```ts
 * // eslint.config.js
 * import { create } from '@alexwende/eslint-config';
 *
 * export default create({
 *     environments: { env: 'node' },
 *     ecmaVersion: 2022,
 *     typescript: true,
 *     style: true,
 *     ignores: ['dist/']
 * });
 * ```
 *
 * @param options - the options to create the config with
 */
export function create (options?: ConfigOptions): Config[] {

    const { ecmaVersion, environments, ignores, jsx, sourceType, typescript, style } = options ?? {};

    const configs: (Linter.Config | TSESLint.FlatConfig.Config)[] = [];

    configs.push(configJavaScript(sourceType, ecmaVersion));

    if (typescript) {

        const { files = undefined } = typeof typescript === 'object' ? typescript : {};

        configs.push(...configTypeScript(files, jsx));
    }

    configs.push(configImport(sourceType, ecmaVersion, !!typescript, jsx));

    if (style) {

        configs.push(configStyle());
    }

    if (environments) {

        for (const { env, files } of environments) {

            configs.push(configEnvironment(env, files));
        }
    }

    if (ignores) {

        configs.push({ ignores });
    }

    return configs;
}

/**
 * The individual config methods exported from this module.
 */
export const configs = {
    javascript: configJavaScript,
    typescript: configTypeScript,
    import: configImport,
    style: configStyle,
    environment: configEnvironment,
};

/**
 * The default export of this module.
 *
 * @remarks
 * Contains the factory method {@link create} and all individual config methods.
 */
export default {
    create,
    ...configs,
};
