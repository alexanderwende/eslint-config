import { create } from './dist/index.js';

export default [
    ...create({
        ecmaVersion: 2022,
        sourceType: 'module',
        typescript: {
            files: ['src/**/*.ts'],
        },
        style: true,
        ignores: ['dist/'],
    }),
];
