import assert from 'node:assert';
import { test } from 'node:test';

import slugify from '../src/utils/slugify.js';

test('slugify lowercases and hyphenates spaces', () => {
  assert.strictEqual(slugify('Hello World'), 'hello-world');
});

test('slugify trims and collapses whitespace runs', () => {
  assert.strictEqual(slugify('  A  B  '), 'a-b');
});

test('slugify collapses runs of non-alphanumeric characters', () => {
  assert.strictEqual(slugify('Foo--Bar'), 'foo-bar');
});

test('slugify returns an empty string for empty input', () => {
  assert.strictEqual(slugify(''), '');
});
