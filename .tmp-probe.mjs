const url = new URL('./src/components/Contact.jsx', import.meta.url);
try {
  const m = await import(url.href);
  console.log('IMPORT OK', typeof m.default, Object.keys(m));
} catch (e) {
  console.log('IMPORT ERR:', e.code, '|', e.message.split('\n')[0]);
}