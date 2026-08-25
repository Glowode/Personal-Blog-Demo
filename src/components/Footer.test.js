const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const componentPath = path.join(__dirname, 'Footer.jsx');
const stylePath = path.join(__dirname, 'Footer.module.css');
const component = fs.readFileSync(componentPath, 'utf8');
const styles = fs.readFileSync(stylePath, 'utf8');

test('Footer component file exists', () => {
  assert.ok(fs.existsSync(componentPath), 'Footer.jsx should exist');
  assert.ok(fs.existsSync(stylePath), 'Footer.module.css should exist');
});

test('Footer renders a semantic <footer> element', () => {
  assert.match(component, /<footer\s+className=\{styles\.footer\}>/);
  assert.match(component, /<\/footer>/);
});

test('Footer includes copyright string with the current year', () => {
  assert.match(component, /©/);
  assert.match(component, /new Date\(\)\.getFullYear\(\)/);
  assert.match(component, /\{currentYear\}/);
  assert.doesNotMatch(component, /©\s*20\d\d/);
});

test('Footer applies CSS module style hooks', () => {
  assert.match(component, /import styles from '\.\/Footer\.module\.css';/);
  assert.match(component, /className=\{styles\.footer\}/);
  assert.match(component, /className=\{styles\.copyright\}/);
  assert.match(styles, /\.footer\s*\{/);
  assert.match(styles, /\.copyright\s*\{/);
});
