const fs = require('fs');
let code = fs.readFileSync('src/lib/google-sheets.ts', 'utf8');

const targetId = `export const getOrCreateSpreadsheet = async (accessToken: string) => {
  let id = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!id) {
    id = await createOrdersSheet(accessToken);
    localStorage.setItem(LOCAL_STORAGE_KEY, id);
  }
  return id;
};`;

const replacementId = `export const getOrCreateSpreadsheet = async (accessToken: string) => {
  let id = null;
  try {
    id = localStorage.getItem(LOCAL_STORAGE_KEY);
  } catch(e) {}
  if (!id) {
    id = await createOrdersSheet(accessToken);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, id);
    } catch(e) {}
  }
  return id;
};`;

code = code.replace(targetId, replacementId);
fs.writeFileSync('src/lib/google-sheets.ts', code);
console.log("Patched google-sheets.ts properly");
