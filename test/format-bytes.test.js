import assert from 'node:assert';
import { test } from 'node:test';

import formatBytes from '../src/utils/formatBytes.js';

test('formatBytes(0) renders an empty string', () => {
  assert.strictEqual(formatBytes(0), '');
});

test('formatBytes(512) renders bytes with one decimal place', () => {
  assert.strictEqual(formatBytes(512), '512.0 B');
});

test('formatBytes(1024) renders one kilobyte', () => {
  assert.strictEqual(formatBytes(1024), '1.0 KB');
});

test('formatBytes(1536) renders one and a half kilobytes', () => {
  assert.strictEqual(formatBytes(1536), '1.5 KB');
});