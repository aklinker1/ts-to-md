# API

- [`generate`](#generate)
- [`Options`](#options)

## `generate`

```ts
// Definition
export function generate(options: Options): string;
```

Generate and return the documentation for a TS file as a string.

This method does not write the config to a file, you'll need to do that yourself.

Returns string.

| Parameter | Type                                        | Optional | Default | Description |
| --------- | ------------------------------------------- | :------: | ------- | ----------- |
| `options` | <code><a href="#options">Options</a></code> |          |         |

## `Options`

```ts
// Definition
export interface Options {
  project?: string;
  inputFile: string;
  definitionTemplate?: string;
  skipTypeCheck?: boolean;
  prettier?: false | prettier.Config;
  disableToc?: boolean;
}
```

Options for customizing the generated markdown.

| Field                | Type                             | Optional | Description                                                                                                |
| -------------------- | -------------------------------- | :------: | ---------------------------------------------------------------------------------------------------------- |
| `project`            | <code>string</code>              |    ✅    | Path to your Typescript project (folder with `tsconfig.json` or path to `tsconfig.json`)                   |
| `inputFile`          | <code>string</code>              |          | The `.ts` or `.d.ts` file you want to generate documentation for.                                          |
| `definitionTemplate` | <code>string</code>              |    ✅    | A template for displaying the type definition. To hide the definition, set to an empty string.             |
| `skipTypeCheck`      | <code>boolean</code>             |    ✅    | When true, don't throw an error when there is a type erorr.                                                |
| `prettier`           | <code>false &#124; object</code> |    ✅    | Config for prettier, or `false` to disable formatting. Default to the config found in your `process.cwd()` |
| `disableToc`         | <code>boolean</code>             |    ✅    | Set to true to prevent a table of contents from being generated.                                           |
