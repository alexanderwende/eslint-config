# @alexanderwende/eslint-config
ESLint config for JavaScript and TypeScript projects using the new `FlatConfig` format.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Features

- Uses the new `FlatConfig` format for easier composability
- Supports TypeScript via [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- Supports stylistic rules via [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic)
- Supports linting imports via [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i)
- Supports environment-specific globals via [globals](https://github.com/sindresorhus/globals)
- Factory method for easy configuration

## Installation

```bash
npm i -D eslint @alexanderwende/eslint-config
```
## Usage

Create a `eslint.config.js` file in the root of your project:

```javascript
// eslint.config.js
import { create } from '@alexanderwende/eslint-config';

export default create({
    typescript: true,
    style: true,
    ignores: [
        'coverage/',
        'dist/',
    ],
});
```

Run eslint from the command line:

```bash
npx eslint .
```

```bash
npx eslint . --fix
```

or add a script to your `package.json`:

```json
// package.json
{
    "scripts": {
        "lint": "eslint ./src",
        "lint:fix": "eslint ./src --fix"
    }
}
```

## Configuration

The `create` factory method accepts an optional configuration object with the following properties:

```typescript
interface ConfigOptions {
    /**
     * Ignore files matching the given glob patterns.
     */
    ignores?: Linter.FlatConfigFileSpec[];
    /**
     * The type of JavaScript source code (defaults to 'module').
     */
    sourceType?: Linter.ParserOptions['sourceType'];
    /**
     * The version of ECMAScript to support (defaults to 'latest').
     */
    ecmaVersion?: Linter.ParserOptions['ecmaVersion'];
    /**
     * Enable TypeScript support.
     *
     * @remarks
     * If set to `true`, the default TypeScript config will be used. 
     * If set to `false`, TypeScript support will be disabled. 
     * You can also pass an object with additional configuration options.
     */
    typescript?: boolean | {
        /**
         * The project's `tsconfig.json` file 
         * (defaults to `'./tsconfig.json'`).
         */
        project?: string | string[] | true;
        /**
         * The files to enable typescript linting for 
         * (defaults to `['**\/*.ts', '**\/*.tsx']`).
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
         * The files to enable the environment for. 
         * If not set, the environment will be enabled for all files.
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
```

## Examples

### Customize Rules

Using the new `FlatConfig` format, you can easily customize rules by adding additional config objects to the array.

```javascript
// eslint.config.js
import { create } from '@alexanderwende/eslint-config';

export default [
    ...create(),
    {
        // with `files`, the rules will only be applied to matching files
        // files: ['some-package/**/*.ts'],
        rules: {
            'typescript/no-useless-constructor': 'off',
        },
    },
];
```

### JavaScript for Node

The following configuration configures eslint to lint all JavaScript files in the working directory, adds Node.js 
specific globals and enables style rules.

```javascript
// eslint.config.js
import { create } from '@alexanderwende/eslint-config';

export default create({
    environments: [{ env: 'node' }],
    style: true,
});
```

### TypeScript for Browser

The following configuration configures eslint to lint all JavaScript and TypeScript files in the working directory, 
adds browser specific globals and enables style rules.

```javascript
// eslint.config.js
import { create } from '@alexanderwende/eslint-config';

export default create({
    environments: [{ env: 'browser' }],
    typescript: true,
    style: true,
});
```

If you want to lint TypeScript files only, simply exclude all JavaScript files:

```javascript
// eslint.config.js
import { create } from '@alexanderwende/eslint-config';

export default create({
    environments: [{ env: 'browser' }],
    typescript: true,
    style: true,
    ignores: [
        '**/*.js',
    ],
});
```

### TypeScript for Node and Browser

When supporting multiple environments in a single repository, you will often need multiple `tsconfig.json` files to make 
the correct libs and types per environment available to TypeScript. With multiple `tsconfig.json` files, the question of
which one to use for linting arises. There are multiple solutions to this problem, check out the 
[typescript-eslint docs](https://typescript-eslint.io/linting/typed-linting/monorepos) for detailed information.

In the following example, we assume that the code for each environment is located in a separate directory, each 
containing a separate `tsconfig.json` file. The `project` option of the `typescript` config allows passing an array of
relative paths (including globs). For each file being linted, the first matching project path will be used as its 
backing `tsconfig.json`:

```javascript
// eslint.config.js
import { create } from '@alexanderwende/eslint-config';

export default create({
    environments: [
        { 
            env: 'browser', 
            files: ['src/app/**/*.ts'],
        },
        { 
            env: 'node', 
            files: ['src/scripts/**/*.ts'],
        },
    ],
    typescript: {
        project: [
            './src/app/tsconfig.json',
            './src/scripts/tsconfig.json',
        ],
        // alternatively as a glob
        // project: ['./src/*/tsconfig.json'],
    }},
    style: true,
    ignores: [
        'dist/',
    ],
});
```
## VSCode Integration

Ensure you have the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
installed.

Update your `.vscode/settings.json` with the following options:

```json
// .vscode/settings.json
{
  // enable the new FlatConfig format
  "eslint.experimental.useFlatConfig": true,

  // if you want eslint to fix and format your code on save:

  // disable the default formatter...
  "editor.formatOnSave": false,

  // ...and enable eslint code actions on save
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
}
```
