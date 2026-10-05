import { access, copyFile } from 'node:fs/promises';
await copyFile('lib/engine.js','public/engine.js');
for (const f of ['public/index.html','public/landing.css','public/landing.js','public/prototype.html','public/app.js','public/style.css']) await access(f);
console.log('Static app and serverless endpoints ready.');
