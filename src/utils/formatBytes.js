/**
 * Format a byte count as a human-readable size string.
 *
 * Uses binary (1024-based) units, rendering the value with a single decimal
 * place. A byte count of 0 renders as an empty string so callers can hide the
 * size for empty/absent payloads.
 *
 * @param {number} bytes - Non-negative byte count.
 * @returns {string} Size string such as '512.0 B', '1.0 KB', '1.5 KB'.
 */
export default function formatBytes(bytes) {
  if (bytes === 0) {
    return '';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / Math.pow(1024, exponent);

  return `${value.toFixed(1)} ${units[exponent]}`;
}