import type { Linter } from 'eslint';
import globals from 'globals';

export const INDENT = 4;

export const QUOTES = 'single';

export const SEMI = true;

export const SOURCE_TYPE: Linter.ParserOptions['sourceType'] = 'module';

export const ECMA_VERSION: Linter.ParserOptions['ecmaVersion'] = 'latest';

export const SOURCE_FILES: Linter.FlatConfigFileSpec[] = ['**/*'];

export const TS_CONFIG_PATH = './tsconfig.json';

export const TS_SOURCE_FILES: Linter.FlatConfigFileSpec[] = ['**/*.ts', '**/*.tsx'];

export const changeRulesPrefix = (rules: Record<string, unknown>, from: string, to: string) => Object.fromEntries(
    Object.entries(rules).map(([key, value]) => ([
        key.startsWith(from)
            ? to + key.slice(from.length)
            : key,
        value,
    ])),
) as Linter.RulesRecord;

// map of ecma versions to globals keys
const ECMA_GLOBALS = {
    3: 'es5',
    5: 'es5',
    6: 'es2015',
    7: 'es2015',
    8: 'es2017',
    9: 'es2017',
    10: 'es2017',
    11: 'es2020',
    12: 'es2021',
    13: 'es2021',
    14: 'es2021',
    15: 'es2021',
    2015: 'es2015',
    2016: 'es2015',
    2017: 'es2017',
    2018: 'es2017',
    2019: 'es2017',
    2020: 'es2020',
    2021: 'es2021',
    2022: 'es2021',
    2023: 'es2021',
    2024: 'es2021',
    latest: 'es2021',
};

export const GLOBALS = globals as Record<string, Record<string, boolean>>;

export const getEcmaGlobals = (ecmaVersion: Linter.ParserOptions['ecmaVersion']): Record<string, boolean> => {

    const globalsKey = ECMA_GLOBALS[ecmaVersion ?? 'latest'];

    return GLOBALS[globalsKey];
};
