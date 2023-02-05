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

Returns `string`.

| Parameter | Type                  | Optional | Default | Description |
| --------- | --------------------- | :------: | ------- | ----------- |
| `options` | [`Options`](#options) |          |         |

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

| Field                | Type                    | Optional | Description                                                                                                |
| -------------------- | ----------------------- | :------: | ---------------------------------------------------------------------------------------------------------- |
| `project`            | `string`                |    ✅    | Path to your Typescript project (folder with `tsconfig.json` or path to `tsconfig.json`)                   |
| `inputFile`          | `string`                |          | The `.ts` or `.d.ts` file you want to generate documentation for.                                          |
| `definitionTemplate` | `string`                |    ✅    | A template for displaying the type definition. To hide the definition, set to an empty string.             |
| `skipTypeCheck`      | `boolean`               |    ✅    | When true, don't throw an error when there is a type erorr.                                                |
| `prettier`           | `false` &#124; `object` |    ✅    | Config for prettier, or `false` to disable formatting. Default to the config found in your `process.cwd()` |
| `disableToc`         | `boolean`               |    ✅    | Set to true to prevent a table of contents from being generated.                                           |
