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
                    devDependencies: false,
                    optionalDependencies: false,
                    peerDependencies: false,
                    includeInternal: true,
                    // allow type imports from dev dependencies
                    includeTypes: false,
                },
            ],
        },
    },
];
