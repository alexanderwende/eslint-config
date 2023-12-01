import type { Linter } from 'eslint';
import { Environment, configEnvironment } from './configs/environment.js';
import { configImport } from './configs/import.js';
import { configJavaScript } from './configs/javascript.js';
import { configStyle } from './configs/style.js';
import { configTypeScript } from './configs/typescript.js';

/**
 * Configuration options for the {@link create} factory method.
 */
export interface ConfigOptions {
    /**
     * Ignore files matching the given glob patterns.
     */
    ignores?: Linter.FlatConfigFileSpec[];
    /**
     * The type of JavaScript source code (defaults to `'module'`).
     */
    sourceType?: Linter.ParserOptions['sourceType'];
    /**
     * The version of ECMAScript to support (defaults to `'latest'`).
     */
    ecmaVersion?: Linter.ParserOptions['ecmaVersion'];
    /**
     * Enable TypeScript support.
     *
     * @remarks
     * If set to `true`, the default TypeScript config will be used. If set to `false`, TypeScript support
     * will be disabled. You can also pass an object to configure the TypeScript config.
     * See {@link configTypeScript} for details.
     */
    typescript?: boolean | {
        /**
         * The project's `tsconfig.json` file (defaults to `'./tsconfig.json'`).
         */
        project?: string | string[] | true;
        /**
         * The files to enable typescript linting for (defaults to `['**\/*.ts', '**\/*.tsx']`).
         */
        files?: Linter.FlatConfigFileSpec[];
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
        files?: Linter.FlatConfigFileSpec[];
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
 * Create a {@link Linter.FlatConfig} array for eslint from the given options.
 *
 * @remarks
 * This is a factory method for creating an eslint config using the new {@link Linter.FlatConfig} format.
 * You can use this method to simplify the creation of your eslint config, or you can use the individual
 * `config*` methods exported from this module to create your own config.
 *
 * @example
 * ```ts
 * // eslint.config.js
 * import { create } from '@alexanderwende/eslint-config';
 *
 * export default create({
 *     sourceType: 'module',
 *     ecmaVersion: 2022,
 *     typescript: {
 *        project: './tsconfig.eslint.json',
 *     },
 * });
 * ```
 *
 * @param options - the options to create the config with
 */
export function create (options?: ConfigOptions): Linter.FlatConfig[] {

    const { ecmaVersion, environments, ignores, sourceType, typescript, style } = options ?? {};

    const configs: Linter.FlatConfig[] = [];

    configs.push(configJavaScript(sourceType, ecmaVersion));

    if (typescript) {

        const { project = undefined, files = undefined } = typeof typescript === 'object' ? typescript : {};

        configs.push(configTypeScript(project, files));
    }

    configs.push(configImport(sourceType, ecmaVersion, !!typescript));

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
