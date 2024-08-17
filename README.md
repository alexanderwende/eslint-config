# @alexwende/eslint-config
ESLint config for JavaScript and TypeScript projects using the new `FlatConfig` format.


[![npm (scoped)](https://img.shields.io/npm/v/%40alexwende/eslint-config?color=limegreen&logo=npm)](https://www.npmjs.com/package/@alexwende/eslint-config)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Features

- Uses the new `FlatConfig` format for easier composability
- Supports TypeScript via [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- Supports stylistic rules via [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic)
- Supports linting imports via [eslint-plugin-import-x](https://github.com/antfu/eslint-plugin-import-x)
- Supports environment-specific globals via [globals](https://github.com/sindresorhus/globals)
- Factory method for easy configuration

## Installation

```bash
npm i -D eslint @alexwende/eslint-config
```
## Usage

Create a `eslint.config.js` file in the root of your project:

```javascript
// eslint.config.js
import { create } from '@alexwende/eslint-config';

export default create({
    typescript: true,
    style: true,
    ignores: [
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

```jsonc
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
export interface ConfigOptions {
    /**
     * Ignore files matching the given glob patterns.
     */
    ignores?: Linter.Config['ignores'];
    /**
     * The type of JavaScript source code (defaults to `'module'`).
     */
    sourceType?: Linter.ParserOptions['sourceType'];
    /**
     * The version of ECMAScript to support (defaults to `'latest'`).
     */
    ecmaVersion?: Linter.ParserOptions['ecmaVersion'];
    /**
     * Enable jsx support.
     */
    jsx?: boolean;
    /**
     * Enable TypeScript support.
     *
     * @remarks
     * If set to `true`, TypeScript will be enabled for all `.ts` files in the project. If set to `false`,
     * TypeScript support will be disabled. You can also pass an object to configure TypeScript support.
     * See {@link configTypeScript} for details.
     */
    typescript?: boolean | {
        /**
         * The files to enable typescript linting for (defaults to `['**\/*.ts', '**\/*.tsx']`).
         */
        files?: Linter.Config['files'];
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
        files?: Linter.Config['files'];
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
import { create } from '@alexwende/eslint-config';

export default [
    ...create(),
    {
        // with `files`, the rules will only be applied to matching files
        // files: ['some-package/**/*.ts'],
        rules: {
            '@typescript-eslint/no-useless-constructor': 'off',
        },
    },
];
```

### JavaScript for Node

The following configuration configures eslint to lint all JavaScript files in the working directory, adds Node.js 
specific globals and enables style rules.

```javascript
// eslint.config.js
import { create } from '@alexwende/eslint-config';

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
import { create } from '@alexwende/eslint-config';

export default create({
    environments: [{ env: 'browser' }],
    typescript: true,
    style: true,
});
```

If you want to lint TypeScript files only, simply exclude all JavaScript files:

```javascript
// eslint.config.js
import { create } from '@alexwende/eslint-config';

export default create({
    environments: [{ env: 'browser' }],
    typescript: true,
    style: true,
    ignores: [
        '**/*.js',
    ],
});
```

## VSCode Integration

Ensure you have the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
installed.

Update your `.vscode/settings.json` with the following options:

```jsonc
// .vscode/settings.json
{
  // enable the new FlatConfig format
  "eslint.useFlatConfig": true,

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
