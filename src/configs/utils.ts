import type { Linter } from 'eslint';
import globals from 'globals';

export const INDENT = 4;

export const QUOTES = 'single';

export const SEMI = true;

export const JSX = false;

export const SOURCE_TYPE = 'module' satisfies Linter.SourceType;

export const ECMA_VERSION = 'latest' satisfies Linter.EcmaVersion;

export const SOURCE_FILES = ['**/*'] satisfies Linter.Config['files'];

export const TS_SOURCE_FILES = ['**/*.ts', '**/*.tsx'] satisfies Linter.Config['files'];

// map of ecma versions to globals keys
const ECMA_GLOBALS = {
    3: 'es5',
    5: 'es5',
    6: 'es2015',
    7: 'es2016',
    8: 'es2017',
    9: 'es2018',
    10: 'es2019',
    11: 'es2020',
    12: 'es2021',
    13: 'es2022',
    14: 'es2023',
    15: 'es2024',
    16: 'es2025',
    2015: 'es2015',
    2016: 'es2016',
    2017: 'es2017',
    2018: 'es2018',
    2019: 'es2019',
    2020: 'es2020',
    2021: 'es2021',
    2022: 'es2023',
    2023: 'es2023',
    2024: 'es2024',
    2025: 'es2025',
    latest: 'es2025',
} satisfies Record<Linter.EcmaVersion, keyof typeof globals>;

export const GLOBALS = globals;

export const getEcmaGlobals = (ecmaVersion: Linter.ParserOptions['ecmaVersion']): Record<string, boolean> => {

    const globalsKey = ECMA_GLOBALS[ecmaVersion ?? 'latest'];

    return GLOBALS[globalsKey];
};
