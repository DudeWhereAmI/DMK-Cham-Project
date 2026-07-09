import fs from 'fs';

const dataFile = fs.readFileSync('src/data.ts', 'utf8');
const urls = [...dataFile.matchAll(/https:\/\/cdn\.jsdelivr\.net\/gh\/[^']+/g)].map(m => m[0]);

console.log(`Found ${urls.length} URLs`);

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) {
      console.log(`[${res.status}] Broken: ${url}`);
    }
  } catch (e) {
    console.log(`[Error] Broken: ${url} - ${e.message}`);
  }
}

await Promise.all(urls.map(url => checkUrl(url)));
console.log('Done checking');
