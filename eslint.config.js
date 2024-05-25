import { create } from './dist/index.js';

export default [
    ...create({
        environments: [{ env: 'node' }],
        ecmaVersion: 2022,
        sourceType: 'module',
        typescript: true,
        style: true,
        ignores: [
            'dist/',
            'test/',
        ],
    }),
];
