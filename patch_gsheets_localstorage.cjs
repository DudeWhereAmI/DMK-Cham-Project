const fs = require('fs');
let code = fs.readFileSync('src/lib/google-sheets.ts', 'utf8');

const targetId = `const getPersistentId = () => {
  let id = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(LOCAL_STORAGE_KEY, id);
  }
  return id;
};`;

const replacementId = `const getPersistentId = () => {
  let id = null;
  try {
    id = localStorage.getItem(LOCAL_STORAGE_KEY);
  } catch(e) {}
  if (!id) {
    id = generateId();
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, id);
    } catch(e) {}
  }
  return id;
};`;

code = code.replace(targetId, replacementId);

const targetRemove = `       localStorage.removeItem(LOCAL_STORAGE_KEY);`;
const replacementRemove = `       try { localStorage.removeItem(LOCAL_STORAGE_KEY); } catch(e) {}`;

code = code.replace(targetRemove, replacementRemove);

fs.writeFileSync('src/lib/google-sheets.ts', code);
console.log("Patched google-sheets.ts localStorage");
