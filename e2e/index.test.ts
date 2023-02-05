import { describe, it, expect } from 'vitest';
import fs from 'node:fs/promises';
import path from 'node:path';
import { generate } from '../src';

type Pair = [inputFile: string, outputFile: string];

const dir = path.resolve('e2e/cases');

async function getTestCases(): Promise<Pair[]> {
  const fileNames = await fs.readdir(dir);
  const files = fileNames.map((fileName) => path.join(dir, fileName));

  const inputFileRegex = /\.input(\.d)?\.ts$/;
  const isInputFile = (file: string) => inputFileRegex.test(file);
  const isOutputFile = (file: string) => file.endsWith('.output.md');

  const inputFiles = files.filter(isInputFile);
  const outputFiles = files.filter(isOutputFile);

  const unknownFiles = files.filter(
    (file) => !isInputFile(file) && !isOutputFile(file)
  );
  if (unknownFiles.length > 0) {
    console.warn('Unknown files in `e2e/cases` directory:', unknownFiles);
  }

  const missingOutputs: string[] = [];

  const pairs = inputFiles.reduce<Pair[]>((pairs, input) => {
    const output = input.replace(inputFileRegex, '.output.md');
    const outputIndex = outputFiles.indexOf(output);
    if (outputIndex >= 0) {
      outputFiles.splice(outputIndex, 1);
      pairs.push([path.basename(input), path.basename(output)]);
    } else {
      missingOutputs.push(output);
    }
    return pairs;
  }, []);

  if (missingOutputs.length > 0) {
    console.warn('Missing expected output files:', missingOutputs);
  }

  return pairs;
}

describe('TypeScript to Markdown Generation', async () => {
  const testCases = await getTestCases();

  it.each(testCases)(
    'should convert %s to %s',
    async (inputFileName, outputFileName) => {
      const inputFile = path.join(dir, inputFileName);
      const outputFile = path.join(dir, outputFileName);
      const expected = await fs.readFile(outputFile, 'utf-8');

      const actual = await generate({
        inputFile: inputFile,
        project: path.resolve('tsconfig.json'),
      });

      expect(actual).toEqual(expected);
    }
  );
});
