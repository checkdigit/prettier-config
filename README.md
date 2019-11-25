# prettier-config
Check Digit [Prettier](https://prettier.io) configuration

## Usage

### Install

```bash
$ npm add -D prettier @checkdigit/prettier-config
```

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
