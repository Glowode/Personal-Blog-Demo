const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const docsPath = path.join(__dirname, '..', 'docs', 'footer-design.md');
const doc = fs.readFileSync(docsPath, 'utf8');

function cd(path) {
  return path.replace(/\/\*+/g, '');
}

test('footer-design.md exists', () => {
  assert.ok(fs.existsSync(docsPath), 'docs/footer-design.md should exist');
});

test('footer-design.md identifies integration file', () => {
  assert.match(doc, /src\/App\.jsx/);
  assert.match(doc, /after the <main> content/i);
});

test('footer-design.md contains dynamic-year copyright template', () => {
  assert.match(doc, /currentYear/);
  assert.match(doc, /\{currentYear\}/);
});
