import { describe, expect, it } from 'vitest';
import { extractJsDoc } from './extractJsDoc';

describe('extractJSDoc', () => {
  it('should return the first line of JSDoc content when it exists', () => {
    const code = `/**
   * Hello world
   */

  import 'prettier';

  /**
   * function docs
   */
  export function example(): void { }`;

    expect(extractJsDoc(code)).toEqual('Hello world');
  });

  it('should return undefined when JSDoc content does not exist', () => {
    const code = `import 'prettier';

  /**
   * function docs
   */
  export function example(): void { }`;

    expect(extractJsDoc(code)).toBeUndefined();
  });

  it('should return undefined when the first JSDoc is for an exported value', () => {
    const code = `/**
   * function docs
   */
  export function example(): void { }`;

    expect(extractJsDoc(code)).toBeUndefined();
  });

  it('should return multiple lines of content', () => {
    const code = `/**
    * line 1
    * line 2
    * 
    * line 3
    */
   /**
    * function docs
    */
   export function example(): void { }`;

    expect(extractJsDoc(code)).toEqual(`line 1
line 2

line 3`);
  });

  it('should not return the top level comment when before an exported value', () => {
    const code = `/**
   * Configuration provided by the user
   */
  export interface UserConfig {
    name: string;
  }`;

    expect(extractJsDoc(code)).toBeUndefined();
  });

  it('should return the top level comments before imports', () => {
    const code = `/**
    * NodeJS API.
    */
   import {
     ExportedDeclarations,
     FunctionDeclaration,
     JSDoc,
     Node,
     ParameterDeclaration,
     Project,
     PropertySignature,
     SyntaxKind,
   } from 'ts-morph';`;

    expect(extractJsDoc(code)).toBe('NodeJS API.');
  });
});
