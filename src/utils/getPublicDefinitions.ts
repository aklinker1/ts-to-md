import { ExportedDeclarations, SourceFile } from 'ts-morph';

export function getPublicDefinitions(
  file: SourceFile
): ReadonlyArray<{ name: string; def: ExportedDeclarations }> {
  const map = file.getExportedDeclarations();
  const items = Array.from(map.entries()).flatMap(([name, defs]) =>
    defs.map((def) => ({ name, def }))
  );

  items.sort((l, r) => {
    const lLower = l.name.toLowerCase();
    const rLower = r.name.toLowerCase();
    if (lLower === rLower) return l.name.localeCompare(r.name);
    else return lLower.localeCompare(rLower);
  });

  return items;
}
