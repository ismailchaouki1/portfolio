// Small shared helpers. No dependencies, easy to unit test.

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Format a date range for display. Falls back gracefully for missing years.
export function formatRange(start, end) {
  const s = start ? new Date(start) : null;
  const e = end ? new Date(end) : null;
  const fmt = (d) =>
    d && !Number.isNaN(d.getTime()) ? d.getFullYear() : '';
  const parts = [fmt(s), fmt(e)].filter(Boolean);
  return parts.join(' – ') || '';
}

// Stable hash used to key list items in the DOM.
export function stableHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}