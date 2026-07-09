import fs from 'fs';

const dataFile = fs.readFileSync('src/data.ts', 'utf8');
const urls = [...dataFile.matchAll(/https:\/\/raw\.githubusercontent\.com\/[^']+/g)].map(m => m[0]);

console.log(`Found ${urls.length} URLs`);

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) {
      console.log(`[${res.status}] Broken: ${url}`);
    } else {
      console.log(`[200] OK: ${url}`);
    }
  } catch (e) {
    console.log(`[Error] Broken: ${url} - ${e.message}`);
  }
}

async function run() {
  for (const url of urls) {
    await checkUrl(url);
  }
}

run();
