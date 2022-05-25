[![MIT License](https://img.shields.io/github/license/checkdigit/prettier-config)](https://github.com/checkdigit/prettier-config/blob/master/LICENSE.txt)

# prettier-config
Check Digit [Prettier](https://prettier.io) configuration

## Usage

### Install

```bash
$ npm add -D -E @checkdigit/prettier-config
```

Important note from [Prettier installation documentation](https://prettier.io/docs/en/install.html):
> Install an exact version of Prettier locally in your project. This makes sure that everyone in the project
gets the exact same version of Prettier. Even a patch release of Prettier can result in slightly different
formatting, so you wouldn’t want different team members using different versions and formatting each other’s
changes back and forth.

To make this easier, just install `@checkdigit/prettier-config` as above, it will be locked to a specific version
of `prettier` which will automatically be installed via its `peerDependencies`.  Do not specific `prettier` itself
as a dependency.

### Edit `package.json`

```jsonc
{
  // ...
  "prettier": "@checkdigit/prettier-config"
  // ...
  scripts: {
    // ...
    "prettier": "prettier --list-different 'src/**/*.ts'",
    "prettier:fix": "prettier --write 'src/**/*.ts'",
    // ...
    "test": "... && npm run prettier"
    // ...
  }
}
```

In addition to running tests and linting, prettier should also be used by `npm test` to validate formatting.

If there are issues, `npm run prettier:fix` will re-format the entire project to the required style.

### Add `.prettierignore` file (optional)

If you have generated TypeScript files you can have Prettier ignore them by creating a `.prettierignore` file like so:
```
src/api/*/swagger.ts
```

### WebStorm

WebStorm supports Prettier, turn on within the preferences at: Languages and Frameworks | JavaScript | Prettier.

You can use ⌥⇧⌘P to format a block with Prettier.  WebStorm should also ask if you want to apply Prettier code style rules across the project.  (say yes)

## License

MIT
