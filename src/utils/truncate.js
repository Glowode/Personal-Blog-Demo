/**
 * Truncate text to a maximum length, appending an ellipsis when cut.
 *
 * Returns the text unchanged when its length is less than or equal to
 * `maxLength`. Otherwise the text is cut at `maxLength` characters and an
 * ellipsis character is appended.
 *
 * @param {string} text - The input text to truncate.
 * @param {number} maxLength - The maximum number of characters to keep.
 * @returns {string} The original or truncated text.
 */
export default function truncate(text, maxLength) {
  const value = String(text);

  if (value.length <= maxLength) {
    return value;
  }

  return value.slice(0, maxLength) + '…';
}
