import { create } from './dist/index.js';

export default [
    ...create({
        environments: [{ env: 'node' }],
        typescript: true,
        style: true,
        ignores: ['dist/'],
    }),
    {
        rules: {
            'import-x/no-extraneous-dependencies': [
                'error',
                {
                    // allow imports from dev dependencies
                    devDependencies: false,
                    optionalDependencies: false,
                    peerDependencies: false,
                    includeInternal: true,
                    includeTypes: false,
                },
            ],
        },
    },
];
