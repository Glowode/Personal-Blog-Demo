/**
 * Convert arbitrary text into a URL-friendly slug.
 *
 * Lowercases the input, trims surrounding whitespace, replaces any run of
 * non-alphanumeric characters with a single hyphen, and strips leading and
 * trailing hyphens.
 *
 * @param {string} text - The input text to slugify.
 * @returns {string} The slugified text.
 */
export default function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
