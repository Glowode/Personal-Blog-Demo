const fs = require('fs');
const out = [];
out.push('cwd: ' + process.cwd());
out.push('root: ' + fs.readdirSync('.').join(', '));
out.push('test dir: ' + fs.readdirSync('test').join(', '));
out.push('src/components: ' + fs.readdirSync('src/components').join(', '));
out.push('node_modules exists: ' + fs.existsSync('node_modules'));
out.push('--- resolving packages ---');
for (const p of ['@babel/register','@babel/core','@babel/preset-react','@babel/preset-env','esbuild','esbuild-register','sucrase','typescript','react','react-dom','vite']) {
  try { out.push('OK ' + p + ' -> ' + require.resolve(p)); } catch (e) { out.push('MISSING ' + p); }
}
out.push('--- footer test ---');
out.push(fs.readFileSync('test/footer-design.test.js', 'utf8'));
console.log(out.join('\n'));
