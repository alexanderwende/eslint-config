import type { Linter } from 'eslint';
import { GLOBALS, SOURCE_FILES } from './utils.js';

export type Environment = 'browser' | 'node' | 'worker' | 'serviceworker';

/**
 * Enable environment-specific globals for matching files.
 *
 * @param env - the environment to enable
 * @param files - the files to enable the environment for
 */
export const configEnvironment = (env: Environment, files: Linter.Config['files'] = SOURCE_FILES): Linter.Config => {

    const key = env === 'node'
        ? 'nodeBuiltin'
        : env;

    return {
        files,
        languageOptions: {
            globals: {
                ...GLOBALS[key],
            },
        },
    };
};
