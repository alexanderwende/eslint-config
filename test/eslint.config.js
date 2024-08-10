import { create } from '../dist/index.js';

export default [
    ...create({
        environments: [{ env: 'browser' }],
        ecmaVersion: 2022,
        typescript: true,
        style: true,
    }),
];
