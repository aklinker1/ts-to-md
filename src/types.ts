import * as prettier from 'prettier';

/**
 * Options for customizing the generated markdown.
 */
export interface Options {
  /**
   * Path to your Typescript project (folder with `tsconfig.json` or path to `tsconfig.json`)
   */
  project?: string;
  /**
   * The `.ts` or `.d.ts` file you want to generate documentation for.
   */
  inputFile: string;
  /**
   * A template for displaying the type definition. To hide the definition, set to an empty string.
   *
   * @default "```ts\n// Definition\n{{template}}\n```"
   */
  definitionTemplate?: string;
  /**
   * When true, don't throw an error when there is a type erorr.
   */
  skipTypeCheck?: boolean;
  /**
   * Config for prettier, or `false` to disable formatting. Default to the config found in your
   * `process.cwd()`
   */
  prettier?: false | prettier.Config;
  /**
   * Set to true to prevent a table of contents from being generated.
   */
  disableToc?: boolean;
}

export interface Ctx {
  definitions: Record<string, boolean>;
}
