import { Node, SyntaxKind, Type, TypeNode } from 'ts-morph';
import { Ctx } from '../types';

/**
 * Returns a the type wrapped in backticks, with an optional link if the type points to another type
 * definition.
 */
export function getMarkdownTypeRef(
  ctx: Ctx,
  input: TypeNode | Type | undefined
): string {
  const wrap = (name: string) => {
    if (name in ctx.definitions)
      return `<a href="#${name.toLowerCase()}">${name}</a>`;
    return name;
  };

  if (input == null) return wrap('void');

  const type = input instanceof Type ? input : input.getType();
  const node = input instanceof Node ? input : undefined;

  if (node?.isKind(SyntaxKind.VoidKeyword)) return wrap('void');

  if (type.isAnonymous() && !type.isObject()) return wrap('_');
  if (type.isArray() || type.isReadonlyArray()) {
    const label = type.isReadonlyArray() ? 'ReadonlyArray' : 'Array';
    const itemType = getMarkdownTypeRef(ctx, type.getNumberIndexType());
    return `${label}&lt;${itemType}&gt;`;
  }
  if (type.isTuple()) {
    const typeParts = type
      .getTupleElements()
      .map((element) => getMarkdownTypeRef(ctx, element));
    return `[${typeParts.join(', ')}]`;
  }

  if (node?.isKind(SyntaxKind.TypeReference)) {
    const name = node.getTypeName().getText();
    const typeArgs = node.getTypeArguments();

    if (typeArgs.length > 0) {
      const argsString = typeArgs
        .map((typeArg) => getMarkdownTypeRef(ctx, typeArg))
        .join(', ');
      return `${wrap(name)}&lt;${argsString}&gt;`;
    }

    return wrap(name);
  }

  if (
    type.isLiteral() ||
    type.isAny() ||
    type.isNever() ||
    type.isUnknown() ||
    type.isUndefined() ||
    type.isNull()
  )
    return wrap(type.getText());

  if (type.isBoolean() || type.getText() === 'Boolean') return wrap('boolean');
  if (type.isString() || type.getText() === 'String') return wrap('string');
  if (type.isNumber() || type.getText() === 'Number') return wrap('number');

  if (
    // type.isAnonymous() &&
    type.isObject() &&
    !type.isArray() &&
    !type.isTuple()
  )
    return wrap('object');

  if (type.isUnionOrIntersection()) {
    const isUnion = type.isUnion();
    let separator = isUnion ? ' &#124; ' : ' & '; // | or &
    const types = isUnion ? type.getUnionTypes() : type.getIntersectionTypes();
    const parts = types
      .map((type) => getMarkdownTypeRef(ctx, type))
      // Put undefined and null last
      .sort((l, r) => {
        if (l === 'undefined' || l === 'null') return 1;
        if (r === 'undefined' || r === 'null') return -1;
        return 0;
      });
    return parts.join(separator);
  }

  if (type.isObject()) {
    return wrap('object');
  }

  throw Error(
    `getMarkdownTypeRef: Cannot serialize type = ${input.getText()}, kind = ${node?.getKindName()}`
  );
}
