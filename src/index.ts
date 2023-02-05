import {
  ExportedDeclarations,
  FunctionDeclaration,
  JSDoc,
  Node,
  ParameterDeclaration,
  Project,
  PropertySignature,
  SyntaxKind,
} from 'ts-morph';
import * as prettier from 'prettier';
import 'prettier/parser-markdown.js';
import { getPublicDefinitions } from './utils/getPublicDefinitions';
import { Ctx, Options } from './types';
import { getMarkdownTypeRef } from './utils/getMarkdownTypeRef';

export { Options };

/**
 * Generate and return the documentation for a TS file as a string.
 *
 * This method does not write the config to a file, you'll need to do that yourself.
 */
export function generate(options: Options): string {
  const project = getProject(options);
  const file = project.getSourceFileOrThrow(options.inputFile);

  const definitions = getPublicDefinitions(file);

  const ctx: Ctx = {
    definitions: definitions.reduce<Ctx['definitions']>((map, def) => {
      map[def.name] = true;
      return map;
    }, {}),
  };

  const blocks = definitions.map(({ name, def }) =>
    getDefinitionMarkdown({ ctx, name, def, options })
  );

  const lines = ['# API'];
  lines.push(...blocks);

  let markdown = lines.join('\n\n');
  if (options.prettier !== false) {
    markdown = prettier.format(markdown, {
      ...options.prettier,
      parser: 'markdown',
    });
  }
  return markdown;
}

function getProject(options: Options): Project {
  const project = new Project({
    tsConfigFilePath: options.project,
    // skipAddingFilesFromTsConfig: true,
  });
  project.addSourceFilesAtPaths(options.inputFile);

  if (!options.skipTypeCheck) {
    const errors = project.getPreEmitDiagnostics();
    if (errors.length > 0) {
      console.error(project.formatDiagnosticsWithColorAndContext(errors));
      throw Error('There are type errors. Markdown will not be generated.');
    }
  }

  return project;
}

function getDefinitionMarkdown({
  ctx,
  name,
  def,
  options,
}: {
  ctx: Ctx;
  name: string;
  def: ExportedDeclarations;
  options: Options;
}): string {
  const lines = [`## \`${name}\``, getTypeDefMarkdownCodeblock(options, def)];

  const description = getJsDocNode(def)?.getDescription();
  if (description) lines.push(description);

  if (def.isKind(SyntaxKind.FunctionDeclaration)) {
    const returnType = getMarkdownTypeRef(ctx, def.getReturnTypeNode());
    if (returnType !== '`void`') lines.push(`Returns ${returnType}.`);

    const params = def.getParameters();
    if (params.length > 0)
      lines.push(getParamsMarkdownTable(ctx, { fn: def, params }));
  } else if (def.isKind(SyntaxKind.InterfaceDeclaration)) {
    const properties = def.getProperties();
    if (properties.length > 0)
      lines.push(getPropertiesMarkdownTable(ctx, properties));
  }

  return lines.join('\n\n');
}

function getParamsMarkdownTable(
  ctx: Ctx,
  { fn, params }: { fn: FunctionDeclaration; params: ParameterDeclaration[] }
): string {
  const lines = [
    `| Parameter | Type | Optional | Default | Description |`,
    `| --------- | ---- | :------: | ------- | ----------- |`,
  ];
  params.forEach((param) => {
    const name = `\`${param.getName()}\``;
    const initializer = param.getInitializer();
    const optional = param.isOptional() || initializer ? '✅' : '';
    const defaultValue = initializer
      ? getMarkdownTypeRef(ctx, initializer.getType())
      : '';
    const type = getMarkdownTypeRef(
      ctx,
      initializer
        ? initializer.getType().getApparentType()
        : param.getTypeNode()
    );
    const tags = getJsDocNode(fn)?.getTags();
    const tag = tags?.find((tag) =>
      tag
        .getText()
        .replace('@param', '')
        .trimStart()
        .startsWith(param.getName())
    );
    const comment = tag?.getCommentText()?.replaceAll('\n', ' ') ?? '';
    const description = comment.replace(/^\s*[:-]\s*/, '');
    lines.push(
      `| ${name} | ${type} | ${optional} | ${defaultValue} | ${description}`
    );
  });
  return lines.join('\n');
}

function getPropertiesMarkdownTable(
  ctx: Ctx,
  properties: PropertySignature[]
): string {
  const lines = [
    `| Field | Type | Optional | Description |`,
    `| ----- | ---- | :------: | ----------- |`,
  ];
  properties.forEach((property) => {
    const name = `\`${property.getName()}\``;
    const optional = property.hasQuestionToken() ? '✅' : '';
    const type = getMarkdownTypeRef(ctx, property.getTypeNode());
    const description =
      getJsDocNode(property)?.getCommentText()?.replaceAll('\n', ' ') ?? '';
    lines.push(`| ${name} | ${type} | ${optional} | ${description}`);
  });
  return lines.join('\n');
}

function getTypeDefMarkdownCodeblock(
  options: Options,
  def: ExportedDeclarations
) {
  const template =
    options.definitionTemplate ?? '```ts\n// Definition\n{{template}}\n```';

  if (def.isKind(SyntaxKind.FunctionDeclaration)) def.removeBody();
  const defStr = def.print({ removeComments: true });

  return template.replace('{{template}}', defStr);
}

function getJsDocNode(def: Node): JSDoc | undefined {
  if (Node.isJSDocable(def)) return def.getJsDocs()[0];
  return undefined;
}
