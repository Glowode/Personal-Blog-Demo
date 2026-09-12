'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const componentPath = path.join(__dirname, '..', 'src', 'components', 'Contact.jsx');

const REACT_STUB = new Proxy(function reactStub() {
  return null;
}, {
  get: () => () => null,
});

function stubRequire(id) {
  if (id === 'react' || id.startsWith('react/')) {
    return REACT_STUB;
  }
  throw new Error(`unexpected require("${id}") while loading Contact.jsx`);
}

function transpileWithTypeScript(source, filePath) {
  const ts = require('typescript');
  return ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filePath,
  }).outputText;
}

// Dependency-free fallback: blank out the JSX return value and rewrite the ESM
// export statements so the module can be evaluated as CommonJS.
function stripJsxReturnValues(source) {
  const marker = 'return (';
  let result = '';
  let index = 0;

  for (;;) {
    const start = source.indexOf(marker, index);
    if (start === -1) break;

    let depth = 0;
    let i = start + marker.length - 1;
    let quote = null;

    while (i < source.length) {
      const ch = source[i];
      if (quote) {
        if (ch === '\\') {
          i += 2;
          continue;
        }
        if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'" || ch === '`') {
        quote = ch;
      } else if (ch === '(') {
        depth += 1;
      } else if (ch === ')') {
        depth -= 1;
        if (depth === 0) break;
      }
      i += 1;
    }

    result += source.slice(index, start) + 'return null';
    index = i + 1;
  }

  return result + source.slice(index);
}

function toCommonJs(source, filePath, forceFallback) {
  if (!forceFallback) {
    try {
      return transpileWithTypeScript(source, filePath);
    } catch (error) {
      // Typescript is not installed; use the dependency-free transform below.
    }
  }

  return stripJsxReturnValues(source)
    .replace(/\bexport\s+default\s+([A-Za-z_$][\w$]*)\s*;?/g, 'module.exports.default = $1;')
    .replace(/\bexport\s*\{\s*([A-Za-z_$][\w$]*)\s*\}\s*;?/g, 'module.exports.$1 = $1;');
}

function loadComponent({ forceFallback = false } = {}) {
  const source = fs.readFileSync(componentPath, 'utf8');
  const code = toCommonJs(source, componentPath, forceFallback);
  const loaded = { exports: {} };

  vm.runInNewContext(
    code,
    {
      module: loaded,
      exports: loaded.exports,
      require: stubRequire,
      console,
      process,
      __filename: componentPath,
      __dirname: path.dirname(componentPath),
    },
    { filename: componentPath },
  );

  return loaded.exports;
}

test('src/components/Contact.jsx exists', () => {
  assert.ok(fs.existsSync(componentPath), 'src/components/Contact.jsx should exist');
});

test('Contact default export is a function', () => {
  const Contact = loadComponent().default;
  assert.strictEqual(typeof Contact, 'function', 'expected the default export of Contact to be a function');
});

test('Contact can also be loaded without a transpiler dependency', () => {
  const Contact = loadComponent({ forceFallback: true }).default;
  assert.strictEqual(typeof Contact, 'function', 'expected the default export of Contact to be a function');
});
