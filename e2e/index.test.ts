import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { generate } from '../src';

const dir = path.resolve('e2e/cases');
const testCases = fs.readdirSync(dir).filter((file) => file.endsWith('.ts'));

describe('TypeScript to Markdown Generation', () => {
  it.each(testCases)('should convert %s to markdown', (inputFileName) => {
    const inputFile = path.join(dir, inputFileName);
    const outputFile = inputFile.replace('.ts', '.md');

    const actual = generate({
      inputFile: path.join(dir, inputFileName),
      project: path.resolve('tsconfig.json'),
      prettier: { semi: false, printWidth: 120 },
    });

    // Write output to file for visual inspection.
    fs.writeFileSync(outputFile, actual, 'utf-8');

    expect(actual).toMatchSnapshot();
  });
});
