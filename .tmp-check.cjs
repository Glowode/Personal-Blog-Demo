const fs = require('node:fs');

console.log('node_modules exists:', fs.existsSync('node_modules'));

for (const m of ['@babel/core', '@babel/register', '@babel/preset-react', '@babel/preset-env', 'esbuild', 'sucrase', 'babel-jest']) {
  try {
    console.log('found:', m, '->', require.resolve(m));
  } catch (e) {
    console.log('missing:', m);
  }
}

(async () => {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const r = await fetch('https://registry.npmjs.org/@babel%2fregister', { signal: ctrl.signal });
    clearTimeout(t);
    console.log('network:', r.status);
  } catch (e) {
    console.log('network error:', e.message);
  }
})();