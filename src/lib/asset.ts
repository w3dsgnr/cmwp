// Prefixes a public asset path with the active basePath.
// Raw <img> and next/image don't auto-apply basePath, so use this for asset URLs.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
