const assert = require('node:assert');
const { test } = require('node:test');

const formatBytesPromise = import('../src/utils/formatBytes.js').then(
  (mod) => mod.default,
);

test('formatBytes(0) renders an empty string', async () => {
  const formatBytes = await formatBytesPromise;
  assert.strictEqual(formatBytes(0), '');
});

test('formatBytes(512) renders bytes with one decimal place', async () => {
  const formatBytes = await formatBytesPromise;
  assert.strictEqual(formatBytes(512), '512.0 B');
});

test('formatBytes(1024) renders one kilobyte', async () => {
  const formatBytes = await formatBytesPromise;
  assert.strictEqual(formatBytes(1024), '1.0 KB');
});

test('formatBytes(1536) renders one and a half kilobytes', async () => {
  const formatBytes = await formatBytesPromise;
  assert.strictEqual(formatBytes(1536), '1.5 KB');
});
