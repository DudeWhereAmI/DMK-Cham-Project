import { ElementType } from '../types';
import { doc, getDoc, setDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

const API_BASE = '';


const parseFirestoreResponse = (fields: any): any => {
  if (!fields) return null;
  const res: any = {};
  for (const key in fields) {
    if (fields[key].integerValue !== undefined) {
      res[key] = parseInt(fields[key].integerValue, 10);
    } else if (fields[key].mapValue) {
      res[key] = parseFirestoreResponse(fields[key].mapValue.fields);
    }
  }
  return res;
};

export const fetchInventoryFromFirestore = async () => {
  let baseInv = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
  let history: any[] = [];
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      baseInv = {
        products: data.products || baseInv.products,
        charms: data.charms || baseInv.charms
      };
      if (data.history) {
        history = data.history;
      }
    }
    saveInventory(baseInv);
    saveInventoryHistory(history);
    return baseInv;
  } catch (err: any) {
    console.warn("Failed to fetch inventory via Firebase SDK, attempting REST API fallback...", err);
    try {
      const res = await fetch("https://firestore.googleapis.com/v1/projects/gen-lang-client-0149031439/databases/ai-studio-8076b27e-2c83-44c0-bf0c-2588aebf752d/documents/admin/inventory");
      if (res.ok) {
        const data = await res.json();
        if (data.fields) {
          const products = parseFirestoreResponse(data.fields.products?.mapValue?.fields);
          const charms = parseFirestoreResponse(data.fields.charms?.mapValue?.fields);
          if (products) baseInv.products = products;
          if (charms) baseInv.charms = charms;
          
          saveInventory(baseInv);
          // Note: we skip history array parsing here since it's complex and not needed for basic checkout UI
          return baseInv;
        }
      }
    } catch(restErr) {
      console.warn("REST API fallback also failed:", restErr);
    }
    
    // If EVERYTHING fails, at least save the INITIAL_INVENTORY so we don't have nulls,
    // and components can render something.
    saveInventory(baseInv);
    return baseInv;
  }
};

export const saveInventoryToFirestore = async (inv: any, history?: any[]) => {
  saveInventory(inv);
  if (history) {
    saveInventoryHistory(history);
  }
  try {
    const currentHistory = history || getInventoryHistory();
    // Calculate new initial stock based on current stock + total historical deductions
    const initialProducts = JSON.parse(JSON.stringify(inv.products));
    const initialCharms = JSON.parse(JSON.stringify(inv.charms));
    
    currentHistory.forEach((log: any) => {
      if (log.orderId === 'Admin Update') return; // Do not add admin manual adjustments to initial stock, so they permanently alter the base stock
      (log.decrements || []).forEach((dec: any) => {
        if (dec.type === 'product' && dec.category && dec.item) {
          if (!initialProducts[dec.category]) initialProducts[dec.category] = {};
          if (initialProducts[dec.category][dec.item] === undefined) initialProducts[dec.category][dec.item] = 0;
          initialProducts[dec.category][dec.item] += dec.qty;
        } else if (dec.type === 'charm' && dec.item) {
          const cType = dec.item.replace('zodiac-', '');
          if (initialCharms[cType] === undefined) initialCharms[cType] = 0;
          initialCharms[cType] += dec.qty;
        }
      });
    });

    const docRef = doc(db, 'admin', 'inventory');
    await setDoc(docRef, {
      products: inv.products,
      charms: inv.charms,
      initialProducts: initialProducts,
      initialCharms: initialCharms,
      history: currentHistory,
      updatedAt: new Date().toISOString()
    });
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      // Fallback: Use backend API to update inventory since guest doesn't have write access
      try {
        await fetch(`${API_BASE}/api/update-inventory-admin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            newInventory: inv,
            history: history || getInventoryHistory()
          })
        });
      } catch (backendErr) {
        console.warn("Backend inventory update also failed:", backendErr);
      }
    } else {
      console.warn("Failed to save inventory to Firestore:", err);
      throw err;
    }
  }
};

export const fetchInitialInventoryFromFirestore = async () => {
  let baseInv = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.initialProducts && data.initialCharms) {
        baseInv = {
          products: data.initialProducts,
          charms: data.initialCharms
        };
      }
    }
  } catch (e) {
    console.error("Failed to fetch dynamic initial inventory:", e);
  }
  return baseInv;
};

export const INITIAL_INVENTORY: any = {
  products: {
    'mirror': {
      'KIM': 0,
      'HOA': 25,
      'MOC': 5,
      'THUY': 5,
      'THO': 35
    },
    'clip-1': {
      'KIM': 18,
      'HOA': 31,
      'MOC': 13,
      'THUY': 13,
      'THO': 34
    },
    'clip-2': {
      'KIM': 28,
      'HOA': 26,
      'MOC': 11,
      'THUY': 12,
      'THO': 10
    }
  },
  charms: {
    'KIM': 4,
    'HOA': 4,
    'MOC': 4,
    'THUY': 4,
    'THO': 4
  }
};

let inMemoryInventory: any = null;
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
};

export const checkIsSoldOut = (categoryId: string, element: ElementType) => {
  const inv = getInventory();
  if (inv.products[categoryId] && inv.products[categoryId][element] !== undefined) {
    return inv.products[categoryId][element] <= 0;
  }
  return false;
};

export const checkIsInitiallySoldOut = (categoryId: string, element: ElementType) => {
  if (INITIAL_INVENTORY.products[categoryId] && INITIAL_INVENTORY.products[categoryId][element] !== undefined) {
    return INITIAL_INVENTORY.products[categoryId][element] === 0;
  }
  return false;
};

export const checkIsCharmSoldOut = (element: ElementType) => {
  const inv = getInventory();
  return inv.charms[element] <= 0;
};

export const checkIsCharmInitiallySoldOut = (element: ElementType) => {
  return INITIAL_INVENTORY.charms[element] === 0;
};

let inMemoryHistory: any[] | null = null;
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
};

export const normalizeElement = (el: string): string => {
  if (!el) return '';
  const s = el.toString().trim().toUpperCase();
  if (s.includes('THỦY') || s.includes('THUỶ') || s.includes('THUY')) return 'THUY';
  if (s.includes('HỎA') || s.includes('HOẢ') || s.includes('HOA')) return 'HOA';
  if (s.includes('KIM')) return 'KIM';
  if (s.includes('MỘC') || s.includes('MOC')) return 'MOC';
  if (s.includes('THỔ') || s.includes('THO')) return 'THO';
  return s;
};

export const recalculateInventoryFromOrders = (orders: any[], baseInv?: any, limitTimeMsOverride?: number) => {
  // Sort orders ascending by createdAt (oldest first) to replay correctly
  const sortedOrders = [...orders].sort((a, b) => {
    const getVal = (o: any) => {
      if (o.createdAt) {
        if (typeof o.createdAt.toDate === 'function') {
          return o.createdAt.toDate().getTime();
        }
        if (o.createdAt.seconds) {
          return o.createdAt.seconds * 1000;
        }
        return new Date(o.createdAt).getTime();
      }
      return 0;
    };
    return getVal(a) - getVal(b);
  });

  const inv = baseInv ? JSON.parse(JSON.stringify(baseInv)) : JSON.parse(JSON.stringify(INITIAL_INVENTORY));
  const newHistory: any[] = [];

  sortedOrders.forEach(order => {
    // Only process valid preorders/completed orders. Ignore drafts and cancelled/deleted orders.
    const statusLower = (order.status || '').toLowerCase();
    if (statusLower === 'draft' || statusLower.includes('cancelled') || statusLower.includes('hủy') || statusLower.includes('cancel')) return;
    
    // Ignore test orders from hoangphucunknown@gmail.com and hla0712006@gmail.com
    const email = order.customerInfo?.email?.toLowerCase();
    if (email === 'hoangphucunknown@gmail.com' || email === 'hla0712006@gmail.com') return;

    // Only start calculating from July 1st, 2026
    let orderTimeMs = 0;
    if (order.createdAt) {
      if (typeof order.createdAt.toDate === 'function') {
        orderTimeMs = order.createdAt.toDate().getTime();
      } else if (order.createdAt.seconds) {
        orderTimeMs = order.createdAt.seconds * 1000;
      } else {
        orderTimeMs = new Date(order.createdAt).getTime();
      }
    }
    const limitTimeMs = limitTimeMsOverride !== undefined ? limitTimeMsOverride : new Date('2026-07-01T00:00:00').getTime();
    if (orderTimeMs <= limitTimeMs) return;

    const cartItems = order.items || [];
    const historyLogs: any[] = [];

    cartItems.forEach((item: any) => {
      const qty = item.quantity || 1;
      const cat = item.product?.category;
      if (!cat) return;
      const customization = item.customization || {};
      const { element, partnerElement, selectedZodiacCharmId, selectedZodiacCharmId2 } = customization;
      let comboId = customization.comboId;
      
      // Fallback for older orders that have partnerElement but missing comboId
      if (partnerElement && !comboId) {
        comboId = 'mirror_combo';
      }
      
      const normEl = normalizeElement(element);
      const normPartnerEl = normalizeElement(partnerElement);

      // Decrement main product
      const actualCat1 = (cat === 'combo' && comboId === 'mirror_combo') ? 'mirror' : (cat === 'combo' ? 'clip-1' : cat);
      if (inv.products[actualCat1] && inv.products[actualCat1][normEl] !== undefined) {
        inv.products[actualCat1][normEl] = Math.max(0, inv.products[actualCat1][normEl] - qty);
        historyLogs.push({
          category: actualCat1,
          item: normEl,
          qty: qty,
          type: 'product'
        });
      }
      
      // Decrement partner product if any
      if (normPartnerEl) {
        const actualCat2 = comboId === 'mirror_combo' ? 'mirror' : (cat === 'combo' ? 'clip-1' : cat);
        if (inv.products[actualCat2] && inv.products[actualCat2][normPartnerEl] !== undefined) {
          inv.products[actualCat2][normPartnerEl] = Math.max(0, inv.products[actualCat2][normPartnerEl] - qty);
          historyLogs.push({
            category: actualCat2,
            item: normPartnerEl,
            qty: qty,
            type: 'product'
          });
        }
      }
      
      // Decrement charms
      if (selectedZodiacCharmId && selectedZodiacCharmId.startsWith('zodiac-')) {
        const cType = normalizeElement(selectedZodiacCharmId.replace('zodiac-', ''));
        if (inv.charms[cType] !== undefined) {
          inv.charms[cType] = Math.max(0, inv.charms[cType] - qty);
          historyLogs.push({
            category: 'charms',
            item: `zodiac-${cType}`,
            qty: qty,
            type: 'charm'
          });
        }
      }
      if (selectedZodiacCharmId2 && selectedZodiacCharmId2.startsWith('zodiac-')) {
        const cType2 = normalizeElement(selectedZodiacCharmId2.replace('zodiac-', ''));
        if (inv.charms[cType2] !== undefined) {
          inv.charms[cType2] = Math.max(0, inv.charms[cType2] - qty);
          historyLogs.push({
            category: 'charms',
            item: `zodiac-${cType2}`,
            qty: qty,
            type: 'charm'
          });
        }
      }
    });

    if (historyLogs.length > 0) {
      let orderTime = '';
      if (order.createdAt) {
        if (typeof order.createdAt.toDate === 'function') {
          orderTime = order.createdAt.toDate().toISOString();
        } else if (order.createdAt.seconds) {
          orderTime = new Date(order.createdAt.seconds * 1000).toISOString();
        } else {
          orderTime = new Date(order.createdAt).toISOString();
        }
      } else {
        orderTime = new Date().toISOString();
      }

      newHistory.unshift({
        id: `LOG-${order.id || Date.now()}`,
        orderId: order.id || 'N/A',
        timestamp: orderTime,
        decrements: historyLogs
      });
    }
  });

  
  return { inv, history: newHistory };
};

export const downloadInventoryCSV = () => {
  const inv = getInventory();
  let csv = 'Category,Item,Stock Remaining\n';
  
  // Products
  Object.keys(inv.products).forEach(cat => {
    Object.keys(inv.products[cat]).forEach(el => {
      csv += `${cat},${el},${inv.products[cat][el]}\n`;
    });
  });
  
  // Charms
  Object.keys(inv.charms).forEach(el => {
    csv += `charms,zodiac-${el},${inv.charms[el]}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `inventory_report_${new Date().getTime()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
