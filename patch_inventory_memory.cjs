const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

const targetGetInventory = `export const getInventory = () => {
  try {
    const stored = localStorage.getItem('cham_inventory');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch(e) {}
  return JSON.parse(JSON.stringify(INITIAL_INVENTORY));
};

export const saveInventory = (inv: any) => {
  localStorage.setItem('cham_inventory', JSON.stringify(inv));
  window.dispatchEvent(new Event('inventory_updated'));
};`;

const replacementGetInventory = `let inMemoryInventory: any = null;
export const getInventory = () => {
  if (inMemoryInventory) return JSON.parse(JSON.stringify(inMemoryInventory));
  try {
    const stored = localStorage.getItem('cham_inventory');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch(e) {}
  return JSON.parse(JSON.stringify(INITIAL_INVENTORY));
};

export const saveInventory = (inv: any) => {
  inMemoryInventory = JSON.parse(JSON.stringify(inv));
  try {
    localStorage.setItem('cham_inventory', JSON.stringify(inv));
  } catch(e) {
    console.warn("localStorage not available, using in-memory inventory");
  }
  window.dispatchEvent(new Event('inventory_updated'));
};`;

code = code.replace(targetGetInventory, replacementGetInventory);

const targetHistory = `export const getInventoryHistory = (): any[] => {
  try {
    const stored = localStorage.getItem('cham_inventory_history');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return [];
};

export const saveInventoryHistory = (history: any[]) => {
  localStorage.setItem('cham_inventory_history', JSON.stringify(history));
};`;

const replacementHistory = `let inMemoryHistory: any[] | null = null;
export const getInventoryHistory = (): any[] => {
  if (inMemoryHistory) return JSON.parse(JSON.stringify(inMemoryHistory));
  try {
    const stored = localStorage.getItem('cham_inventory_history');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return [];
};

export const saveInventoryHistory = (history: any[]) => {
  inMemoryHistory = JSON.parse(JSON.stringify(history));
  try {
    localStorage.setItem('cham_inventory_history', JSON.stringify(history));
  } catch (e) {}
};`;

code = code.replace(targetHistory, replacementHistory);

fs.writeFileSync('src/lib/inventory.ts', code);
console.log("Patched inventory.ts with in-memory fallback");
