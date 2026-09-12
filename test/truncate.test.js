import assert from 'node:assert';
import { test } from 'node:test';

import truncate from '../src/utils/truncate.js';

test('truncate returns a short string unchanged', () => {
  assert.strictEqual(truncate('Hello', 10), 'Hello');
});

test('truncate returns a string at exactly maxLength unchanged', () => {
  assert.strictEqual(truncate('HelloWorld', 10), 'HelloWorld');
});

test('truncate cuts a longer string and appends an ellipsis', () => {
  assert.strictEqual(truncate('Hello World', 5), 'Hello…');
});