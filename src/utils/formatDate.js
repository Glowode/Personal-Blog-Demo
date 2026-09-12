/**
 * Format an ISO 8601 date string as YYYY-MM-DD.
 *
 * Uses UTC accessors so the output is not affected by the host timezone.
 *
 * @param {string} iso - ISO 8601 date string, e.g. '2026-09-12T10:00:00Z'.
 * @returns {string} Date in YYYY-MM-DD format.
 */
export default function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`formatDate: invalid date input: ${iso}`);
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
