# TypeScript to Markdown

Given a TS file, generate markdown documentation for all it's exports.

```sh
pnpm i ts-to-md
```

See [`API.md`](./API.md) for an example output.

## Usage

### CLI

```sh
ts-to-md -i src/index.ts -o docs/index.md
```

See `ts-to-md --help` for more a list of options.

### Node API

```ts
import { generate } from 'ts-to-md';

const markdown = generate({ inputFile: './index.ts' });
```

## Development

```sh
pnpm i
```

All testing is done via simple E2E tests. To run them, run:

```sh
pnpm test
```

To create a test case, create two files:

1. `{test-name}.input.ts` - This is the input file being checked
2. `{test-name}.output.md` - This defines the expected output
