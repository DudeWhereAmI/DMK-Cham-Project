import React, { useState, useEffect } from 'react';
import { Product, CustomizationState, CartItem, ElementType } from './types';
import { PRODUCTS, ELEMENTS, CHARMS, BASE_STYLES, LETTERING_PRICING, getProductBasePrice } from './data';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileNavigation';
import { TouchpointPage } from './components/TouchpointPage';
import { ShopGrid } from './components/ShopGrid';
import { LandingPage } from './components/LandingPage';
import { ProductVisualizer } from './components/ProductVisualizer';
import { CustomizerForm } from './components/CustomizerForm';
import { CartDrawer } from './components/CartDrawer';
import { AboutUs } from './components/AboutUs';
import { VisionMission } from './components/VisionMission';
import { WarrantyPolicy } from './components/WarrantyPolicy';
import { ReturnPolicy } from './components/ReturnPolicy';
import { ContactUs } from './components/ContactUs';
import { ElementSubpage } from './components/ElementSubpage';
import { CollectionLanding } from './components/CollectionLanding';
import { CollectionChamToi } from './components/CollectionChamToi';
import { CollectionChamDoi } from './components/CollectionChamDoi';
import { CollectionCombo } from './components/CollectionCombo';
import { MaterialsSubpage } from './components/MaterialsSubpage';
import { SignInForm } from './components/SignInForm';
import { RegisterForm } from './components/RegisterForm';
import { UserProfile } from './components/UserProfile';
import { CheckoutPage } from './components/CheckoutPage';
import { CartPage } from './components/CartPage';
import { checkIsInitiallySoldOut, checkIsSoldOut, fetchInventoryFromFirestore, checkIsCharmSoldOut } from './lib/inventory';

export const getAvailableElement = (categoryId: string, preferred: ElementType): ElementType => {
  if (!checkIsSoldOut(categoryId, preferred)) return preferred;
  const elements: ElementType[] = ['KIM', 'MOC', 'THUY', 'HOA', 'THO'];
  for (const el of elements) {
    if (!checkIsSoldOut(categoryId, el)) return el;
  }
  return preferred; // fallback
};

export const getInitialCharmSelection = (categoryId: string, preferred: ElementType = 'KIM') => {
  const elements: ElementType[] = ['KIM', 'MOC', 'THUY', 'HOA', 'THO'];
  
  // A charm is sold out if either the charm stock itself is <= 0 or the product element is sold out
  const isCharmSoldOut = (el: ElementType) => {
    return checkIsCharmSoldOut(el) || checkIsSoldOut(categoryId, el);
  };

  // 1. Check if ALL 5 elements/charms are sold out
  const allSoldOut = elements.every(el => isCharmSoldOut(el));
  if (allSoldOut) {
    return {
      element: getAvailableElement(categoryId, preferred),
      selectedZodiacCharmId: ''
    };
  }

  // 2. Try preferred element first (if not sold out)
  if (!isCharmSoldOut(preferred)) {
    return {
      element: preferred,
      selectedZodiacCharmId: `zodiac-${preferred.toLowerCase()}`
    };
  }

  // 3. Find first element that is not sold out
  for (const el of elements) {
    if (!isCharmSoldOut(el)) {
      return {
        element: el,
        selectedZodiacCharmId: `zodiac-${el.toLowerCase()}`
      };
    }
  }

  // Fallback
  return {
    element: getAvailableElement(categoryId, preferred),
    selectedZodiacCharmId: ''
  };
};
import { Sparkles, Star, ShoppingBag, Heart, Check, Facebook, Instagram, Twitter, Youtube, ChevronRight, Plus, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { PngLogoCircular } from './components/PngLogo';
import { auth, db } from './lib/firebase';
import { collection, query, where, getDocs, deleteDoc, addDoc, Timestamp } from 'firebase/firestore';

export const LogoVertical = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <PngLogoCircular className="h-14 md:h-16 w-auto max-w-[280px] drop-shadow-sm" />
    </div>
  );
};

export default function App() {
  // Navigation states with home view as default
  const [currentView, setCurrentView] = useState<'touchpoint' | 'home' | 'shop' | 'customizer' | 'about' | 'vision' | 'warranty' | 'return_policy' | 'contact' | 'element' | 'materials' | 'login' | 'register' | 'profile' | 'checkout' | 'cart' | 'collection_cham_than' | 'collection_cham_toi' | 'collection_cham_doi' | 'collection_combo'>('touchpoint');
  const [customizerBackState, setCustomizerBackState] = useState<{ view: string; elementId?: string } | null>(null);
  const [checkoutOrigin, setCheckoutOrigin] = useState<string>('home');
  const [chamToiInitialIndex, setChamToiInitialIndex] = useState(0);
  const [chamToiInitialProductId, setChamToiInitialProductId] = useState<string | undefined>(undefined);
  const [customizerMode, setCustomizerMode] = useState<'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided'>('full');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingView, setPendingView] = useState<string | null>(null);

  const handleNavigate = (view: string) => {
    setIsTransitioning(true);
    setPendingView(view);
    setTimeout(() => {
      setCurrentView(view as any);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => {
        setIsTransitioning(false);
        setPendingView(null);
      }, 500); // Wait a bit for fade-in of new view
    }, 600); // Fade out duration
  };
  const [activeTab, setActiveTab] = useState<'p1' | 'p2'>('p1');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedElementId, setSelectedElementId] = useState<string>('kim');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');
  
  const [shopFilter, setShopFilter] = useState<string>('all');
  const [globalDiscountCode, setGlobalDiscountCode] = useState('');
  const [isGlobalDiscountApplied, setIsGlobalDiscountApplied] = useState(false);
  
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isInventoryLoaded, setIsInventoryLoaded] = useState(false);
  const [inventoryVersion, setInventoryVersion] = useState(0);

  useEffect(() => {
    if (isCartOpen && typeof window.gtag === 'function') {
      const cartValue = cart.reduce((sum, item) => sum + (item.finalPrice * (item.quantity || 1)), 0);
      window.gtag('event', 'view_cart', {
        currency: 'VND',
        value: cartValue,
        items: cart.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.finalPrice,
          quantity: item.quantity || 1,
          item_category: item.product.category
        }))
      });
    }
  }, [isCartOpen]); // Intentionally omitting cart to only fire when cart opens

  useEffect(() => {
    const handleInvUpdate = () => setInventoryVersion(v => v + 1);
    window.addEventListener('inventory_updated', handleInvUpdate);
    return () => window.removeEventListener('inventory_updated', handleInvUpdate);
  }, []);

  useEffect(() => {
    fetchInventoryFromFirestore().then((res) => { console.log("Inventory loaded:", res);
      setIsInventoryLoaded(true);
    }).catch(err => {
      console.warn("Failed to fetch shared inventory from Firestore at startup:", err); alert("Inventory fetch failed: " + err.message);
      setIsInventoryLoaded(true);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(collection(db, 'wishlists'), where('userId', '==', user.uid));
        getDocs(q).then((snapshot) => {
          setWishlistIds(snapshot.docs.map(doc => doc.data().productId));
        }).catch(err => {
          if (err?.message?.includes('client is offline')) {
            console.warn("Client is offline, wishlist won't be loaded.");
          } else {
            console.error("Error loading wishlist:", err);
          }
        });
      } else {
        setWishlistIds([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleToggleWishlist = async (productId: string) => {
    if (!auth.currentUser) {
      triggerAlert(lang === 'vi' ? 'Vui lòng đăng nhập để lưu sản phẩm' : 'Please log in to save favorites');
      return;
    }
    const userId = auth.currentUser.uid;
    const isWished = wishlistIds.includes(productId);
    
    // Optismistic update
    setWishlistIds(prev => isWished ? prev.filter(id => id !== productId) : [...prev, productId]);
    
    try {
      if (isWished) {
        const q = query(collection(db, 'wishlists'), where('userId', '==', userId), where('productId', '==', productId));
        const snapshot = await getDocs(q);
        snapshot.forEach(doc => deleteDoc(doc.ref));
      } else {
        await addDoc(collection(db, 'wishlists'), { userId, productId, createdAt: Timestamp.now() });
        triggerAlert(lang === 'vi' ? 'Đã thêm vào mục Yêu Thích' : 'Added to Favorites');
      }
    } catch (e) {
      console.error("Error toggling wishlist:", e);
      // Revert on error
      setWishlistIds(prev => isWished ? [...prev, productId] : prev.filter(id => id !== productId));
    }
  };

  
  // Shopping cart persistence using localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cham_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('cham_cart', JSON.stringify(cart));
    } catch(e) {}
  }, [cart]);

  useEffect(() => {
    // Update browser URL so GA4 Enhanced Measurement tracks page changes correctly
    const path = '/' + (currentView === 'home' ? '' : currentView);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    
    // Manually trigger a page_view to be safe
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: currentView,
        page_location: window.location.href,
        page_path: path
      });
    }

    if (typeof window.gtag === 'function') {
      if (currentView === 'checkout') {
        const total = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
        window.gtag('event', 'begin_checkout', {
          currency: 'VND',
          value: total,
          items: cart.map(item => ({
            item_id: item.product.id,
            item_name: item.product.name,
            price: item.finalPrice,
            quantity: item.quantity,
            item_category: item.product.category
          }))
        });
      }

      if (currentView === 'shop' || currentView === 'home') {
        window.gtag('event', 'view_item_list', {
          item_list_id: currentView,
          item_list_name: currentView === 'shop' ? 'Shop All' : 'Featured Homepage',
          items: PRODUCTS.map((product, index) => ({
            item_id: product.id,
            item_name: product.name,
            price: product.basePrice,
            quantity: 1,
            item_category: product.category,
            index: index
          }))
        });
      }
    }
  }, [currentView, cart]);
  
  // Language switcher state
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  // Custom alert banners
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Customization state for current live editing
  const [customization, setCustomization] = useState<CustomizationState>({
    productId: 'kep-1',
    element: 'HOA', // Default starting element
    baseStyle: 'crystal',
    customType: 'zodiac',
    text: '',
    letteringStyle: 'embossed',
    textStyleOption: 'white',
    textColor: '#FFFFFF',
    selectedZodiacCharmId: 'zodiac-hoa', // Phoenix charm
    selectedStickerIds: [],
    text2: '',
    letteringStyle2: undefined,
    textStyleOption2: undefined,
    selectedZodiacCharmId2: '',
    selectedStickerIds2: [],
    uploadedPhotoUrl: undefined,
    sunlightMode: false,
  });

  // Recently Viewed State
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cham_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cham_recently_viewed', JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.error('Error saving recently viewed:', e);
    }
  }, [recentlyViewedIds]);

  const [suggestionTab, setSuggestionTab] = useState<'supporters' | 'recent'>('supporters');

  // Keep state sync when switching products
  const handleSelectProduct = (product: Product, elementOverride?: ElementType, customizerMode?: 'full' | 'font-only' | 'charm-only' | 'couple' | 'double-sided') => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'select_item', {
        item_list_id: currentView,
        item_list_name: currentView === 'shop' ? 'Shop All' : 'Featured Homepage',
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.basePrice,
          quantity: 1,
          item_category: product.category
        }]
      });

      window.gtag('event', 'view_item', {
        currency: 'VND',
        value: product.basePrice,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.basePrice,
          quantity: 1,
          item_category: product.category
        }]
      });
    }

    setSelectedProduct(product);
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== product.id);
      return [product.id, ...filtered].slice(0, 5);
    });
    
    setCustomizerBackState(prev => {
      if (currentView === 'customizer') return prev;
      return {
        view: currentView,
        elementId: elementOverride ? elementOverride.toLowerCase() : selectedElementId
      };
    });
    
    // Determine default element alignment based on product's theme color or default
    let defaultElement: ElementType = elementOverride || 'HOA'; // Default Hoả
    if (!elementOverride && product.id === 'hand-mirror') defaultElement = 'THUY'; // Soft Blue mirror
    
    defaultElement = getAvailableElement(product.category, defaultElement);

    setCustomization({
      productId: product.id,
      element: defaultElement,
      baseStyle: 'crystal',
      customType: 'zodiac',
      text: '',
      letteringStyle: undefined,
      textColor: '#FFFFFF',
      selectedZodiacCharmId: `zodiac-${defaultElement.toLowerCase()}`,
      selectedStickerIds: [],
      text2: '',
      letteringStyle2: undefined,
      selectedZodiacCharmId2: '',
      selectedStickerIds2: [],
      uploadedPhotoUrl: undefined,
      sunlightMode: false,
    });
    
    setCustomizerMode(customizerMode || 'full');
    handleNavigate('customizer');
  };

  // Cost calculator
  const calculateBasePrice = (): number => {
    let base = getProductBasePrice(selectedProduct.id, customization.element);
    if (customizerMode === 'couple' && customization.comboId) {
      if (customization.comboId === 'couple_combo') {
        base = base * 2;
      } else if (customization.comboId === 'mirror_combo') {
        base = base + getProductBasePrice('guong', customization.element);
      }
    }
    return base;
  };

  const calculateLivePrice = (): number => {
    let price = calculateBasePrice();

    // Lettering fee applied if user selected a lettering style
    if (customization.letteringStyle && customizerMode !== 'charm-only') {
      price += LETTERING_PRICING[customization.letteringStyle] || 0;
    }

    // Lettering fee for Product 2 (couple combo only)
    if (customizerMode === 'couple' && customization.letteringStyle2 && customizerMode !== 'charm-only') {
      price += LETTERING_PRICING[customization.letteringStyle2] || 0;
    }

    // Charm overlay selector modifier (Zodiac charm is 5k)
    if (customization.selectedZodiacCharmId) {
      const charmProfile = CHARMS.find((c) => c.id === customization.selectedZodiacCharmId);
      if (charmProfile) {
        price += charmProfile.priceModifier;
      }
    }

    // Charm overlay selector modifier for Product 2 (couple combo only)
    if (customizerMode === 'couple' && customization.selectedZodiacCharmId2) {
      const charmProfile = CHARMS.find((c) => c.id === customization.selectedZodiacCharmId2);
      if (charmProfile) {
        price += charmProfile.priceModifier;
      }
    }

    // Stickers price calculation (Temporarily free)
    if (customization.selectedStickerIds) {
      customization.selectedStickerIds.forEach(id => {
        const charmProfile = CHARMS.find(c => c.id === id);
        if (charmProfile) {
          // Temporarily free: do not add priceModifier
          // price += charmProfile.priceModifier;
        }
      });
    }

    // Stickers price calculation for Product 2 (couple combo only) (Temporarily free)
    if (customizerMode === 'couple' && customization.selectedStickerIds2) {
      customization.selectedStickerIds2.forEach(id => {
        const charmProfile = CHARMS.find(c => c.id === id);
        if (charmProfile) {
          // Temporarily free: do not add priceModifier
          // price += charmProfile.priceModifier;
        }
      });
    }

    return price;
  };

  const getAllSelectedCharms = () => {
    const charms = [];
    const zodiac = CHARMS.find(c => c.id === customization.selectedZodiacCharmId);
    if (zodiac) charms.push(zodiac);
    
    customization.selectedStickerIds.forEach(id => {
      const sticker = CHARMS.find(c => c.id === id);
      if (sticker) charms.push(sticker);
    });
    
    return charms;
  };

  const currentElementProfile = ELEMENTS.find((e) => e.type === customization.element) || ELEMENTS[0];
  const livePrice = calculateLivePrice();

  // Alert triggers
  const triggerAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
  };

  // Add customized accessory into cart drawer
  const handleAddToCart = (qty: number = 1) => {
    const finalPrice = calculateLivePrice();
    
    // Enforce mirror exclusivity rule (cannot have both charm and text)
    const finalCustomization = { ...customization };
    if (selectedProduct.category === 'mirror') {
      if (finalCustomization.letteringStyle) {
        finalCustomization.selectedZodiacCharmId = '';
      }
    }
    if (customizerMode === 'couple' && finalCustomization.comboId === 'mirror_combo') {
      if (finalCustomization.letteringStyle2) {
        finalCustomization.selectedZodiacCharmId2 = '';
      }
    }

    const newCartItem: CartItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      product: selectedProduct,
      customization: finalCustomization,
      finalPrice,
      quantity: qty,
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        currency: 'VND',
        value: finalPrice * qty,
        items: [{
          item_id: selectedProduct.id,
          item_name: selectedProduct.name,
          price: finalPrice,
          quantity: qty,
          item_category: selectedProduct.category
        }]
      });
    }

    setCart((prevCart) => [...prevCart, newCartItem]);
    triggerAlert(`✨ Successfully added customized "${selectedProduct.name}" to your Bespoke Bag!`);
    setIsCartOpen(true);
  };

  const handleAddToCartFromPicks = (item: CartItem) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        currency: 'VND',
        value: item.finalPrice,
        items: [{
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.finalPrice,
          quantity: item.quantity || 1,
          item_category: item.product.category
        }]
      });
    }

    setCart((prevCart) => [...prevCart, item]);
    triggerAlert(lang === 'vi' ? 'Đã thêm nhanh sản phẩm vào giỏ hàng!' : 'Quickly added item to bag!');
  };

  const handleBuyNow = (qty: number = 1) => {
    const finalPrice = calculateLivePrice();
    
    // Enforce mirror exclusivity rule (cannot have both charm and text)
    const finalCustomization = { ...customization };
    if (selectedProduct.category === 'mirror') {
      if (finalCustomization.letteringStyle) {
        finalCustomization.selectedZodiacCharmId = '';
      }
    }
    if (customizerMode === 'couple' && finalCustomization.comboId === 'mirror_combo') {
      if (finalCustomization.letteringStyle2) {
        finalCustomization.selectedZodiacCharmId2 = '';
      }
    }

    const newCartItem: CartItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      product: selectedProduct,
      customization: finalCustomization,
      finalPrice,
      quantity: qty,
    };

    setCart([newCartItem]);
    setCheckoutOrigin(currentView);
    setCurrentView('checkout');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleRemoveItem = (id: string) => {
    const itemToRemove = cart.find(item => item.id === id);
    if (itemToRemove && typeof window.gtag === 'function') {
      window.gtag('event', 'remove_from_cart', {
        currency: 'VND',
        value: itemToRemove.finalPrice * itemToRemove.quantity,
        items: [{
          item_id: itemToRemove.product.id,
          item_name: itemToRemove.product.name,
          price: itemToRemove.finalPrice,
          quantity: itemToRemove.quantity,
          item_category: itemToRemove.product.category
        }]
      });
    }
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
       setNewsletterStatus('error');
       setNewsletterMsg(lang === 'vi' ? 'Email không hợp lệ' : 'Invalid email format');
       return;
    }
    
    setNewsletterStatus('loading');
    setNewsletterMsg('');
    try {
      await addDoc(collection(db, 'subscribers'), {
        email: newsletterEmail,
        createdAt: Timestamp.now(),
      });
      setNewsletterStatus('success');
      setNewsletterMsg(lang === 'vi' ? 'Đăng ký thành công!' : 'Successfully subscribed!');
      setNewsletterEmail('');
      setTimeout(() => {
        setNewsletterStatus('idle');
        setNewsletterMsg('');
      }, 5000);
    } catch (err) {
      console.error("Error adding subscriber: ", err);
      setNewsletterStatus('error');
      setNewsletterMsg(lang === 'vi' ? 'Có lỗi xảy ra' : 'An error occurred');
    }
  };

  // Navigation handlers
  const handleBackToShop = () => {
    if (customizerBackState) {
      if (customizerBackState.elementId) {
        setSelectedElementId(customizerBackState.elementId);
      }
      setCurrentView(customizerBackState.view as any);
    } else {
      setCurrentView('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isInventoryLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="w-8 h-8 animate-spin text-[#00687A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col font-sans relative">
      {/* Loading Transition Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#FAFAF8] flex flex-col items-center justify-center transition-all duration-500 pointer-events-none ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`transition-all duration-500 delay-100 flex flex-col items-center justify-center ${isTransitioning ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
          <img 
            src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@4f54e36f4edb0f4fb21768cae473d0fbcf33c436/LOGO%20.png" 
            alt="Chạm Logo" 
            className="h-20 md:h-24 w-auto object-contain drop-shadow-sm opacity-90 mx-auto mb-4"
            referrerPolicy="no-referrer"
          />
          <span className="font-serif font-black uppercase tracking-widest text-lg md:text-xl text-[#00687A]">
            Chạm Elements
          </span>
        </div>
      </div>
      
      <div className={`flex-1 flex flex-col transition-opacity duration-300 ${isTransitioning && pendingView ? 'opacity-0' : 'opacity-100'} flex flex-col justify-between bg-transparent relative`}>

      {/* Global Background Pattern at the very bottom */}
      <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@1d210243f851f1f56d6a41ba5c73144ff8636c8f/Des276%20(1000%20x%20500%20px).png" alt="" className="fixed inset-0 w-full h-full object-cover pointer-events-none -z-50" referrerPolicy="no-referrer"  />
      
      {/* Warm beige overlay on top of the pattern */}
      <div className="fixed inset-0 w-full h-full bg-[#FBF5F2]/40 pointer-events-none -z-40" />
      
      {/* Brand Header */}
      {currentView !== 'touchpoint' && (
        <Navbar 
          cart={cart}
          currentView={currentView}
          onNavigate={(view) => {
            if (view === 'shop') {
              setShopFilter('all');
              setCurrentView('shop');
            } else {
              setCurrentView(view);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateElement={(id) => {
            setSelectedElementId(id);
            handleNavigate('element');
          }}
          onNavigateMaterials={() => {
            handleNavigate('materials');
          }}
          onOpenCart={() => setIsCartOpen(true)}
          lang={lang}
          onLanguageChange={(newLang) => setLang(newLang)}
        />
      )}

      {/* Floating global notification alert banner */}
      {alertMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 font-sans">
          <div className="bg-slate-900 border border-[#E28C9A]/30 text-white rounded-2xl p-4 shadow-xl flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold font-mono tracking-wider text-[#E28C9A] uppercase">Chạm Studio Alert</p>
              <p className="text-xs font-semibold text-slate-100 mt-0.5 leading-relaxed">{alertMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content body */}
      {currentView === 'touchpoint' && (
        <TouchpointPage 
          lang={lang}
          onNavigateHome={() => handleNavigate('home')}
          onNavigateLogin={() => handleNavigate('login')}
          onNavigateRegister={() => handleNavigate('register')}
        />
      )}

      {currentView !== 'touchpoint' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 0: BRAND LANDING PAGE AKA TRANG CHU */}
        {currentView === 'home' && (
          <LandingPage 
            lang={lang} 
            onEnterShop={() => {
              handleNavigate('shop');
            }}
            onNavigateCollection={(collectionId) => {
              if (collectionId === 'collection-01') setCurrentView('collection_cham_toi');
              else if (collectionId === 'collection-02') setCurrentView('collection_cham_than');
              else if (collectionId === 'collection-03') handleNavigate('collection_cham_doi');
            }}
          />
        )}

        {/* VIEW: COLLECTION LANDING */}
        {currentView === 'collection_cham_than' && (
          <CollectionLanding
            lang={lang}
            initialElementId={selectedElementId}
            onNavigateCustomizer={(elementId, productId) => {
              setCustomizerMode('charm-only');
              const product = PRODUCTS.find(p => p.id === productId);
              if (product) setSelectedProduct(product);
              
              setCustomization({
                productId: product ? product.id : 'kep-1',
                element: getAvailableElement(product?.category || 'clip-1', elementId.toUpperCase() as ElementType),
                baseStyle: 'crystal',
                customType: 'zodiac',
                text: '',
                letteringStyle: undefined,
                textColor: '#FFFFFF',
                selectedZodiacCharmId: `zodiac-${elementId.toLowerCase()}`,
                selectedStickerIds: [],
              });
              setCustomizerBackState({
                view: 'collection_cham_than',
                elementId: elementId.toLowerCase()
              });
              handleNavigate('customizer');
            }}
          />
        )}

        {/* VIEW: COLLECTION CHAM TOI */}
        {currentView === 'collection_cham_toi' && (
          <CollectionChamToi
            lang={lang}
            initialActiveIndex={chamToiInitialIndex}
            initialSelectedProductId={chamToiInitialProductId}
            onNavigateCustomizer={(fontId, productId) => {
              const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
              setSelectedProduct(product);
              setCustomization({
                productId: productId,
                element: getAvailableElement(product.category, 'HOA'),
                baseStyle: 'crystal',
                customType: 'zodiac',
                text: 'CHAM',
                letteringStyle: fontId as 'sticker' | 'embossed',
                textStyleOption: fontId === 'sticker' ? 'silver' : 'white',
                textColor: '#FFFFFF',
                selectedZodiacCharmId: '',
                selectedStickerIds: [],
              });
              setCustomizerMode('font-only');
              setCustomizerBackState({
                view: 'collection_cham_toi'
              });
              handleNavigate('customizer');
            }}
          />
        )}

        {/* VIEW: COLLECTION CHAM DOI */}
        {currentView === 'collection_cham_doi' && (
          <CollectionChamDoi
            lang={lang}
            onNavigateCustomizer={(styleId, productId) => {
              setCustomizerMode('double-sided');
              
              const product = PRODUCTS.find(p => p.id === productId);
              if (product) setSelectedProduct(product);
              
              const initSelection = getInitialCharmSelection(product?.category || 'clip-1', 'KIM');
              
              setCustomization({
                productId: product ? product.id : productId,
                element: initSelection.element,
                baseStyle: 'crystal',
                customType: 'zodiac',
                text: 'CHAM',
                letteringStyle: 'embossed',
                textStyleOption: 'white',
                textColor: '#FFFFFF',
                selectedZodiacCharmId: initSelection.selectedZodiacCharmId,
                selectedStickerIds: [],
                text2: 'CHAM',
                letteringStyle2: 'embossed',
                textStyleOption2: 'white',
                selectedZodiacCharmId2: initSelection.selectedZodiacCharmId,
                selectedStickerIds2: []
              });
              
              setCustomizerBackState({
                view: 'collection_cham_doi'
              });
              handleNavigate('customizer');
            }}
          />
        )}

        {/* VIEW: COLLECTION COMBO */}
        {currentView === 'collection_combo' as any && (
          <CollectionCombo
            lang={lang}
            onNavigateCustomizer={(comboId, clipStyleId) => {
              setCustomizerMode('couple');
              
              // Find the selected base product
              const defaultProductId = clipStyleId; // 'kep-1' or 'kep-2'
              const product = PRODUCTS.find(p => p.id === defaultProductId);
              if (product) setSelectedProduct(product);
              
              const initSelection = getInitialCharmSelection(product?.category || 'clip-1', 'KIM');
              const partnerCat = comboId === 'mirror_combo' ? 'mirror' : (product?.category || 'clip-1');
              const partnerInitSelection = getInitialCharmSelection(partnerCat, 'KIM');
              
              setActiveTab(comboId === 'mirror_combo' ? 'p2' : 'p1');

              setCustomization({
                productId: product ? product.id : defaultProductId,
                element: initSelection.element,
                partnerElement: partnerInitSelection.element,
                comboId: comboId as 'couple_combo' | 'mirror_combo',
                baseStyle: 'crystal',
                customType: 'zodiac',
                text: '',
                letteringStyle: undefined,
                textColor: '#FFFFFF',
                selectedZodiacCharmId: initSelection.selectedZodiacCharmId,
                selectedStickerIds: [],
                text2: '',
                letteringStyle2: undefined,
                selectedZodiacCharmId2: partnerInitSelection.selectedZodiacCharmId,
                selectedStickerIds2: [],
                sunlightMode: false,
              });
              
              setCustomizerBackState({
                view: 'collection_combo'
              });
              handleNavigate('customizer');
            }}
          />
        )}

        {/* VIEW X: ELEMENT SUBPAGE */}
        {currentView === 'element' && (
          <ElementSubpage 
            elementId={selectedElementId}
            lang={lang}
            onNavigateBack={() => {
              setCurrentView('home');
              setTimeout(() => {
                const el = document.getElementById('encyclopedia-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onEnterShop={(productId) => {
              setCustomizerMode('charm-only');
              const product = PRODUCTS.find(p => p.id === productId);
              if (product) setSelectedProduct(product);
              
              setCustomization({
                productId: product ? product.id : 'kep-1',
                element: getAvailableElement(product?.category || 'clip-1', selectedElementId.toUpperCase() as ElementType),
                baseStyle: 'crystal',
                customType: 'zodiac',
                text: '',
                letteringStyle: undefined,
                textColor: '#FFFFFF',
                selectedZodiacCharmId: `zodiac-${selectedElementId.toLowerCase()}`,
                selectedStickerIds: [],
              });
              setCustomizerBackState({
                view: 'element',
                elementId: selectedElementId.toLowerCase()
              });
              handleNavigate('customizer');
            }}
          />
        )}

        {/* VIEW Y: MATERIALS SUBPAGE */}
        {currentView === 'materials' && (
          <MaterialsSubpage 
            lang={lang}
            onNavigateHome={() => {
              handleNavigate('home');
            }}
            onNavigateShop={() => {
              handleNavigate('shop');
            }}
          />
        )}

        {/* VIEW 1: SHOP CATALOG VIEW */}
        {currentView === 'shop' && (
          <ShopGrid 
            onSelectProduct={handleSelectProduct} 
            lang={lang} 
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            initialFilter={shopFilter}
            onNavigate={(view) => {
              handleNavigate(view);
            }}
          />
        )}

        {/* VIEW 2: PRODUCT CUSTOMIZER DETAILED WORKBENCH */}
        {currentView === 'customizer' && (
          <div className="flex flex-col gap-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
              
              {/* Left Column sticky layout viewer */}
              <div className="lg:col-span-7 lg:sticky lg:top-24 self-start">
                <ProductVisualizer
                  product={selectedProduct}
                  element={currentElementProfile}
                  customization={customization}
                  selectedCharms={getAllSelectedCharms()}
                  onUpdateCustomization={(updater) => setCustomization(prev => ({ ...prev, ...updater }))}
                  mode={customizerMode}
                  lang={lang}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>

              {/* Right Column Customizer Input Selector controls */}
              <div className="lg:col-span-5">
                <CustomizerForm
                  product={selectedProduct}
                  customization={customization}
                  onUpdate={(updater) => setCustomization(prev => ({ ...prev, ...updater }))}
                  onBackToShop={handleBackToShop}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  totalPrice={livePrice}
                  basePrice={calculateBasePrice()}
                  lang={lang}
                  mode={customizerMode}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>

            </div>

          </div>
        )}

        {/* VIEW 3: ABOUT US EDITORIAL */}
        {currentView === 'about' && (
          <AboutUs lang={lang} />
        )}

        {/* VIEW 4: VISION, MISSION, AND VALUES BENTO */}
        {currentView === 'vision' && (
          <VisionMission lang={lang} />
        )}

        {/* VIEW 5: WARRANTY & RETURNS POLICY */}
        {currentView === 'warranty' && (
          <WarrantyPolicy lang={lang} />
        )}

        {/* VIEW 7: RETURN POLICY */}
        {currentView === 'return_policy' && (
          <ReturnPolicy lang={lang} />
        )}

        {/* VIEW 6: CONTACT US FORM */}
        {currentView === 'contact' && (
          <ContactUs lang={lang} />
        )}

        {/* VIEW: CHECKOUT */}
        {currentView === 'checkout' && (
          <CheckoutPage 
            cart={cart}
            lang={lang}
            globalDiscountCode={globalDiscountCode}
            setGlobalDiscountCode={setGlobalDiscountCode}
            isGlobalDiscountApplied={isGlobalDiscountApplied}
            setIsGlobalDiscountApplied={setIsGlobalDiscountApplied}
            onNavigateHome={() => {
              handleNavigate('home');
            }}
            onNavigateToShop={() => {
              handleNavigate(checkoutOrigin);
            }}
            onNavigateToLogin={() => {
              handleNavigate('login');
            }}
            clearCart={handleClearCart}
            onCheckoutSuccess={() => {
              handleClearCart();
              setGlobalDiscountCode('');
              setIsGlobalDiscountApplied(false);
              setCurrentView('home');
              triggerAlert(lang === 'vi' ? 'Đặt hàng thành công!' : 'Order placed successfully!');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentUser={auth.currentUser}
          />
        )}

        {/* VIEW: CART PAGE */}
        {currentView === 'cart' && (
          <CartPage 
            cart={cart}
            lang={lang}
            globalDiscountCode={globalDiscountCode}
            setGlobalDiscountCode={setGlobalDiscountCode}
            isGlobalDiscountApplied={isGlobalDiscountApplied}
            setIsGlobalDiscountApplied={setIsGlobalDiscountApplied}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigateToCheckout={() => {
              setCheckoutOrigin('home');
              handleNavigate('checkout');
            }}
            onNavigateHome={() => {
              handleNavigate('shop');
            }}
            onAddToCart={handleAddToCartFromPicks}
          />
        )}

        {/* VIEW 8: USER LOGIN */}
        {currentView === 'login' && (
          <SignInForm 
            lang={lang} 
            onNavigateRegister={() => {
              handleNavigate('register');
            }}
            onLoginSuccess={() => {
              handleNavigate('profile');
            }}
          />
        )}

        {/* VIEW 9: USER REGISTER */}
        {currentView === 'register' && (
          <RegisterForm 
            lang={lang} 
            onNavigateLogin={() => {
              handleNavigate('login');
            }}
            onLoginSuccess={() => {
              handleNavigate('profile');
            }}
          />
        )}

        {/* VIEW 10: USER PROFILE */}
        {currentView === 'profile' && (
          <UserProfile
            lang={lang}
            onLanguageChange={(newLang) => setLang(newLang)}
            onLogout={() => {
              handleNavigate('home');
            }}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
          />
        )}

      </main>
      )}

      {currentView !== 'touchpoint' && (
        <>
          {/* Shared Cart Drawer controller */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            lang={lang}
            onNavigateReturnPolicy={() => {
               setIsCartOpen(false);
               handleNavigate('return_policy');
            }}
            onNavigateToCheckout={() => {
               setCheckoutOrigin('home');
               setIsCartOpen(false);
               handleNavigate('checkout');
            }}
            onNavigateToCart={() => {
               setIsCartOpen(false);
               handleNavigate('cart');
            }}
            onNavigateHome={() => {
               setIsCartOpen(false);
               handleNavigate('home');
            }}
          />

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav 
            cart={cart}
            currentView={currentView}
            onNavigate={(view) => {
              setIsCartOpen(false);
              if (view === 'shop') {
                setShopFilter('all');
                handleNavigate('shop');
              } else {
                handleNavigate(view);
              }
            }}
            onOpenCart={() => setIsCartOpen(true)}
            lang={lang}
            onLanguageChange={(newLang) => setLang(newLang)}
          />

          {/* Style footer branding */}
          <footer className="bg-[#00687A] text-[#FBF5F2] pt-16 pb-28 md:pb-8 mt-16 shadow-inner font-sans relative overflow-hidden">
            {/* Subtle decorative background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url('https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10 items-start">
                
                {/* Left Column: Logo, Socials & Support */}
                <div className="flex flex-col gap-10 lg:col-span-5 pt-2">
                  <div className="flex flex-col items-center gap-6">
                    <button 
                      type="button"
                      onClick={() => { handleNavigate('home'); }}
                      className="group cursor-pointer hover:opacity-90 transition-opacity flex justify-center w-full"
                    >
                      <img 
                        src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@4f54e36f4edb0f4fb21768cae473d0fbcf33c436/LOGO%20.png" 
                        alt="Chạm Logo" 
                        className="h-32 sm:h-40 md:h-44 w-auto object-contain drop-shadow-2xl"
                        referrerPolicy="no-referrer"
                       />
                    </button>
                    <div className="flex items-center justify-center gap-4 text-white w-full -mt-2">
                      <a href="https://www.facebook.com/profile.php?id=61591049410705" target="_blank" rel="noopener noreferrer" className="hover:bg-white hover:text-[#00687A] transition-colors p-2.5 rounded-full border border-white/70 flex justify-center items-center h-10 w-10">
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a href="https://www.tiktok.com/@cham.elements?_r=1&_t=ZS-97WdJdLmO6H" target="_blank" rel="noopener noreferrer" className="hover:bg-white hover:text-[#00687A] transition-colors p-2.5 rounded-full border border-white/70 flex justify-center items-center h-10 w-10">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.23-2.61.88-5.26 2.87-6.87 1.4-.95 3.12-1.36 4.79-1.12.02 1.25-.01 2.49.02 3.73-.78-.1-1.57-.1-2.32.18-.75.29-1.35.88-1.63 1.63-.3.8-.26 1.72.16 2.49.46.85 1.34 1.45 2.3 1.51 1.4.11 2.8-.57 3.51-1.74.37-.62.59-1.35.59-2.09V.02h4.52z"/></svg>
                      </a>
                    </div>
                  </div>

                  {/* Customer Support */}
                  <div className="flex flex-col gap-4 text-sm text-left w-full lg:max-w-sm mt-4">
                     <div className="flex items-start gap-4 text-white">
                       <MapPin className="w-6 h-6 flex-shrink-0 mt-0.5" />
                       <p className="font-bold uppercase leading-tight tracking-wide text-sm">
                         UEH - Cơ sở B - 279 Nguyễn Tri Phương, Phường Diên Hồng, TP.HCM
                       </p>
                     </div>
                     <div className="flex items-start gap-4 text-white">
                       <Phone className="w-6 h-6 flex-shrink-0 mt-0.5" />
                       <div className="flex flex-col gap-1">
                         <a href="tel:0918620232" className="font-bold uppercase tracking-wide text-sm hover:text-gray-200 transition">
                           0918 620 232 (Ms. Hà Anh)
                         </a>
                         <a href="tel:0365092373" className="font-bold uppercase tracking-wide text-sm hover:text-gray-200 transition">
                           0365 092 373 (Mr. Anh Khôi)
                         </a>
                       </div>
                     </div>
                     <div className="flex items-center gap-4 text-white">
                       <Mail className="w-6 h-6 flex-shrink-0" />
                       <a href="mailto:cham.elements@gmail.com" className="font-bold tracking-wide text-sm hover:text-gray-200 transition">
                         cham.elements@gmail.com
                       </a>
                     </div>
                  </div>
                </div>

                {/* Right Column: Links, Payment, Newsletter */}
                <div className="hidden lg:flex flex-col gap-10 lg:col-span-7 pt-2 lg:pl-8 justify-between h-full">
              {/* Top Row: Hỗ Trợ & Câu Chuyện */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-8 text-sm text-center lg:text-left">
                 {/* Hỗ Trợ */}
                 <div className="flex flex-col gap-5 items-center lg:items-start w-full">
                    <h3 className="font-black text-white uppercase text-base tracking-wider mb-2">
                      {lang === 'vi' ? 'Hỗ Trợ' : 'Help Centre'}
                    </h3>
                    <button onClick={() => { handleNavigate('contact'); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Liên Hệ' : 'Contact Us'}
                    </button>
                    <button onClick={() => { handleNavigate('warranty'); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Chính Sách Bảo Hành' : 'Warranty Rights'}
                    </button>
                    <button onClick={() => { handleNavigate('return_policy'); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Chính Sách Đổi Trả' : 'Returns & Refunds'}
                    </button>
                 </div>

                 {/* Câu Chuyện */}
                 <div className="flex flex-col gap-5 items-center lg:items-start w-full">
                    <h3 className="font-black text-white uppercase text-base tracking-wider mb-2">
                      {lang === 'vi' ? 'Câu Chuyện' : 'Our Story'}
                    </h3>
                    <button onClick={() => { handleNavigate('about'); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Về Chúng Tôi' : 'About Us'}
                    </button>
                    <button onClick={() => { handleNavigate('vision'); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Tầm Nhìn' : 'Vision'}
                    </button>
                 </div>
              </div>

              {/* Bottom Row: Thanh Toán & Newsletter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-8 text-sm text-center lg:text-left items-start mt-4 lg:mt-0">
                 {/* Payment */}
                 <div className="flex flex-col gap-5 items-center lg:items-start w-full">
                    <h3 className="font-black text-white uppercase text-base tracking-wider mb-0 lg:mb-2">
                      {lang === 'vi' ? 'Thanh Toán' : 'Payment'}
                    </h3>
                    <div className="flex flex-col gap-2 w-full lg:max-w-[280px] justify-center lg:justify-start">
                      {/* Row 1: Cash and MoMo */}
                      <div className="flex gap-2 w-full">
                        <div className="h-10 flex-1 bg-white rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-default">
                          <span className="font-black text-[#00687A] text-xs uppercase tracking-wider">CASH</span>
                        </div>
                        <div className="h-10 flex-1 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2 overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-default">
                          <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@1a5b754e8930371efb213eda348b1e56f82ec6ef/MOMO-Logo-App.png" alt="MoMo" className="h-full w-full object-contain" referrerPolicy="no-referrer"  />
                        </div>
                      </div>
                      {/* Row 2: VietQR */}
                      <div className="h-10 w-full bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2 overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-default">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/VietQR_Logo.png" alt="VietQR" className="h-full object-contain max-w-[80px]" referrerPolicy="no-referrer"  />
                      </div>
                    </div>
                 </div>

                 {/* Newsletter */}
                 <div className="flex flex-col gap-5 items-center lg:items-start w-full">
                    <h3 className="font-black text-white uppercase text-base tracking-wider mb-0 lg:mb-2">
                      {lang === 'vi' ? 'Đăng Ký Nhận Tin' : 'Newsletter'}
                    </h3>
                    <form className="flex w-full shadow-md lg:max-w-xs relative flex-col gap-2" onSubmit={handleNewsletterSubmit}>
                      <div className="flex w-full relative">
                        <input 
                          required 
                          type="email" 
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          disabled={newsletterStatus === 'loading'}
                          placeholder={lang === 'vi' ? "Email của bạn" : "Email address"} 
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder:text-white/60 text-xs focus:outline-none focus:border-white/50 disabled:opacity-50" 
                        />
                        <button 
                          type="submit" 
                          disabled={newsletterStatus === 'loading'}
                          className="bg-white text-[#00687A] px-5 py-3 rounded-r-lg font-bold text-xs uppercase hover:bg-white/90 transition border border-white whitespace-nowrap disabled:opacity-50"
                        >
                           {newsletterStatus === 'loading' ? (lang === 'vi' ? 'Đang gửi...' : 'Sending...') : (lang === 'vi' ? 'Gửi' : 'Join')}
                        </button>
                      </div>
                      {newsletterMsg && (
                        <div className={`text-xs ${newsletterStatus === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {newsletterMsg}
                        </div>
                      )}
                    </form>
                 </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar Container */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-xs text-white pt-8 pb-4">
            <p className="font-bold opacity-80 uppercase tracking-widest">&copy; CHẠM</p>
            <div className="flex items-center gap-6 flex-wrap justify-center font-semibold opacity-80">
              <button className="hover:opacity-100 hover:underline transition uppercase tracking-wide">
                {lang === 'vi' ? 'Điều Khoản Của Chạm' : 'Terms & Conditions'}
              </button>
              <button className="hover:opacity-100 hover:underline transition uppercase tracking-wide">
                {lang === 'vi' ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}
              </button>
              <button className="hover:opacity-100 hover:underline transition uppercase tracking-wide">
                {lang === 'vi' ? 'Cài Đặt Cookie' : 'Cookie Settings'}
              </button>
              <button onClick={() => { handleNavigate('contact'); }} className="hover:opacity-100 hover:underline transition uppercase tracking-wide">
                {lang === 'vi' ? 'Liên Hệ' : 'Contact Us'}
              </button>
            </div>
          </div>
        </div>
      </footer>
      </>
      )}
      </div>
    </div>
  );
}
