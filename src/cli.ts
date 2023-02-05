#!/usr/bin/env node
import meow from 'meow';
import path from 'node:path';
import fs from 'node:fs';
import { generate } from '.';

const cli = meow(
  `
	Usage
	  $ ts-to-js <input> <output>

	Options
	  --project, -p           Path to tsconfig.json to use.
	  --definitionTemplate    A string used to change what the TS definition looks like. Set to "" to exclude TS definitions.
    --skipTypeCheck, -s     Skip checking typescript for type errors.
  `,
  {
    importMeta: import.meta,
    flags: {
      project: {
        type: 'string',
        alias: 'p',
        default: path.resolve('tsconfig.json'),
      },
      definitionTemplate: {
        type: 'string',
      },
      skipTypeCheck: {
        type: 'boolean',
      },
    },
  }
);

const [inputFile, outputFile] = cli.input;
console.log(`\nGenerating ${outputFile}...`);

const markdown = generate({
  inputFile,
  project: cli.flags.project,
  definitionTemplate: cli.flags.definitionTemplate,
  skipTypeCheck: cli.flags.skipTypeCheck,
});

fs.writeFileSync(outputFile, markdown, 'utf-8');
console.log('Done!');
