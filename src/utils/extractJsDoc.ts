/**
 * Return any JSDoc content found for the whole file.
 */
export function extractJsDoc(code: string) {
  if (!code.startsWith('/**')) return;
  const endIndex = code.indexOf('*/');

  const comment = code.substring(0, endIndex);
  const next = code.substring(endIndex + 3).trim();

  if (
    next.startsWith('export') ||
    next.startsWith('const') ||
    next.startsWith('function') ||
    next.startsWith('let')
  ) {
    return undefined;
  }

  return comment
    .replace('/**', '')
    .replace('*/', '')
    .split('\n')
    .map((line) => line.replace('*', '').trimStart())
    .join('\n')
    .trim();
}
