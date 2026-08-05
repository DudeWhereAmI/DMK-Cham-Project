import React, { useEffect, useState } from 'react';
import { Package, Calendar, Tag, ChevronRight, User as UserIcon, Settings, LogOut, Loader2, Heart, ArrowRight, Database, History, RotateCcw, Plus, Minus, RefreshCw, Save } from 'lucide-react';
import { collection, query, where, orderBy, getDocs, Timestamp, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { getInventory, saveInventory, getInventoryHistory, saveInventoryHistory, INITIAL_INVENTORY, downloadInventoryCSV, recalculateInventoryFromOrders, fetchInventoryFromFirestore, saveInventoryToFirestore } from '../lib/inventory';
import { PngLogoCircular } from './PngLogo';
import { Product } from '../types';
import { PRODUCTS, CHARMS, ELEMENTS } from '../data';
import dmkBrandElement1 from '../assets/dmk_brand_element_1.svg';
import mirrorVintage from '../assets/mirror_vintage.svg';

const API_BASE = '';


const MIRROR_IMAGES_CHU_NOI: Record<string, string> = {
  KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Kim.png',
  MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Th%E1%BB%95.png',
  THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Thu%E1%BB%B7.png',
  HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Ho%E1%BA%A3.png',
  THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20Ch%E1%BB%AF%20n%E1%BB%95i%20-%20Th%E1%BB%95(1).png'
};

const MIRROR_IMAGES_LINH_VAT: Record<string, string> = {
  KIM: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Kim.png',
  MOC: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20M%E1%BB%99c.png',
  THUY: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Thu%E1%BB%B7.png',
  HOA: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Ho%E1%BA%A3.png',
  THO: 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@c48b84d3facbd04f5e09e85c40f07bfa91de6368/BRAND%20ELEMENT%20(UPDATE)/G%C6%AF%C6%A0NG%20M%E1%BA%AAU/G%C6%B0%C6%A1ng%20linh%20v%E1%BA%ADt%20-%20Th%E1%BB%95.png'
};

const getCartItemImage = (item: any): string => {
  if (item.product?.category === 'mirror') {
    const isZodiacMode = item.customization?.customType === 'zodiac' || !!item.customization?.selectedZodiacCharmId;
    const mirrorMap = isZodiacMode ? MIRROR_IMAGES_LINH_VAT : MIRROR_IMAGES_CHU_NOI;
    return mirrorMap[item.customization?.element] || item.product?.images?.['none'] || '';
  }
  return item.product?.images?.[item.customization?.element] || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || '';
};

const getCategoryDisplayName = (categoryKey: string, currentLang: 'vi' | 'en') => {
  if (categoryKey === 'mirror') {
    return currentLang === 'vi' ? 'Gương Chạm Ánh Nhìn' : 'Glow Mirror';
  }
  if (categoryKey === 'clip-1') {
    return currentLang === 'vi' ? 'Kẹp Ánh Mây' : 'Cloud Glow Clip';
  }
  if (categoryKey === 'clip-2') {
    return currentLang === 'vi' ? 'Kẹp Pha Lê' : 'Crystal Clip';
  }
  return categoryKey;
};

const normalizeElement = (val: any): string => {
  if (!val) return '';
  const s = String(val).toUpperCase().trim();
  if (s.includes('THỦY') || s.includes('THUỶ') || s.includes('THUY')) return 'THUY';
  if (s.includes('HỎA') || s.includes('HOẢ') || s.includes('HOA')) return 'HOA';
  if (s.includes('KIM')) return 'KIM';
  if (s.includes('MỘC') || s.includes('MOC')) return 'MOC';
  if (s.includes('THỔ') || s.includes('THO')) return 'THO';
  return s;
};

const getElementName = (key: string, lang: 'vi' | 'en') => {
  if (!key) return '';
  const el = ELEMENTS.find(e => e.type === key.toUpperCase());
  return el ? (lang === 'vi' ? el.nameVi : el.nameEn) : key;
};

const getStickersDisplay = (ids: string[], lang: 'vi' | 'en') => {
  if (!ids || ids.length === 0) return '';
  return ids
    .map(id => {
      const c = CHARMS.find(charm => charm.id === id);
      return c ? (lang === 'vi' ? c.vietnameseName : c.name) : id;
    })
    .join(', ');
};

const getCharmName = (id: string, lang: 'vi' | 'en') => {
  if (!id) return '';
  const c = CHARMS.find(charm => charm.id === id);
  return c ? (lang === 'vi' ? c.vietnameseName : c.name) : id;
};

const getLetteringStyleName = (style: string, lang: 'vi' | 'en') => {
  if (!style) return '';
  if (style === 'embossed') return lang === 'vi' ? 'Chữ nổi (Acrylic)' : 'Embossed (Acrylic)';
  if (style === 'sticker') return lang === 'vi' ? 'Chữ dán (Sticker)' : 'Sticker Lettering';
  return style;
};

const getTextColorName = (colorOpt: string, lang: 'vi' | 'en') => {
  if (!colorOpt) return '';
  if (colorOpt === 'pink') return lang === 'vi' ? 'Hồng' : 'Pink';
  if (colorOpt === 'white') return lang === 'vi' ? 'Trắng' : 'White';
  if (colorOpt === 'gold') return lang === 'vi' ? 'Vàng' : 'Gold';
  if (colorOpt === 'silver') return lang === 'vi' ? 'Bạc' : 'Silver';
  return colorOpt;
};

const getItemDisplayName = (item: any, lang: 'vi' | 'en') => {
  if (!item?.product) return '';
  let itemName = lang === 'vi' ? item.product.vietnameseName : item.product.name;
  if (item.customization?.comboId === 'couple_combo') {
    return lang === 'vi' ? `Combo Chạm Cùng Nhau (${itemName})` : `Couple Combo (${itemName})`;
  } else if (item.customization?.comboId === 'mirror_combo') {
    return lang === 'vi' ? `Combo Chạm Ánh Nhìn (${itemName} & Gương)` : `Mirror Combo (${itemName} & Mirror)`;
  }
  return itemName;
};

const doesItemMatch = (item: any, filterCategory: string, filterElement: string) => {
  // 1. Resolve item category
  const itemCat = item.product?.category;
  const comboId = item.customization?.comboId;

  // Check if item belongs to the filter category
  let categoryMatches = false;
  if (filterCategory === 'ALL') {
    categoryMatches = true;
  } else if (filterCategory === 'mirror') {
    categoryMatches = (itemCat === 'mirror' || comboId === 'mirror_combo');
  } else if (filterCategory === 'clip-1') {
    categoryMatches = (itemCat === 'clip-1');
  } else if (filterCategory === 'clip-2') {
    categoryMatches = (itemCat === 'clip-2');
  }

  if (!categoryMatches) return false;

  // 2. Resolve item element(s) and check element match
  if (filterElement === 'ALL') {
    return true;
  }

  // Get normalized elements (with fallback to item product names/vietnamese names)
  let primaryElem = normalizeElement(item.customization?.element || item.product?.element);
  if (!primaryElem && item.product?.vietnameseName) {
    primaryElem = normalizeElement(item.product.vietnameseName);
  }
  if (!primaryElem && item.product?.name) {
    primaryElem = normalizeElement(item.product.name);
  }

  let partnerElem = normalizeElement(item.customization?.partnerElement);

  // If we only filter element (and filterCategory is ALL), we check if either part matches
  if (filterCategory === 'ALL') {
    return primaryElem === filterElement || partnerElem === filterElement;
  }

  // If we filter BOTH category and element, we must check if the SPECIFIC category part matches the element
  if (filterCategory === 'mirror') {
    // If it's a standalone mirror, check primary element
    if (itemCat === 'mirror') {
      return primaryElem === filterElement;
    }
    // If it's a mirror combo, the mirror part is P2, which corresponds to partnerElement
    if (comboId === 'mirror_combo') {
      return partnerElem === filterElement;
    }
    return false;
  }

  if (filterCategory === 'clip-1' || filterCategory === 'clip-2') {
    // For clips, the clip part is always P1, which corresponds to the primary element
    // In a couple/friendship combo (not mirror_combo), both parts are clips of this category
    if (comboId === 'mirror_combo') {
      return primaryElem === filterElement;
    }
    return primaryElem === filterElement || partnerElem === filterElement;
  }

  return false;
};

interface UserProfileProps {
  lang: 'vi' | 'en';
  onLanguageChange?: (lang: 'vi' | 'en') => void;
  onLogout: () => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  onSelectProduct?: (product: Product) => void;
}

interface Order {
  id: string;
  totalPrice?: number;
  total?: number;
  subtotal?: number;
  status: string;
  createdAt: any;
  items: any[];
  customerInfo?: any;
  paymentMethod?: string;
  paymentProofUrl?: string;
  paymentStatus?: string;
  deliveryMethod?: string;
  discountAmount?: number;
  discountCode?: string;
  packagingFee?: number;
  wrappingOption?: string;
  userId?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ lang, onLanguageChange, onLogout, wishlistIds = [], onToggleWishlist, onSelectProduct }) => {
  const isAllowedAdmin = auth.currentUser?.email === 'hoangphucunknown@gmail.com' || auth.currentUser?.email === 'hla0712006@gmail.com';
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites' | 'settings' | 'inventory'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [localInv, setLocalInv] = useState<any>(null);
  const [localHistory, setLocalHistory] = useState<any[]>([]);
  const [invSubTab, setInvSubTab] = useState<'stock' | 'history'>('stock');
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasUnsavedInventory, setHasUnsavedInventory] = useState(false);
  const [isSavingInventory, setIsSavingInventory] = useState(false);

  // States for Admin searching and editing orders
  const [searchOrderId, setSearchOrderId] = useState('');
  const [isEditingOrder, setIsEditingOrder] = useState(false);
  const [editOrderItems, setEditOrderItems] = useState<any[]>([]);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // States for order list filtering
  const [filterElement, setFilterElement] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [clientSearchText, setClientSearchText] = useState<string>('');

  const purgeOldTestOrders = async () => {
    try {
      const q = query(collection(db, 'orders'));
      const querySnapshot = await getDocs(q);
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      const deletePromises: any[] = [];
      
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const email = data.customerInfo?.email?.toLowerCase();
        if (email === 'hoangphucunknown@gmail.com' || email === 'hla0712006@gmail.com') {
          let createdAtMs = 0;
          if (data.createdAt) {
            if (typeof data.createdAt.toDate === 'function') {
              createdAtMs = data.createdAt.toDate().getTime();
            } else if (data.createdAt.seconds) {
              createdAtMs = data.createdAt.seconds * 1000;
            } else {
              createdAtMs = new Date(data.createdAt).getTime();
            }
          }
          if (createdAtMs && createdAtMs < oneDayAgo) {
            deletePromises.push(deleteDoc(doc(db, 'orders', docSnap.id)));
          }
        }
      });
      
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
        console.log(`Automatically purged ${deletePromises.length} old test orders.`);
      }
    } catch (err) {
      console.warn("Failed to automatically purge test orders:", err);
    }
  };

  const handleSearchOrder = async () => {
    if (!searchOrderId) return;
    try {
      setLoading(true);
      const docRef = doc(db, 'orders', searchOrderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const orderData = { id: docSnap.id, ...docSnap.data() } as Order;
        setSelectedOrder(orderData);
        setShowCancelConfirm(false);
        // Add to orders list if not already there so they can navigate back easily
        if (!orders.some(o => o.id === orderData.id)) {
          setOrders(prev => [orderData, ...prev]);
        }
      } else {
        alert(lang === 'vi' ? 'Không tìm thấy đơn hàng này.' : 'Order not found.');
      }
    } catch (err: any) {
      console.error("Error searching order:", err);
      alert(lang === 'vi' ? 'Lỗi khi tìm đơn hàng: ' + err.message : 'Error searching order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const executeCancelOrder = async () => {
    if (!selectedOrder) return;
    
    try {
      setIsSavingOrder(true);
      setShowCancelConfirm(false);
      const orderRef = doc(db, 'orders', selectedOrder.id);
      
      await updateDoc(orderRef, {
        status: lang === 'vi' ? 'Đã hủy' : 'Cancelled',
        updatedAt: new Date().toISOString()
      });
      
      // Send the updated info back to Google Sheets
      const sheetResponse = await fetch(`${API_BASE}/api/record-preorder-sheet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrder.id + " (Đã hủy)",
          customerInfo: selectedOrder.customerInfo || {},
          items: selectedOrder.items || [],
          subtotal: -(selectedOrder.subtotal || 0),
          packagingFee: -(selectedOrder.packagingFee || 0),
          total: -(selectedOrder.total || selectedOrder.totalPrice || 0),
          discountAmount: -(selectedOrder.discountAmount || 0),
          discountCode: selectedOrder.discountCode || '',
          wrappingOption: selectedOrder.wrappingOption || '',
          paymentMethod: selectedOrder.paymentMethod || '',
          paymentProofUrl: selectedOrder.paymentProofUrl || '',
          paymentStatus: lang === 'vi' ? 'Đã hủy' : 'Cancelled',
          deliveryMethod: selectedOrder.deliveryMethod || '',
          createdAt: selectedOrder.createdAt ? (selectedOrder.createdAt.seconds ? new Date(selectedOrder.createdAt.seconds * 1000).toISOString() : new Date(selectedOrder.createdAt).toISOString()) : new Date().toISOString(),
          userId: selectedOrder.userId || ''
        })
      });
      
      if (!sheetResponse.ok) {
        console.error("Failed to update Google Sheets on cancel");
      }

      const updatedOrder = {
        ...selectedOrder,
        status: lang === 'vi' ? 'Đã hủy' : 'Cancelled',
        updatedAt: new Date().toISOString()
      };
      
      setSelectedOrder(updatedOrder);
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
      
      await handleSyncFromFirebase(true);
      
      alert(lang === 'vi' ? 'Đã hủy đơn hàng thành công.' : 'Order cancelled successfully.');
    } catch (err: any) {
      console.error("Error cancelling order:", err);
      alert(lang === 'vi' ? 'Lỗi khi hủy đơn hàng: ' + err.message : 'Error cancelling order: ' + err.message);
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleSaveOrderEdit = async () => {
    if (!selectedOrder) return;
    if (editOrderItems.length === 0) {
      alert(lang === 'vi' ? 'Đơn hàng phải có ít nhất 1 sản phẩm. Nếu bạn muốn hủy đơn, hãy nhấn "Hủy Đơn Hàng".' : 'Order must have at least 1 item. If you want to cancel the order, please click "Cancel Order".');
      return;
    }
    try {
      setIsSavingOrder(true);
      const orderRef = doc(db, 'orders', selectedOrder.id);
      
      const newSubtotal = editOrderItems.reduce((sum, item) => sum + ((item.product?.price || item.product?.basePrice || 0) * item.quantity), 0);
      const packagingFee = selectedOrder.packagingFee || 0;
      const discountAmount = selectedOrder.discountAmount || 0;
      const newTotal = newSubtotal + packagingFee - discountAmount;

      // Update items array and totals in Firestore
      await updateDoc(orderRef, {
        items: editOrderItems,
        subtotal: newSubtotal,
        total: newTotal,
        updatedAt: new Date().toISOString()
      });
      
      // Send the updated info back to Google Sheets
      const sheetResponse = await fetch(`${API_BASE}/api/record-preorder-sheet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrder.id + " (Đã cập nhật)",
          customerInfo: selectedOrder.customerInfo || {},
          items: editOrderItems,
          subtotal: newSubtotal,
          packagingFee: packagingFee,
          total: newTotal,
          discountAmount: discountAmount,
          discountCode: selectedOrder.discountCode || '',
          wrappingOption: selectedOrder.wrappingOption || '',
          paymentMethod: selectedOrder.paymentMethod || '',
          paymentProofUrl: selectedOrder.paymentProofUrl || '',
          paymentStatus: selectedOrder.paymentStatus || '',
          deliveryMethod: selectedOrder.deliveryMethod || '',
          createdAt: selectedOrder.createdAt ? (selectedOrder.createdAt.seconds ? new Date(selectedOrder.createdAt.seconds * 1000).toISOString() : new Date(selectedOrder.createdAt).toISOString()) : new Date().toISOString(),
          userId: selectedOrder.userId || ''
        })
      });
      
      if (!sheetResponse.ok) {
        console.error("Failed to update Google Sheets");
      }

      // Update local state for active view
      const updatedOrder = {
        ...selectedOrder,
        items: editOrderItems,
        subtotal: newSubtotal,
        total: newTotal,
        updatedAt: new Date().toISOString()
      };
      setSelectedOrder(updatedOrder);
      
      // Update list
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
      
      // Trigger automatic inventory sync from real orders
      await handleSyncFromFirebase(true);
      
      setIsEditingOrder(false);
      alert(lang === 'vi' 
        ? 'Cập nhật đơn hàng và đồng bộ lại tồn kho thành công!' 
        : 'Order updated and inventory resynced successfully!');
    } catch (err: any) {
      console.error("Error saving order edit:", err);
      alert(lang === 'vi' 
        ? 'Lỗi khi cập nhật đơn hàng: ' + err.message 
        : 'Error updating order: ' + err.message);
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleReloadFromFirebase = async () => {
    setIsSyncing(true);
    try {
      const data = await fetchInventoryFromFirestore();
      if (data) {
        setLocalInv(data);
        setLocalHistory(getInventoryHistory());
        setHasUnsavedInventory(false);
        alert(lang === 'vi' ? 'Đã tải lại kho hàng từ Database!' : 'Reloaded inventory from Database!');
      } else {
        alert(lang === 'vi' ? 'Không tìm thấy dữ liệu trên Database.' : 'No data found in Database.');
      }
    } catch (e) {
      console.error(e);
      alert(lang === 'vi' ? 'Lỗi khi tải dữ liệu.' : 'Error loading data.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncFromFirebase = async (isAuto = false) => {
    if (!isAuto) {
      if (!window.confirm(lang === 'vi' ? 'CHÚ Ý: Hành động này sẽ TÍNH TOÁN LẠI kho hàng dựa trên đơn thực tế và XÓA BỎ các thay đổi số lượng bạn vừa lưu hoặc đang chỉnh sửa. Bạn có chắc chắn muốn tiếp tục?' : 'WARNING: This action will RECALCULATE the inventory based on real orders and OVERWRITE any manual stock changes you have made. Are you sure you want to continue?')) {
        return;
      }
    }
    
    try {
      setIsSyncing(true);
      // Automatically purge test orders older than 1 day before syncing
      await purgeOldTestOrders();

      const q = query(collection(db, 'orders'));
      const querySnapshot = await getDocs(q);
      const fetchedOrders: any[] = [];
      querySnapshot.forEach((docSnap) => {
        fetchedOrders.push({ id: docSnap.id, ...docSnap.data() });
      });
      
      const { fetchInitialInventoryFromFirestore } = await import('../lib/inventory');
      const baseInv = await fetchInitialInventoryFromFirestore();
      
      const { inv, history } = recalculateInventoryFromOrders(fetchedOrders, baseInv);
      setLocalInv(inv);
      setLocalHistory(history);
      if (!isAuto) {
        alert(lang === 'vi' 
          ? 'Đã đồng bộ số liệu tồn kho thành công! Hệ thống đã tự động tính toán lại lượng giảm kho dựa trên toàn bộ lịch sử đơn hàng thực tế của khách hàng (loại trừ đơn nháp và đơn đã hủy).' 
          : 'Successfully synchronized inventory levels! The system has automatically calculated accurate stock levels based on all real customer order histories (excluding drafts and cancelled orders).');
      }
    } catch (e: any) {
      console.error("Error syncing inventory:", e);
      if (!isAuto) {
        alert(lang === 'vi' ? 'Lỗi khi đồng bộ đơn hàng: ' + e.message : 'Error syncing orders: ' + e.message);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUpdateStockValue = (category: string, element: string, value: number, isCharm: boolean) => {
    const updated = JSON.parse(JSON.stringify(localInv || INITIAL_INVENTORY));
    const safeVal = Math.max(0, value);
    if (isCharm) {
      if (!updated.charms) updated.charms = {};
      updated.charms[element] = safeVal;
    } else {
      if (!updated.products) updated.products = {};
      if (!updated.products[category]) updated.products[category] = {};
      updated.products[category][element] = safeVal;
    }
    setLocalInv(updated);
    setHasUnsavedInventory(true);
  };

  const handleSaveInventory = async () => {
    if (!localInv) return;
    try {
      setIsSavingInventory(true);
      
      // Calculate diff to create admin log
      const currentDbInv = await fetchInventoryFromFirestore();
      const adminDecrements: any[] = [];
      
      if (currentDbInv) {
        Object.keys(localInv.products || {}).forEach(cat => {
          Object.keys(localInv.products[cat] || {}).forEach(el => {
            const currentVal = currentDbInv.products?.[cat]?.[el] || 0;
            const newVal = localInv.products[cat][el];
            if (currentVal !== newVal) {
              adminDecrements.push({
                category: cat,
                item: el,
                qty: currentVal - newVal, 
                type: 'product'
              });
            }
          });
        });
        
        Object.keys(localInv.charms || {}).forEach(el => {
          const currentVal = currentDbInv.charms?.[el] || 0;
          const newVal = localInv.charms[el];
          if (currentVal !== newVal) {
            adminDecrements.push({
              category: 'charms',
              item: `zodiac-${el}`,
              qty: currentVal - newVal,
              type: 'charm'
            });
          }
        });
      }
      
      const historyToSave = [...localHistory];
      if (adminDecrements.length > 0) {
        historyToSave.unshift({
          id: `LOG-ADMIN-${Date.now()}`,
          orderId: 'Admin Update',
          timestamp: new Date().toISOString(),
          decrements: adminDecrements
        });
        setLocalHistory(historyToSave);
      }
      
      await saveInventoryToFirestore(localInv, historyToSave.length > 0 ? historyToSave : undefined);
      setHasUnsavedInventory(false);
      alert(lang === 'vi' ? 'Lưu thay đổi kho hàng thành công!' : 'Inventory saved successfully!');
    } catch (err) {
      console.error(err);
      alert(lang === 'vi' ? 'Lỗi khi lưu kho hàng.' : 'Error saving inventory.');
    } finally {
      setIsSavingInventory(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'inventory') {
      if (!isAllowedAdmin) {
        setActiveTab('orders');
      } else {
        const loadInv = async () => {
          setIsSyncing(true);
          try {
            const data = await fetchInventoryFromFirestore();
            if (data) {
              setLocalInv(data);
              setLocalHistory(getInventoryHistory());
            } else {
              handleSyncFromFirebase(true);
            }
          } catch (e) {
            console.error(e);
          } finally {
            setIsSyncing(false);
          }
        };
        loadInv();
      }
    }
  }, [activeTab, isAllowedAdmin]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;
      try {
        setLoading(true);
        const q = isAllowedAdmin
          ? query(collection(db, 'orders'))
          : query(
              collection(db, 'orders'),
              where('userId', '==', auth.currentUser.uid)
            );
        const querySnapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
        });
        
        // Sort descending by createdAt explicitly client-side to avoid needing a composite index on Firestore
        fetchedOrders.sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });
        
        setOrders(fetchedOrders);
      } catch (error: any) {
        if (error?.message?.includes('client is offline')) {
          console.warn("Client is offline, unable to fetch orders.");
        } else {
          console.error("Error fetching orders:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
      setSelectedOrder(null);
    }
  }, [activeTab]);

  // Filter and search orders client-side
  const filteredOrders = orders.filter((order) => {
    // 1. Filter by client search text (order ID, customer name, phone, email, or product name)
    if (clientSearchText) {
      const lowerSearch = clientSearchText.toLowerCase();
      const matchesId = order.id.toLowerCase().includes(lowerSearch);
      
      const customerInfo = (order as any).customerInfo;
      const matchesCustomer = customerInfo ? (
        (customerInfo.name || '').toLowerCase().includes(lowerSearch) ||
        (customerInfo.phone || '').toLowerCase().includes(lowerSearch) ||
        (customerInfo.email || '').toLowerCase().includes(lowerSearch)
      ) : false;

      // Also match individual product names, categories, or elements in the order items
      const matchesProduct = order.items?.some((item: any) => {
        const pName = (item.product?.name || '').toLowerCase();
        const pViName = (item.product?.vietnameseName || '').toLowerCase();
        const pCategory = (item.product?.category || '').toLowerCase();
        
        // Normalize item elements
        const itemElem = normalizeElement(item.customization?.element || item.product?.element || pViName || pName);
        const itemPartnerElem = normalizeElement(item.customization?.partnerElement);
        
        // Normalize search term as an element
        const searchElem = normalizeElement(lowerSearch);
        
        // Element matching
        const matchesElement = (searchElem !== '' && (itemElem === searchElem || itemPartnerElem === searchElem));
        
        // Category display matching
        const categoryViName = pCategory === 'mirror' ? 'gương' : (pCategory === 'clip-1' ? 'kẹp ánh mây' : 'kẹp pha lê');
        const categoryEnName = pCategory === 'mirror' ? 'mirror' : (pCategory === 'clip-1' ? 'cloud clip' : 'crystal clip');
        
        const matchesCategory = categoryViName.includes(lowerSearch) || categoryEnName.includes(lowerSearch) || pCategory.includes(lowerSearch);

        return (
          pName.includes(lowerSearch) || 
          pViName.includes(lowerSearch) || 
          matchesElement ||
          matchesCategory
        );
      });

      if (!matchesId && !matchesCustomer && !matchesProduct) {
        return false;
      }
    }

    // 2. Filter by Element and Category (Item-level matching)
    if (filterElement !== 'ALL' || filterCategory !== 'ALL') {
      const hasMatchingItem = order.items?.some((item: any) => 
        doesItemMatch(item, filterCategory, filterElement)
      );
      if (!hasMatchingItem) return false;
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[#f4f4f4] rounded-full flex items-center justify-center mb-4 text-[#00687A]">
              <UserIcon className="w-10 h-10" />
            </div>
            <h2 className="font-bold text-slate-900 text-lg">{auth.currentUser?.displayName || 'User'}</h2>
            <p className="text-slate-500 text-sm mb-6 truncate w-full">{auth.currentUser?.email}</p>
            
            <div className="w-full flex justify-center mt-2">
              <PngLogoCircular className="h-8 w-auto opacity-50 grayscale" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mt-4 overflow-hidden">
            <nav className="flex flex-col">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'profile' ? 'text-[#00687A] bg-[#00687A]/5 border-l-4 border-[#00687A]' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
              >
                <UserIcon className="w-5 h-5" />
                {lang === 'vi' ? 'Hồ Sơ' : 'Profile'}
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'orders' ? 'text-[#00687A] bg-[#00687A]/5 border-l-4 border-[#00687A]' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
              >
                <Package className="w-5 h-5" />
                {lang === 'vi' ? 'Lịch Sử Đơn Hàng' : 'My Orders'}
              </button>
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'favorites' ? 'text-[#00687A] bg-[#00687A]/5 border-l-4 border-[#00687A]' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
              >
                <Heart className="w-5 h-5" />
                {lang === 'vi' ? 'Mục Yêu Thích' : 'My Favorites'}
              </button>
              {isAllowedAdmin && (
                <button 
                  onClick={() => setActiveTab('inventory')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'inventory' ? 'text-[#00687A] bg-[#00687A]/5 border-l-4 border-[#00687A]' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                >
                  <Database className="w-5 h-5" />
                  {lang === 'vi' ? 'Quản lý Kho' : 'Stock Tracker'}
                </button>
              )}
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'settings' ? 'text-[#00687A] bg-[#00687A]/5 border-l-4 border-[#00687A]' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
              >
                <Settings className="w-5 h-5" />
                {lang === 'vi' ? 'Cài Đặt' : 'Settings'}
              </button>
              <button 
                onClick={() => {
                   auth.signOut().then(onLogout);
                }}
                className="flex items-center gap-3 px-6 py-4 text-sm font-bold text-[#e4002b] hover:bg-red-50 border-l-4 border-transparent transition-colors"
              >
                <LogOut className="w-5 h-5" />
                {lang === 'vi' ? 'Đăng Xuất' : 'Sign Out'}
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 h-full min-h-[500px]">
              <div className="mb-8">
                {selectedOrder && (
                  <button onClick={() => setSelectedOrder(null)} className="text-sm font-bold text-[#00687A] flex items-center hover:underline mb-4">
                    <ChevronRight className="w-4 h-4 rotate-180" /> {lang === 'vi' ? 'Trở Lại' : 'Back to Orders'}
                  </button>
                )}
                <h2 className="text-2xl font-sans font-black text-[#00687A] tracking-wider uppercase">
                  {lang === 'vi' ? 'Lịch Sử Đơn Hàng' : 'My Orders'}
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  {selectedOrder ? (lang === 'vi' ? `Chi tiết đơn hàng ${selectedOrder.id}` : `Order details for ${selectedOrder.id}`) : (lang === 'vi' ? 'Xem lại lịch sử mua hàng và hành trình thiết kế của bạn.' : 'Review your purchase history and customized creations.')}
                </p>
              </div>

              {!selectedOrder && orders.length > 0 && (
                <div className="mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                  {/* Search Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div className={isAllowedAdmin ? 'md:col-span-2' : 'md:col-span-3'}>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {lang === 'vi' ? 'Tìm nhanh trong danh sách' : 'Quick Search List'}
                      </label>
                      <input
                        type="text"
                        placeholder={lang === 'vi' ? 'Nhập Mã Đơn, Tên, Số điện thoại hoặc Tên sản phẩm...' : 'Enter Order ID, Name, Phone or Product Name...'}
                        value={clientSearchText}
                        onChange={(e) => setClientSearchText(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00687A] transition-colors"
                      />
                    </div>
                    
                    {/* Direct ID Search for Admin */}
                    {isAllowedAdmin && (
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          {lang === 'vi' ? 'Tìm ID trên hệ thống (Firestore)' : 'Database Search ID'}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. bsC1aERCU6MTs..."
                            value={searchOrderId}
                            onChange={(e) => setSearchOrderId(e.target.value.trim())}
                            className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00687A] font-mono text-xs"
                          />
                          <button
                            onClick={handleSearchOrder}
                            className="px-4 py-2 bg-[#00687A] hover:bg-[#00687A]/90 text-white font-bold text-sm rounded-xl transition cursor-pointer shrink-0"
                          >
                            {lang === 'vi' ? 'Tìm' : 'Find'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Filters Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/50">
                    {/* Element Filter */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {lang === 'vi' ? 'Mệnh phong thủy (Bản Mệnh)' : 'Feng Shui Element'}
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { id: 'ALL', labelVi: 'Tất cả', labelEn: 'All' },
                          { id: 'KIM', labelVi: 'KIM', labelEn: 'KIM' },
                          { id: 'MOC', labelVi: 'MỘC', labelEn: 'MOC' },
                          { id: 'THUY', labelVi: 'THỦY', labelEn: 'THUY' },
                          { id: 'HOA', labelVi: 'HỎA', labelEn: 'HOA' },
                          { id: 'THO', labelVi: 'THỔ', labelEn: 'THO' },
                        ].map((elem) => (
                          <button
                            key={elem.id}
                            onClick={() => setFilterElement(elem.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                              filterElement === elem.id
                                ? 'bg-[#00687A] text-white border-[#00687A] shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {lang === 'vi' ? elem.labelVi : elem.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Product Line Filter */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        {lang === 'vi' ? 'Dòng sản phẩm' : 'Product Line'}
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { id: 'ALL', labelVi: 'Tất cả', labelEn: 'All' },
                          { id: 'mirror', labelVi: 'Gương', labelEn: 'Mirror' },
                          { id: 'clip-1', labelVi: 'Kẹp Ánh Mây', labelEn: 'Cloud Clip' },
                          { id: 'clip-2', labelVi: 'Kẹp Pha Lê', labelEn: 'Crystal Clip' },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setFilterCategory(cat.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                              filterCategory === cat.id
                                ? 'bg-[#00687A] text-white border-[#00687A] shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {lang === 'vi' ? cat.labelVi : cat.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reset Filters button if active */}
                  {(filterElement !== 'ALL' || filterCategory !== 'ALL' || clientSearchText !== '') && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          setFilterElement('ALL');
                          setFilterCategory('ALL');
                          setClientSearchText('');
                        }}
                        className="text-xs font-bold text-[#00687A] hover:text-[#00687A]/80 flex items-center gap-1 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        {lang === 'vi' ? 'Xóa bộ lọc' : 'Reset Filters'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 text-[#00687A]">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p className="font-medium text-sm animate-pulse">
                    {lang === 'vi' ? 'Đang tải đơn hàng...' : 'Loading your orders...'}
                  </p>
                </div>
              ) : selectedOrder ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
                    <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {lang === 'vi' ? 'Mã Đơn Tự Động' : 'Order ID'}: <span className="text-[#00687A]">{selectedOrder.id}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {selectedOrder.createdAt ? new Date(selectedOrder.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          {selectedOrder.status === 'Đã hủy' || selectedOrder.status === 'Cancelled' ? (
                            <>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                            </>
                          ) : (
                            <>
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </>
                          )}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wide ${selectedOrder.status === 'Đã hủy' || selectedOrder.status === 'Cancelled' ? 'text-rose-600' : 'text-slate-700'}`}>
                          {selectedOrder.status || (lang === 'vi' ? 'Đã Giao Vận' : 'Shipped')}
                        </span>
                      </div>
                    </div>
                    <div className="p-0 bg-white">
                      {selectedOrder.items?.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-6 p-6 border-b border-slate-100 last:border-b-0">
                          <div className="w-24 h-24 bg-[#f4f4f4] rounded-lg overflow-hidden shrink-0">
                            <img src={getCartItemImage(item)} alt={item.product?.name} className="w-full h-full object-cover mix-blend-multiply"  referrerPolicy="no-referrer"  />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <h4 className="font-bold text-slate-900 text-base">{getItemDisplayName(item, lang)}</h4>
                            <div className="text-sm text-slate-500 mt-2 space-y-1">
                              {item.customization?.comboId ? (
                                <div className="space-y-3">
                                  {/* Product 1 */}
                                  <div>
                                    <p className="font-semibold text-[#00687A] text-xs uppercase tracking-wider mb-1">
                                      {item.customization.comboId === 'mirror_combo' 
                                        ? (lang === 'vi' ? 'Sản Phẩm 1: Kẹp' : 'Product 1: Clip')
                                        : (lang === 'vi' ? 'Sản Phẩm 1: Kẹp 1' : 'Product 1: Clip 1')}
                                    </p>
                                    <div className="pl-3 border-l border-slate-200 space-y-0.5 text-xs">
                                      <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Mệnh:' : 'Element:'}</span> {getElementName(item.customization.element, lang)}</p>
                                      {item.customization.text && (
                                        <p>
                                          <span className="font-medium text-slate-700">
                                            {getLetteringStyleName(item.customization.letteringStyle, lang) || (lang === 'vi' ? 'Chữ:' : 'Text:')}
                                          </span>{' '}
                                          <span className="font-mono font-bold text-[#b89552] underline decoration-dotted">"{item.customization.text}"</span>
                                          {item.customization.textStyleOption && (
                                            <span className="text-slate-400"> ({lang === 'vi' ? 'Màu:' : 'Color:'} {getTextColorName(item.customization.textStyleOption, lang)})</span>
                                          )}
                                        </p>
                                      )}
                                      {item.customization.selectedZodiacCharmId && (
                                        <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Charm linh vật:' : 'Zodiac Charm:'}</span> {getCharmName(item.customization.selectedZodiacCharmId, lang)}</p>
                                      )}
                                      {item.customization.selectedStickerIds && item.customization.selectedStickerIds.length > 0 && (
                                        <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Trang trí:' : 'Decoration:'}</span> {getStickersDisplay(item.customization.selectedStickerIds, lang)}</p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Product 2 */}
                                  <div>
                                    <p className="font-semibold text-rose-600 text-xs uppercase tracking-wider mb-1">
                                      {item.customization.comboId === 'mirror_combo' 
                                        ? (lang === 'vi' ? 'Sản Phẩm 2: Gương Nguyệt Vân' : 'Product 2: Vanity Mirror')
                                        : (lang === 'vi' ? 'Sản Phẩm 2: Kẹp 2' : 'Product 2: Clip 2')}
                                    </p>
                                    <div className="pl-3 border-l border-slate-200 space-y-0.5 text-xs">
                                      <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Mệnh Gương (SP2):' : 'Element Mirror (P2):'}</span> {getElementName(item.customization.partnerElement, lang)}</p>
                                      {item.customization.text2 && (
                                        <p>
                                          <span className="font-medium text-slate-700">
                                            {getLetteringStyleName(item.customization.letteringStyle2 || item.customization.letteringStyle, lang) || (lang === 'vi' ? 'Chữ Gương (SP2):' : 'Text Mirror (P2):')}
                                          </span>{' '}
                                          <span className="font-mono font-bold text-[#b89552] underline decoration-dotted">"{item.customization.text2}"</span>
                                          {(item.customization.textStyleOption2 || item.customization.textStyleOption) && (
                                            <span className="text-slate-400"> ({lang === 'vi' ? 'Màu:' : 'Color:'} {getTextColorName(item.customization.textStyleOption2 || item.customization.textStyleOption, lang)})</span>
                                          )}
                                        </p>
                                      )}
                                      {item.customization.selectedZodiacCharmId2 && (
                                        <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Charm linh vật Gương (SP2):' : 'Zodiac Charm Mirror (P2):'}</span> {getCharmName(item.customization.selectedZodiacCharmId2, lang)}</p>
                                      )}
                                      {item.customization.selectedStickerIds2 && item.customization.selectedStickerIds2.length > 0 && (
                                        <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Trang trí Gương (SP2):' : 'Decoration Mirror (P2):'}</span> {getStickersDisplay(item.customization.selectedStickerIds2, lang)}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-0.5 text-xs">
                                  {item.customization?.element && (
                                    <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Hệ Bản Mệnh:' : 'Element:'}</span> {getElementName(item.customization.element, lang)}</p>
                                  )}
                                  {item.customization?.material && (
                                    <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Chất Liệu:' : 'Material:'}</span> {item.customization.material}</p>
                                  )}
                                  {item.customization?.text && (
                                    <p>
                                      <span className="font-medium text-slate-700">
                                        {getLetteringStyleName(item.customization.letteringStyle, lang) || (lang === 'vi' ? 'Khắc Chữ:' : 'Engraving:')}
                                      </span>{' '}
                                      <span className="font-mono font-bold text-[#b89552] underline decoration-dotted">"{item.customization.text}"</span>
                                      {item.customization.textStyleOption && (
                                        <span className="text-slate-400"> ({lang === 'vi' ? 'Màu:' : 'Color:'} {getTextColorName(item.customization.textStyleOption, lang)})</span>
                                      )}
                                    </p>
                                  )}
                                  {item.customization?.selectedZodiacCharmId && (
                                    <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Charm linh vật:' : 'Zodiac Charm:'}</span> {getCharmName(item.customization.selectedZodiacCharmId, lang)}</p>
                                  )}
                                  {item.customization?.selectedStickerIds && item.customization.selectedStickerIds.length > 0 && (
                                    <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Trang trí:' : 'Decoration:'}</span> {getStickersDisplay(item.customization.selectedStickerIds, lang)}</p>
                                  )}
                                </div>
                              )}
                              <p className="font-bold text-[#8A1538] mt-2 pt-1 text-sm">{(item.product?.price || 0).toLocaleString('vi-VN')} ₫ <span className="text-slate-400 font-medium text-xs">x {item.quantity}</span></p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-end text-right sm:mt-auto">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Subtotal</span>
                            <span className="font-bold text-slate-900">
                              {((item.product?.price || 0) * item.quantity).toLocaleString('vi-VN')} ₫
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {isEditingOrder ? (
                      <div className="p-6 bg-slate-50 border-t border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h3 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wide">
                          {lang === 'vi' ? 'Thay đổi thông tin sản phẩm' : 'Change Product Customization'}
                        </h3>
                        <div className="space-y-6">
                          {editOrderItems.map((item: any, idx: number) => (
                            <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                              <div className="flex justify-between items-center mb-3">
                                <div className="font-bold text-[#00687A] text-sm">
                                  {idx + 1}. {lang === 'vi' ? (item.product?.vietnameseName || item.product?.name) : item.product?.name}
                                </div>
                                <button
                                  onClick={() => {
                                    if (window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa sản phẩm này khỏi đơn hàng?' : 'Are you sure you want to remove this item from the order?')) {
                                      const updated = editOrderItems.filter((_: any, i: number) => i !== idx);
                                      setEditOrderItems(updated);
                                    }
                                  }}
                                  className="text-xs text-rose-500 font-bold hover:text-rose-700 hover:underline px-2 py-1"
                                >
                                  {lang === 'vi' ? 'Xóa món' : 'Remove Item'}
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Product Selection */}
                                <div>
                                  <label className="block text-xs font-bold text-slate-500 mb-1">
                                    {lang === 'vi' ? 'Loại sản phẩm' : 'Product Type'}
                                  </label>
                                  <select
                                    value={item.product?.id || ''}
                                    onChange={(e) => {
                                      const chosenProduct = PRODUCTS.find(p => p.id === e.target.value);
                                      if (chosenProduct) {
                                        const updated = [...editOrderItems];
                                        updated[idx].product = chosenProduct;
                                        if (!updated[idx].customization) {
                                          updated[idx].customization = {};
                                        }
                                        updated[idx].customization.productId = chosenProduct.id;
                                        updated[idx].itemImageUrl = getCartItemImage(updated[idx]);
                                        setEditOrderItems(updated);
                                      }
                                    }}
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#00687A]"
                                  >
                                    {PRODUCTS.map(p => (
                                      <option key={p.id} value={p.id}>
                                        {lang === 'vi' ? p.vietnameseName : p.name} ({(p.basePrice || 0).toLocaleString('vi-VN')} ₫)
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Element (Mệnh) */}
                                {item.customization && item.customization.element !== undefined && (
                                  <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">
                                      {lang === 'vi' ? 'Hệ Bản Mệnh' : 'Element'}
                                    </label>
                                    <select
                                      value={item.customization.element}
                                      onChange={(e) => {
                                        const updated = [...editOrderItems];
                                        updated[idx].customization.element = e.target.value;
                                        updated[idx].itemImageUrl = getCartItemImage(updated[idx]);
                                        setEditOrderItems(updated);
                                      }}
                                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#00687A]"
                                    >
                                      <option value="KIM">KIM (Kim)</option>
                                      <option value="HOA">HOA (Hỏa)</option>
                                      <option value="MOC">MOC (Mộc)</option>
                                      <option value="THUY">THUY (Thủy)</option>
                                      <option value="THO">THO (Thổ)</option>
                                    </select>
                                  </div>
                                )}
                                
                                {/* Partner Element (Mệnh Đối Tác) if present */}
                                {item.customization && item.customization.partnerElement !== undefined && (
                                  <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">
                                      {lang === 'vi' ? 'Mệnh Đối Tác (Combo)' : 'Partner Element (Combo)'}
                                    </label>
                                    <select
                                      value={item.customization.partnerElement}
                                      onChange={(e) => {
                                        const updated = [...editOrderItems];
                                        updated[idx].customization.partnerElement = e.target.value;
                                        updated[idx].itemImageUrl = getCartItemImage(updated[idx]);
                                        setEditOrderItems(updated);
                                      }}
                                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#00687A]"
                                    >
                                      <option value="KIM">KIM (Kim)</option>
                                      <option value="HOA">HOA (Hỏa)</option>
                                      <option value="MOC">MOC (Mộc)</option>
                                      <option value="THUY">THUY (Thủy)</option>
                                      <option value="THO">THO (Thổ)</option>
                                    </select>
                                  </div>
                                )}

                                {/* Text Customization 1 */}
                                {item.customization && item.customization.text !== undefined && (
                                  <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">
                                      {lang === 'vi' ? 'Chữ được ghi / nổi (SP1)' : 'Written / Embossed Text (P1)'}
                                    </label>
                                    <input
                                      type="text"
                                      value={item.customization.text || ''}
                                      onChange={(e) => {
                                        const updated = [...editOrderItems];
                                        updated[idx].customization.text = e.target.value;
                                        setEditOrderItems(updated);
                                      }}
                                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#00687A]"
                                      placeholder={lang === 'vi' ? 'Nhập tên/chữ...' : 'Enter name/text...'}
                                    />
                                  </div>
                                )}

                                {/* Text Customization 2 */}
                                {item.customization && item.customization.text2 !== undefined && (
                                  <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">
                                      {lang === 'vi' ? 'Chữ được ghi / nổi (SP2)' : 'Written / Embossed Text (P2)'}
                                    </label>
                                    <input
                                      type="text"
                                      value={item.customization.text2 || ''}
                                      onChange={(e) => {
                                        const updated = [...editOrderItems];
                                        updated[idx].customization.text2 = e.target.value;
                                        setEditOrderItems(updated);
                                      }}
                                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#00687A]"
                                      placeholder={lang === 'vi' ? 'Nhập tên/chữ SP2...' : 'Enter name/text P2...'}
                                    />
                                  </div>
                                )}

                                {/* Quantity */}
                                <div>
                                  <label className="block text-xs font-bold text-slate-500 mb-1">
                                    {lang === 'vi' ? 'Số lượng' : 'Quantity'}
                                  </label>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity || 1}
                                    onChange={(e) => {
                                      const updated = [...editOrderItems];
                                      updated[idx].quantity = Math.max(1, parseInt(e.target.value) || 1);
                                      setEditOrderItems(updated);
                                    }}
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#00687A]"
                                  />
                                </div>

                                {/* Zodiac Charm 1 */}
                                <div>
                                  <label className="block text-xs font-bold text-slate-500 mb-1">
                                    {lang === 'vi' ? 'Linh vật (SP1)' : 'Zodiac Charm (P1)'}
                                  </label>
                                  <select
                                    value={item.customization?.selectedZodiacCharmId || ''}
                                    onChange={(e) => {
                                      const updated = [...editOrderItems];
                                      if (!updated[idx].customization) updated[idx].customization = {};
                                      updated[idx].customization.selectedZodiacCharmId = e.target.value;
                                      setEditOrderItems(updated);
                                    }}
                                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#00687A]"
                                  >
                                    <option value="">{lang === 'vi' ? 'Không có linh vật' : 'No Charm'}</option>
                                    {CHARMS.filter(c => c.category === 'zodiac').map(c => (
                                      <option key={c.id} value={c.id}>
                                        {lang === 'vi' ? c.vietnameseName : c.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Zodiac Charm 2 (If applicable) */}
                                {(item.customization?.partnerElement !== undefined || item.customization?.text2 !== undefined || item.product?.category === 'clip-2' || item.product?.category === 'clip-3') && (
                                  <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">
                                      {lang === 'vi' ? 'Linh vật (SP2)' : 'Zodiac Charm (P2)'}
                                    </label>
                                    <select
                                      value={item.customization?.selectedZodiacCharmId2 || ''}
                                      onChange={(e) => {
                                        const updated = [...editOrderItems];
                                        if (!updated[idx].customization) updated[idx].customization = {};
                                        updated[idx].customization.selectedZodiacCharmId2 = e.target.value;
                                        setEditOrderItems(updated);
                                      }}
                                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#00687A]"
                                    >
                                      <option value="">{lang === 'vi' ? 'Không có linh vật' : 'No Charm'}</option>
                                      {CHARMS.filter(c => c.category === 'zodiac').map(c => (
                                        <option key={c.id} value={c.id}>
                                          {lang === 'vi' ? c.vietnameseName : c.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 justify-end mt-6">
                          <button
                            onClick={() => setIsEditingOrder(false)}
                            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition cursor-pointer"
                          >
                            {lang === 'vi' ? 'Hủy' : 'Cancel'}
                          </button>
                          <button
                            onClick={handleSaveOrderEdit}
                            disabled={isSavingOrder}
                            className="px-6 py-2 bg-[#00687A] hover:bg-[#00687A]/90 text-white rounded-xl text-sm font-bold disabled:opacity-50 flex items-center gap-1.5 transition cursor-pointer"
                          >
                            {isSavingOrder && <Loader2 className="w-4 h-4 animate-spin" />}
                            {lang === 'vi' ? 'Lưu & Khấu Trừ Kho' : 'Save & Deduct Stock'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                        {selectedOrder.status !== 'Đã hủy' && selectedOrder.status !== 'Cancelled' && (
                          showCancelConfirm ? (
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-rose-600">
                                {lang === 'vi' ? 'Bạn chắc chắn muốn hủy?' : 'Are you sure?'}
                              </span>
                              <button
                                onClick={executeCancelOrder}
                                disabled={isSavingOrder}
                                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-sm"
                              >
                                {lang === 'vi' ? 'Xác nhận' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setShowCancelConfirm(false)}
                                disabled={isSavingOrder}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm rounded-xl transition cursor-pointer"
                              >
                                {lang === 'vi' ? 'Quay lại' : 'Back'}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowCancelConfirm(true)}
                              disabled={isSavingOrder}
                              className="px-6 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm rounded-xl transition cursor-pointer shadow-sm border border-rose-200"
                            >
                              {lang === 'vi' ? 'Hủy Đơn Hàng' : 'Cancel Order'}
                            </button>
                          )
                        )}
                        {isAllowedAdmin && !showCancelConfirm && (
                          <button
                            onClick={() => {
                              setEditOrderItems(JSON.parse(JSON.stringify(selectedOrder.items || [])));
                              setIsEditingOrder(true);
                            }}
                            className="px-6 py-2 bg-[#00687A] hover:bg-[#00687A]/90 text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-sm"
                          >
                            {lang === 'vi' ? 'Chỉnh Sửa Đơn Hàng' : 'Edit Order Details'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-6">
                    <span className="text-slate-500 text-sm font-medium">
                      {lang === 'vi' ? 'Cảm ơn bạn đã đồng hành cùng Chạm.' : 'Thank you for choosing Chạm.'}
                    </span>
                    <div className="flex flex-col sm:items-end gap-1">
                      <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                        {lang === 'vi' ? 'Tổng Thanh Toán' : 'Total Price'}
                      </span>
                      <span className="font-black text-2xl text-[#8A1538]">
                        {(selectedOrder.totalPrice || selectedOrder.total || 0).toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                    <Package className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">
                    {lang === 'vi' ? 'Chưa Có Đơn Hàng Nào' : 'No Orders Yet'}
                  </h3>
                  <p className="text-slate-500 text-sm max-w-sm">
                    {lang === 'vi' ? 'Bạn chưa mua sản phẩm nào. Hãy khám phá và tùy chỉnh trang sức của riêng bạn.' : "You haven't placed any orders yet. Discover and customize your own bespoke jewelry."}
                  </p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-slate-400 border border-slate-100 shadow-sm">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">
                    {lang === 'vi' ? 'Không Tìm Thấy Đơn Hàng Phù Hợp' : 'No Matching Orders'}
                  </h3>
                  <p className="text-slate-400 text-xs max-w-sm">
                    {lang === 'vi' ? 'Không có đơn hàng nào khớp với các bộ lọc hiện tại của bạn. Thử thay đổi bộ lọc hoặc xóa tìm kiếm.' : "We couldn't find any orders matching your current filter settings. Try adjusting them."}
                  </p>
                  <button
                    onClick={() => {
                      setFilterElement('ALL');
                      setFilterCategory('ALL');
                      setClientSearchText('');
                    }}
                    className="mt-4 px-5 py-2 bg-[#00687A] hover:bg-[#00687A]/90 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm animate-bounce"
                  >
                    {lang === 'vi' ? 'Xóa tất cả bộ lọc' : 'Clear All Filters'}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            {lang === 'vi' ? 'Mã Đơn Tự Động' : 'Order ID'}: <span className="text-[#00687A]">{order.id}</span>
                          </span>
                          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {order.createdAt ? new Date(order.createdAt?.seconds * 1000).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            {lang === 'vi' ? 'Tổng Cộng' : 'Total'}
                          </span>
                          <span className="font-black text-lg text-[#8A1538]">
                            {(order.totalPrice || order.total || 0).toLocaleString('vi-VN')} ₫
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.items?.map((item: any, index: number) => (
                            <div key={index} className="flex gap-4 items-center">
                              <div className="w-16 h-16 bg-[#f4f4f4] rounded-lg overflow-hidden shrink-0">
                                <img src={getCartItemImage(item)} alt={item.product?.name} className="w-full h-full object-cover mix-blend-multiply"  referrerPolicy="no-referrer"  />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-slate-900 text-sm">{getItemDisplayName(item, lang)}</h4>
                                <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                                  {item.customization?.comboId ? (
                                    <>
                                      <span className="bg-[#00687A]/10 px-2 py-0.5 rounded text-[#00687A] font-medium">
                                        {lang === 'vi' ? 'SP1: ' : 'P1: '}{getElementName(item.customization.element, lang)}
                                      </span>
                                      <span className="bg-rose-50 px-2 py-0.5 rounded text-rose-700 font-medium">
                                        {item.customization.comboId === 'mirror_combo' 
                                          ? (lang === 'vi' ? 'Gương: ' : 'Mirror: ') 
                                          : (lang === 'vi' ? 'Kẹp 2: ' : 'Clip 2: ')}{getElementName(item.customization.partnerElement, lang)}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      {item.customization?.element && (
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                          {getElementName(item.customization.element, lang)}
                                        </span>
                                      )}
                                      {item.customization?.text && (
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                          "{item.customization.text}"
                                        </span>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="text-sm font-bold text-slate-700">x{item.quantity}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <span className="relative flex h-2.5 w-2.5">
                             {order.status === 'Đã hủy' || order.status === 'Cancelled' ? (
                               <>
                                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                               </>
                             ) : (
                               <>
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                               </>
                             )}
                           </span>
                           <span className={`text-xs font-bold uppercase tracking-wide ${order.status === 'Đã hủy' || order.status === 'Cancelled' ? 'text-rose-600' : 'text-slate-700'}`}>
                             {order.status || (lang === 'vi' ? 'Đã Giao Vận' : 'Shipped')}
                           </span>
                        </div>
                        <button onClick={() => { setSelectedOrder(order); setShowCancelConfirm(false); }} className="text-[#00687A] text-sm font-bold flex items-center gap-1 hover:text-[#E28C9A] transition-colors">
                          {lang === 'vi' ? 'Xem chi tiết' : 'View Details'}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 h-full min-h-[500px] flex items-center justify-center">
               <p className="text-slate-400 font-medium">{lang === 'vi' ? 'Thông tin cá nhân đang phát triển' : 'Profile section in development'}</p>
            </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 h-full min-h-[500px]">
              <div className="mb-8">
                <h2 className="text-2xl font-sans font-black text-[#00687A] tracking-wider uppercase">
                  {lang === 'vi' ? 'Sản Phẩm Yêu Thích' : 'My Favorites'}
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  {lang === 'vi' ? 'Những thiết kế bạn đã lưu để tùy chỉnh sau.' : 'Products you have saved to customize later.'}
                </p>
              </div>

              {wishlistIds.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4 text-rose-300">
                    <Heart className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">
                    {lang === 'vi' ? 'Chưa Có Sản Phẩm Nào' : 'No Favorites Yet'}
                  </h3>
                  <p className="text-slate-500 text-sm max-w-sm">
                    {lang === 'vi' ? 'Hãy tiếp tục khám phá và thả tim cho những sản phẩm bạn thích nhé.' : "Explore our catalog and heart the products you love."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRODUCTS.filter(p => wishlistIds.includes(p.id)).map((prod) => {
                    const trans = { 
                      name: lang === 'vi' ? prod.vietnameseName : prod.name, 
                      desc: lang === 'vi' ? (prod.vietnameseDescription || prod.description) : prod.description 
                    };
                    
                    return (
                      <div 
                        key={prod.id}
                        className="group relative bg-[#fcfcfc] rounded-2xl border border-slate-200/50 p-5 hover:border-[#E28C9A]/30 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                      >
                        <button 
                          type="button" 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleWishlist) onToggleWishlist(prod.id);
                          }}
                          className="absolute top-4 right-4 p-2 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors z-10"
                        >
                          <Heart className="w-4 h-4 fill-rose-500" />
                        </button>

                        <div 
                          onClick={() => onSelectProduct && onSelectProduct(prod)}
                          className="aspect-square w-full rounded-2xl bg-[#FBF5F2] flex items-center justify-center mb-4 overflow-hidden relative cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                        >
                          <div className="relative text-center scale-100 group-hover:scale-110 transition-transform duration-300 flex flex-col items-center w-full h-full p-6">
                            <img 
                              src={
                                prod.images?.['none'] 
                                  ? prod.images['none'] 
                                  : (prod.category.startsWith('clip') || prod.category === 'limited' ? dmkBrandElement1 : mirrorVintage)
                              } 
                              className="w-full h-full object-contain select-none drop-shadow-md" 
                              alt={trans.name}
                             referrerPolicy="no-referrer"  />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 
                              onClick={() => onSelectProduct && onSelectProduct(prod)}
                              className="font-bold text-[#00687A] text-base group-hover:text-[#E28C9A] transition-colors cursor-pointer line-clamp-1 font-serif"
                            >
                              {trans.name}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {trans.desc}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div>
                              <span className="text-[9px] text-slate-400 block font-bold uppercase leading-none">
                                {lang === 'vi' ? 'Giá từ' : 'Starting from'}
                              </span>
                              <span className="text-base font-black text-slate-800">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.basePrice)}
                              </span>
                            </div>
                            
                            <button
                              onClick={() => onSelectProduct && onSelectProduct(prod)}
                              className="px-3 py-1.5 bg-[#E28C9A] hover:bg-[#E28C9A]/90 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-sm"
                            >
                              <span>{lang === 'vi' ? 'Thiết Kế' : 'Design'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[500px]">
              <h2 className="text-2xl font-black text-[#00687A] tracking-wider uppercase mb-8">
                {lang === 'vi' ? 'Cài Đặt Hệ Thống' : 'System Settings'}
              </h2>
              
              <div className="max-w-md space-y-8">
                {/* Language Setting */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest border-b border-slate-100 pb-2">
                    {lang === 'vi' ? 'Ngôn Ngữ' : 'Language'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => onLanguageChange?.('vi')}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${lang === 'vi' ? 'border-[#00687A] bg-[#00687A]/5 text-[#00687A]' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      Tiếng Việt (VI)
                    </button>
                    <button 
                      onClick={() => onLanguageChange?.('en')}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${lang === 'en' ? 'border-[#00687A] bg-[#00687A]/5 text-[#00687A]' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      English (EN)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && localInv && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 h-full min-h-[500px] animate-in fade-in duration-300">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-sans font-black text-[#00687A] tracking-wider uppercase">
                    {lang === 'vi' ? 'Quản lý Kho hàng & Lịch sử giảm' : 'Inventory & Reduction History'}
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">
                    {lang === 'vi' ? 'Theo dõi số liệu tồn kho, điều chỉnh số lượng và xem chi tiết lịch sử khấu trừ khi đặt hàng.' : 'Track stock levels, modify quantities, and view detailed deduction history from orders.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    onClick={handleReloadFromFirebase}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-700 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 font-bold text-sm rounded-xl transition"
                  >
                    <Database className={`w-4 h-4 ${isSyncing ? 'animate-pulse' : ''}`} />
                    {lang === 'vi' ? 'Tải lại từ Database' : 'Reload from DB'}
                  </button>
                  <button
                    onClick={() => handleSyncFromFirebase(false)}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-4 py-2 border border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100 disabled:opacity-50 font-bold text-sm rounded-xl transition"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    {lang === 'vi' ? (isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ từ Đơn thực') : (isSyncing ? 'Syncing...' : 'Sync from Real Orders')}
                  </button>
                  <button
                    onClick={downloadInventoryCSV}
                    className="flex items-center gap-2 px-4 py-2 border border-[#00687A] text-[#00687A] hover:bg-teal-50 font-bold text-sm rounded-xl transition"
                  >
                    <Tag className="w-4 h-4" />
                    {lang === 'vi' ? 'Tải CSV Báo Cáo' : 'Export CSV'}
                  </button>
                  <button
                    onClick={handleSaveInventory}
                    disabled={!hasUnsavedInventory || isSavingInventory}
                    className={`flex items-center gap-2 px-4 py-2 border font-bold text-sm rounded-xl transition ${hasUnsavedInventory ? 'bg-[#00687A] text-white hover:bg-[#005161] border-[#00687A]' : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'}`}
                  >
                    <Save className={`w-4 h-4 ${isSavingInventory ? 'animate-spin' : ''}`} />
                    {lang === 'vi' ? (isSavingInventory ? 'Đang lưu...' : 'Lưu Thay Đổi') : (isSavingInventory ? 'Saving...' : 'Save Changes')}
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn khôi phục toàn bộ kho hàng về số lượng ban đầu không?' : 'Are you sure you want to restore the entire stock to initial levels?')) {
                        await saveInventoryToFirestore(INITIAL_INVENTORY, []);
                        setLocalInv(JSON.parse(JSON.stringify(INITIAL_INVENTORY)));
                        setLocalHistory([]);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 border border-[#990000] text-[#990000] hover:bg-red-50 font-bold text-sm rounded-xl transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {lang === 'vi' ? 'Reset Kho Ban Đầu' : 'Reset Stock'}
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-3 rounded-xl mb-6 leading-relaxed">
                {lang === 'vi' ? (
                  <>
                    <span className="font-bold">💡 Giải thích về số liệu:</span> Trước đây, các điều chỉnh số lượng tồn kho và lịch sử giảm là <span className="font-bold">thử nghiệm tạm thời</span> (lưu ở trình duyệt cá nhân/Local Storage) và không tự động phản ánh đúng lịch sử giảm thực tế từ các đơn hàng được khách hàng gửi lên cơ sở dữ liệu. Giờ đây, bạn có thể nhấn nút <span className="font-bold">"Đồng bộ từ Đơn thực"</span> ở trên để hệ thống tự động quét tất cả các đơn hàng thực tế trên cơ sở dữ liệu Firebase (bao gồm nơ, đá, mệnh thiết kế, sản phẩm...), tính toán khấu trừ chính xác từ kho gốc, và cập nhật lại số liệu kho thật 100%!
                  </>
                ) : (
                  <>
                    <span className="font-bold">💡 Stock level explanation:</span> Previously, stock level adjustments and reduction history were <span className="font-bold">simulated locally</span> (stored in the browser's Local Storage) and did not automatically reflect real-time customer orders stored on the database. You can now click <span className="font-bold">"Sync from Real Orders"</span> above to analyze all active Firebase database orders (custom elements, charms, products), automatically replay the subtractions from the starting stock, and generate a 100% accurate current inventory.
                  </>
                )}
              </div>

              {/* Sub tabs: Stock Levels vs Reduction History */}
              <div className="flex border-b border-slate-100 mb-6">
                <button
                  onClick={() => setInvSubTab('stock')}
                  className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${invSubTab === 'stock' ? 'border-[#00687A] text-[#00687A]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  {lang === 'vi' ? 'Số lượng tồn kho' : 'Stock Levels'}
                </button>
                <button
                  onClick={() => setInvSubTab('history')}
                  className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${invSubTab === 'history' ? 'border-[#00687A] text-[#00687A]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  {lang === 'vi' ? 'Lịch sử giảm kho' : 'Reduction History'}
                </button>
              </div>

              {invSubTab === 'stock' ? (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Products Grid */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{lang === 'vi' ? 'Các sản phẩm (Gương & Kẹp)' : 'Products (Mirrors & Clips)'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.keys(localInv.products || {}).map((categoryKey) => (
                        <div key={categoryKey} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                          <h4 className="font-bold text-slate-700 capitalize mb-3 text-sm flex items-center justify-between border-b border-slate-200 pb-2">
                            <span>
                              {getCategoryDisplayName(categoryKey, lang)}
                            </span>
                            <span className="text-xs font-normal text-slate-500 font-mono">{categoryKey}</span>
                          </h4>
                          <div className="space-y-3">
                            {Object.keys(localInv.products[categoryKey] || {}).map((elementKey) => {
                              const currentVal = localInv.products[categoryKey][elementKey];
                              return (
                                <div key={elementKey} className="flex justify-between items-center text-sm">
                                  <span className="font-mono font-bold text-slate-600 bg-white border border-slate-200 rounded px-2 py-0.5">
                                    {elementKey}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => handleUpdateStockValue(categoryKey, elementKey, currentVal - 1, false)}
                                      className="p-1 rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition-colors"
                                    >
                                      <Minus className="w-3.5 h-3.5 text-slate-600" />
                                    </button>
                                    <input
                                      type="number"
                                      value={currentVal}
                                      onChange={(e) => handleUpdateStockValue(categoryKey, elementKey, parseInt(e.target.value) || 0, false)}
                                      className="w-16 text-center border border-slate-300 rounded px-2 py-1 font-mono text-xs focus:ring-1 focus:ring-[#00687A] focus:outline-none"
                                    />
                                    <button
                                      onClick={() => handleUpdateStockValue(categoryKey, elementKey, currentVal + 1, false)}
                                      className="p-1 rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5 text-slate-600" />
                                    </button>
                                    {currentVal <= 0 ? (
                                      <span className="bg-red-100 text-[#990000] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                        {lang === 'vi' ? 'Hết hàng' : 'Sold Out'}
                                      </span>
                                    ) : currentVal <= 5 ? (
                                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                        {lang === 'vi' ? 'Sắp hết' : 'Low Stock'}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Charms Grid */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{lang === 'vi' ? 'Phụ kiện / Charms Hoàng Đạo' : 'Zodiac Charms'}</h3>
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 max-w-xl">
                      <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center justify-between border-b border-slate-200 pb-2">
                        <span>{lang === 'vi' ? 'Hệ Hoàng Đạo' : 'Zodiac Charms'}</span>
                        <span className="text-xs font-normal text-slate-500 font-mono">charms</span>
                      </h4>
                      <div className="space-y-3">
                        {Object.keys(localInv.charms || {}).map((elementKey) => {
                          const currentVal = localInv.charms[elementKey];
                          return (
                            <div key={elementKey} className="flex justify-between items-center text-sm">
                              <span className="font-mono font-bold text-slate-600 bg-white border border-slate-200 rounded px-2 py-0.5">
                                zodiac-{elementKey}
                              </span>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleUpdateStockValue('charms', elementKey, currentVal - 1, true)}
                                  className="p-1 rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5 text-slate-600" />
                                </button>
                                <input
                                  type="number"
                                  value={currentVal}
                                  onChange={(e) => handleUpdateStockValue('charms', elementKey, parseInt(e.target.value) || 0, true)}
                                  className="w-16 text-center border border-slate-300 rounded px-2 py-1 font-mono text-xs focus:ring-1 focus:ring-[#00687A] focus:outline-none"
                                />
                                <button
                                  onClick={() => handleUpdateStockValue('charms', elementKey, currentVal + 1, true)}
                                  className="p-1 rounded-full border border-slate-200 bg-white hover:bg-slate-100 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5 text-slate-600" />
                                </button>
                                {currentVal <= 0 ? (
                                  <span className="bg-red-100 text-[#990000] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                    {lang === 'vi' ? 'Hết hàng' : 'Sold Out'}
                                  </span>
                                ) : currentVal <= 2 ? (
                                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                    {lang === 'vi' ? 'Sắp hết' : 'Low Stock'}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">{lang === 'vi' ? 'Nhật ký trừ tồn kho tự động' : 'Automatic Stock Reduction Logs'}</h3>
                    {localHistory.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử giảm kho không?' : 'Are you sure you want to clear the reduction history?')) {
                            saveInventoryHistory([]);
                            setLocalHistory([]);
                          }
                        }}
                        className="text-xs font-bold text-red-500 hover:underline hover:text-red-700 transition-colors"
                      >
                        {lang === 'vi' ? 'Xóa lịch sử' : 'Clear History'}
                      </button>
                    )}
                  </div>

                  {localHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                      <History className="w-12 h-12 mb-3 opacity-40" />
                      <p className="text-sm font-medium">
                        {lang === 'vi' ? 'Chưa ghi nhận lượt giảm kho hàng nào.' : 'No stock reduction history recorded yet.'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === 'vi' ? 'Khi có đơn hàng mới được thiết kế và đặt hàng thành công, hệ thống sẽ tự động trừ kho và ghi nhận nhật ký tại đây.' : 'When a new order is placed, stock will be reduced and logged here automatically.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {localHistory.map((log) => (
                        <div key={log.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow bg-slate-50">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#00687A] bg-[#00687A]/5 px-2 py-1 rounded">
                                {log.id}
                              </span>
                              <span className="text-xs text-slate-500">
                                {new Date(log.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <div className="text-xs font-medium text-slate-600">
                              {log.orderId === 'Admin Update' ? (
                                <span className="font-bold text-[#00687A]">{lang === 'vi' ? 'Điều chỉnh thủ công (Admin)' : 'Manual Adjustment (Admin)'}</span>
                              ) : (
                                <>{lang === 'vi' ? 'Mã đơn hàng:' : 'Order ID:'} <span className="font-mono font-bold text-slate-900 underline">{log.orderId}</span></>
                              )}
                            </div>
                          </div>
                          <div className="space-y-2">
                            {(log.decrements || []).map((dec: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs font-bold uppercase ${dec.qty < 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {dec.qty < 0 ? `+${Math.abs(dec.qty)}` : `-${dec.qty}`}
                                  </span>
                                  <span className="text-slate-700 font-medium">
                                    {dec.type === 'charm' ? (lang === 'vi' ? 'Charm hoàng đạo' : 'Zodiac Charm') : (lang === 'vi' ? `Dòng ${getCategoryDisplayName(dec.category, lang)}` : `${getCategoryDisplayName(dec.category, lang)}`)}
                                  </span>
                                  <span className="font-mono font-bold text-slate-600 bg-white border border-slate-100 rounded px-1.5 py-0.5 text-xs">
                                    {dec.item}
                                  </span>
                                </div>
                                <span className="text-xs text-slate-400 font-mono">
                                  {dec.category}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
