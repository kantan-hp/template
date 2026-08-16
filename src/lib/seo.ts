// SEO helpers shared by the layouts: JSON-LD serialization that is safe to
// inline in a <script> block.

/** JSON-LD string safe to inline in a <script> block (`<` escaped). */
export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}
