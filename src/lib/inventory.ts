import { ElementType } from '../types';
import { doc, getDoc, setDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export const fetchInventoryFromFirestore = async () => {
  try {
    const docRef = doc(db, 'admin', 'inventory');
    const docSnap = await getDoc(docRef);
    
    let baseInv = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
    let lastUpdatedMs = new Date('2026-07-01T00:00:00').getTime();
    let history = [];
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      baseInv = {
        products: data.products || baseInv.products,
        charms: data.charms || baseInv.charms
      };
      if (data.updatedAt) {
        lastUpdatedMs = new Date(data.updatedAt).getTime();
      }
      if (data.history) {
        history = data.history;
      }
    }
    
    const q = query(collection(db, 'orders'), where('createdAt', '>=', Timestamp.fromMillis(lastUpdatedMs)));
    const ordersSnap = await getDocs(q);
    const fetchedOrders: any[] = [];
    ordersSnap.forEach((docSnap) => {
      fetchedOrders.push({ id: docSnap.id, ...docSnap.data() });
    });
    
    // Apply newer orders on top of baseInv
    const result = recalculateInventoryFromOrders(fetchedOrders, baseInv, lastUpdatedMs);
    const inv = result.inv;
    
    // Merge history
    const mergedHistory = [...result.history, ...history];
    
    saveInventory(inv);
    saveInventoryHistory(mergedHistory);
    
    return inv;
  } catch (err) {
    console.warn("Failed to fetch real orders for inventory calculation from Firestore:", err);
    return null;
  }
};

export const saveInventoryToFirestore = async (inv: any, history?: any[]) => {
  saveInventory(inv);
  if (history) {
    saveInventoryHistory(history);
  }
  try {
    const docRef = doc(db, 'admin', 'inventory');
    await setDoc(docRef, {
      products: inv.products,
      charms: inv.charms,
      history: history || getInventoryHistory(),
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Failed to save inventory to Firestore:", err);
    throw err;
  }
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
      'KIM': 15,
      'HOA': 22,
      'MOC': 9,
      'THUY': 6,
      'THO': 26
    },
    'clip-2': {
      'KIM': 26,
      'HOA': 20,
      'MOC': 6,
      'THUY': 8,
      'THO': 6
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

export const getInventory = () => {
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

export const getInventoryHistory = (): any[] => {
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

export const processOrderInventory = (cartItems: any[], orderId: string = 'N/A') => {
  const inv = getInventory();
  const historyLogs: any[] = [];
  
  cartItems.forEach(item => {
    const qty = item.quantity || 1;
    const cat = item.product?.category;
    if (!cat) return;
    const { element, partnerElement, selectedZodiacCharmId, selectedZodiacCharmId2 } = item.customization || {};
    let comboId = item.customization?.comboId;
    
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

  let updatedHistory = getInventoryHistory();
  if (historyLogs.length > 0) {
    updatedHistory.unshift({
      id: `LOG-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId,
      timestamp: new Date().toISOString(),
      decrements: historyLogs
    });
  }

  saveInventoryToFirestore(inv, updatedHistory).catch(() => {});
  return inv;
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
    
    // Ignore test orders from hoangphucunknown@gmail.com
    const email = order.customerInfo?.email?.toLowerCase();
    if (email === 'hoangphucunknown@gmail.com') return;

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

  saveInventoryToFirestore(inv, newHistory).catch(() => {});
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
