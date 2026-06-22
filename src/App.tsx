import { useState, useEffect } from 'react';
import { Product, CustomizationState, CartItem, ElementType } from './types';
import { PRODUCTS, ELEMENTS, CHARMS, BASE_STYLES, LETTERING_PRICING } from './data';
import { Navbar } from './components/Navbar';
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
import { MaterialsSubpage } from './components/MaterialsSubpage';
import { SignInForm } from './components/SignInForm';
import { RegisterForm } from './components/RegisterForm';
import { UserProfile } from './components/UserProfile';
import { CheckoutPage } from './components/CheckoutPage';
import { CartPage } from './components/CartPage';
import { Sparkles, Star, ShoppingBag, Heart, Check, Facebook, Instagram, Twitter, Youtube, ChevronRight, Plus } from 'lucide-react';
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
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'customizer' | 'about' | 'vision' | 'warranty' | 'return_policy' | 'contact' | 'element' | 'materials' | 'login' | 'register' | 'profile' | 'checkout' | 'cart'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedElementId, setSelectedElementId] = useState<string>('kim');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(collection(db, 'wishlists'), where('userId', '==', user.uid));
        getDocs(q).then((snapshot) => {
          setWishlistIds(snapshot.docs.map(doc => doc.data().productId));
        }).catch(err => console.error("Error loading wishlist:", err));
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
    localStorage.setItem('cham_cart', JSON.stringify(cart));
  }, [cart]);
  
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
    letteringStyle: 'sticker',
    textColor: '#FFFFFF',
    selectedZodiacCharmId: 'zodiac-hoa', // Phoenix charm
    selectedStickerIds: [],
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
  const handleSelectProduct = (product: Product, elementOverride?: ElementType) => {
    setSelectedProduct(product);
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== product.id);
      return [product.id, ...filtered].slice(0, 5);
    });
    
    // Determine default element alignment based on product's theme color or default
    let defaultElement: ElementType = elementOverride || 'HOA'; // Default Hoả
    if (!elementOverride && product.id === 'hand-mirror') defaultElement = 'THUY'; // Soft Blue mirror

    setCustomization({
      productId: product.id,
      element: defaultElement,
      baseStyle: 'crystal',
      customType: 'zodiac',
      text: '',
      letteringStyle: 'sticker',
      textColor: '#FFFFFF',
      selectedZodiacCharmId: `zodiac-${defaultElement.toLowerCase()}`,
      selectedStickerIds: [],
      uploadedPhotoUrl: undefined,
      sunlightMode: false,
    });
    
    setCurrentView('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cost calculator
  const calculateLivePrice = (): number => {
    let price = selectedProduct.basePrice;

    // Lettering fee applied if user typed a name/monogram
    if (customization.text) {
      price += LETTERING_PRICING[customization.letteringStyle];
    }

    // Charm overlay selector modifier (Zodiac charm is 5k)
    if (customization.selectedZodiacCharmId) {
      const charmProfile = CHARMS.find((c) => c.id === customization.selectedZodiacCharmId);
      if (charmProfile) {
        price += charmProfile.priceModifier;
      }
    }

    // Stickers price calculation
    if (customization.selectedStickerIds) {
      customization.selectedStickerIds.forEach(id => {
        const charmProfile = CHARMS.find(c => c.id === id);
        if (charmProfile) {
          price += charmProfile.priceModifier;
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
  const handleAddToCart = () => {
    const finalPrice = calculateLivePrice();
    const newCartItem: CartItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      product: selectedProduct,
      customization: { ...customization },
      finalPrice,
      quantity: 1,
    };

    setCart((prevCart) => [...prevCart, newCartItem]);
    triggerAlert(`✨ Successfully added customized "${selectedProduct.name}" to your Bespoke Bag!`);
    setIsCartOpen(true);
  };

  const handleAddToCartFromPicks = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
    triggerAlert(lang === 'vi' ? 'Đã thêm nhanh sản phẩm vào giỏ hàng!' : 'Quickly added item to bag!');
  };

  const handleBuyNow = () => {
    const finalPrice = calculateLivePrice();
    const newCartItem: CartItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      product: selectedProduct,
      customization: { ...customization },
      finalPrice,
      quantity: 1,
    };

    setCart((prevCart) => [...prevCart, newCartItem]);
    setCurrentView('checkout');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Navigation handlers
  const handleBackToShop = () => {
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Brand Header */}
      <Navbar 
        cart={cart}
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateElement={(id) => {
          setSelectedElementId(id);
          setCurrentView('element');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateMaterials={() => {
          setCurrentView('materials');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCart={() => setIsCartOpen(true)}
        lang={lang}
        onLanguageChange={(newLang) => setLang(newLang)}
      />

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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 0: BRAND LANDING PAGE AKA TRANG CHU */}
        {currentView === 'home' && (
          <LandingPage 
            lang={lang} 
            onEnterShop={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateElement={(id) => {
              setSelectedElementId(id);
              setCurrentView('element');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateAbout={() => {
              setCurrentView('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateMaterials={() => {
              setCurrentView('materials');
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
              const el = document.getElementById('encyclopedia-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onEnterShop={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW Y: MATERIALS SUBPAGE */}
        {currentView === 'materials' && (
          <MaterialsSubpage 
            lang={lang}
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateShop={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
            recentlyViewedIds={recentlyViewedIds}
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
                  lang={lang}
                />
              </div>

            </div>

            {/* Other Also Viewed Section */}
            <div className="w-full relative mt-8">
              <div className="flex justify-center flex-wrap gap-4 mb-8">
                <button 
                  onClick={() => setSuggestionTab('supporters')}
                  className={`px-6 py-2.5 rounded-full border shadow-sm text-sm font-bold uppercase tracking-wider transition-all duration-300
                    ${suggestionTab === 'supporters' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'}`}
                >
                  {lang === 'vi' ? 'SẢN PHẨM KHÁC' : 'SUPPORTERS ALSO VIEWED'}
                </button>
                <button 
                  onClick={() => setSuggestionTab('recent')}
                  className={`px-6 py-2.5 rounded-full border shadow-sm text-sm font-bold uppercase tracking-wider transition-all duration-300
                    ${suggestionTab === 'recent' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'}`}
                >
                  {lang === 'vi' ? 'ĐÃ XEM GẦN ĐÂY' : 'RECENTLY VIEWED'}
                </button>
              </div>
              
              <div className="relative group/carousel">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar min-h-[350px]">
                  {(() => {
                    const displayedSuggestedProducts = suggestionTab === 'recent'
                      ? recentlyViewedIds.map(id => PRODUCTS.find(p => p.id === id)).filter((p): p is Product => Boolean(p) && p.id !== selectedProduct.id)
                      : PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 6);
                    
                    if (displayedSuggestedProducts.length === 0) {
                       return (
                         <div className="w-full flex items-center justify-center p-12 text-gray-500 font-medium text-sm">
                           {lang === 'vi' ? 'Chưa có sản phẩm nào được xem gần đây.' : 'No recently viewed items yet.'}
                         </div>
                       );
                    }

                    return displayedSuggestedProducts.map((item) => (
                      <div 
                        key={item.id} 
                        className="group cursor-pointer flex flex-col relative shrink-0 w-[260px] snap-center"
                        onClick={() => {
                          handleSelectProduct(item);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <div className="relative aspect-[4/5] bg-[#F1F1F1] rounded-xl overflow-hidden mb-3">
                          <img 
                            src={item.images && Object.values(item.images).length > 0 ? (item.images['none'] || Object.values(item.images)[0]) : undefined}
                            alt={item.name}
                            className="w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-500 pointer-events-none group-hover:scale-105"
                          />
                          <button 
                            className="absolute top-3 right-3 p-1.5 transition-colors z-10 hover:opacity-75"
                            onClick={(e) => { e.stopPropagation(); handleToggleWishlist(item.id); }}
                          >
                             <Heart className={`w-6 h-6 ${wishlistIds.includes(item.id) ? 'fill-[#990000] text-[#990000]' : 'text-gray-400'}`} strokeWidth={2} />
                          </button>
                          <button
                            className="absolute bottom-3 right-3 w-8 h-8 rounded-sm bg-[#990000] text-white flex items-center justify-center hover:bg-[#7a0000] transition-colors z-10"
                            onClick={(e) => { e.stopPropagation(); handleSelectProduct(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          >
                             <Plus className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="flex flex-col">
                          <h3 className="text-[15px] font-medium text-gray-900 leading-snug mb-1 group-hover:underline">
                            {lang === 'vi' ? item.vietnameseName : item.name}
                          </h3>
                          <span className="text-[15px] font-bold text-gray-900">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.basePrice)}
                          </span>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
                
                {/* Visual right arrow overlay */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity pointer-events-none z-10 hidden md:flex">
                   <ChevronRight className="w-5 h-5 text-gray-800" />
                </div>
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
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToShop={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToLogin={() => {
              setCurrentView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCheckoutSuccess={() => {
              handleClearCart();
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
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigateToCheckout={() => {
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCartFromPicks}
          />
        )}

        {/* VIEW 8: USER LOGIN */}
        {currentView === 'login' && (
          <SignInForm 
            lang={lang} 
            onNavigateRegister={() => {
              setCurrentView('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLoginSuccess={() => {
              setCurrentView('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 9: USER REGISTER */}
        {currentView === 'register' && (
          <RegisterForm 
            lang={lang} 
            onNavigateLogin={() => {
              setCurrentView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLoginSuccess={() => {
              setCurrentView('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 10: USER PROFILE */}
        {currentView === 'profile' && (
          <UserProfile
            lang={lang}
            onLogout={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
          />
        )}

      </main>

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
           setCurrentView('return_policy');
           setIsCartOpen(false);
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCheckout={() => {
           setCurrentView('checkout');
           setIsCartOpen(false);
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCart={() => {
           setCurrentView('cart');
           setIsCartOpen(false);
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={() => {
           setCurrentView('home');
           setIsCartOpen(false);
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Style footer branding */}
      <footer className="bg-[#00687A] text-[#FBF5F2] pt-16 pb-8 mt-16 shadow-inner font-sans relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url('https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/Landing%20Page.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-white/10 items-start">
            
            {/* Left Column: Logo, Socials & Support */}
            <div className="flex flex-col gap-10 lg:col-span-5 pt-2">
              <div className="flex flex-col items-center lg:items-start gap-8">
                <button 
                  type="button"
                  onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group cursor-pointer hover:opacity-90 transition-opacity flex justify-center lg:justify-start w-full"
                >
                  <img 
                    src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/LOGO%20.png" 
                    alt="Chạm Logo" 
                    className="h-32 sm:h-40 md:h-44 w-auto object-contain drop-shadow-2xl brightness-0 invert"
                    referrerPolicy="no-referrer"
                  />
                </button>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-white w-full">
                  <a href="#" className="hover:bg-white hover:text-[#00687A] transition-colors p-2.5 rounded-full border border-white/70 flex justify-center items-center h-10 w-10">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="hover:bg-white hover:text-[#00687A] transition-colors p-2.5 rounded-full border border-white/70 flex justify-center items-center h-10 w-10">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Customer Support */}
              <div className="flex flex-col gap-5 text-sm text-center lg:text-left">
                 <h3 className="font-black text-white uppercase text-base tracking-wider mb-2">
                   {lang === 'vi' ? 'Hỗ Trợ Khách Hàng' : 'Support'}
                 </h3>
                 <div className="flex flex-col gap-3 font-medium text-white/90 text-xs">
                   <p className="flex flex-wrap items-center justify-center lg:justify-start gap-1">
                     <span className="opacity-70 uppercase tracking-wider font-bold">Hotline:</span> 
                     <a href="tel:0912133025" className="hover:text-white transition cursor-pointer ml-1 mr-2">0912133025</a>
                     <span className="hidden lg:inline mx-1">|</span>
                     <span className="opacity-70 uppercase tracking-wider font-bold ml-2">{lang === 'vi' ? 'Bán hàng B2B:' : 'B2B Sales:'}</span> 
                     <a href="mailto:b2b@cham.vn" className="hover:text-white transition cursor-pointer ml-1">b2b@cham.vn</a>
                   </p>
                   <p className="flex items-center justify-center lg:justify-start gap-1">
                     <span className="opacity-70 uppercase tracking-wider font-bold">Email:</span> 
                     <a href="mailto:cham.customerservice@gmail.com" className="hover:text-white transition cursor-pointer ml-1 break-all">cham.customerservice@gmail.com</a>
                   </p>
                 </div>
              </div>
            </div>

            {/* Right Column: Links, Payment, Newsletter */}
            <div className="flex flex-col gap-10 lg:col-span-7 pt-2 lg:pl-8 justify-between h-full">
              {/* Top Row: Hỗ Trợ & Câu Chuyện */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-8 text-sm text-center lg:text-left">
                 {/* Hỗ Trợ */}
                 <div className="flex flex-col gap-5 items-center lg:items-start w-full">
                    <h3 className="font-black text-white uppercase text-base tracking-wider mb-2">
                      {lang === 'vi' ? 'Hỗ Trợ' : 'Help Centre'}
                    </h3>
                    <button onClick={() => { setCurrentView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Liên Hệ' : 'Contact Us'}
                    </button>
                    <button onClick={() => { setCurrentView('warranty'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Chính Sách Bảo Hành' : 'Warranty Rights'}
                    </button>
                    <button onClick={() => { setCurrentView('return_policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Chính Sách Đổi Trả' : 'Returns & Refunds'}
                    </button>
                    <button onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Đánh Giá' : 'Reviews'}
                    </button>
                 </div>

                 {/* Câu Chuyện */}
                 <div className="flex flex-col gap-5 items-center lg:items-start w-full">
                    <h3 className="font-black text-white uppercase text-base tracking-wider mb-2">
                      {lang === 'vi' ? 'Câu Chuyện' : 'Our Story'}
                    </h3>
                    <button onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Về Chúng Tôi' : 'About Us'}
                    </button>
                    <button onClick={() => { setCurrentView('vision'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Tầm Nhìn' : 'Vision'}
                    </button>
                    <button onClick={() => { setCurrentView('element'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-semibold text-white/90 hover:text-white transition cursor-pointer text-xs uppercase tracking-wide">
                      {lang === 'vi' ? 'Bản Mệnh' : 'Elements'}
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
                    <div className="grid grid-cols-2 gap-3 w-full lg:max-w-[240px] justify-center lg:justify-start">
                      <div className="bg-white/95 px-3 py-3 rounded-lg flex items-center justify-center shadow-md h-14 hover:scale-105 transition-transform overflow-hidden cursor-default">
                        <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="bg-white/95 px-3 py-3 rounded-lg flex items-center justify-center shadow-md h-14 hover:scale-105 transition-transform overflow-hidden cursor-default">
                        <img src="https://vnpay.vn/s1/vnpay/asset/images/logo-vnpay-text.svg" alt="VNPay" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="bg-white/95 px-3 py-3 rounded-lg flex items-center justify-center shadow-md h-14 hover:scale-105 transition-transform overflow-hidden cursor-default">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <div className="bg-white/95 px-3 py-3 rounded-lg flex items-center justify-center shadow-md h-14 hover:scale-105 transition-transform cursor-default">
                        <div className="font-black text-[#00687A] text-[13px] uppercase tracking-wider text-center leading-tight">
                          COD
                        </div>
                      </div>
                    </div>
                 </div>

                 {/* Newsletter */}
                 <div className="flex flex-col gap-5 items-center lg:items-start w-full">
                    <h3 className="font-black text-white uppercase text-base tracking-wider mb-0 lg:mb-2">
                      {lang === 'vi' ? 'Đăng Ký Nhận Tin' : 'Newsletter'}
                    </h3>
                    <form className="flex w-full shadow-md lg:max-w-xs" onSubmit={(e) => e.preventDefault()}>
                      <input required type="email" placeholder={lang === 'vi' ? "Email của bạn" : "Email address"} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder:text-white/60 text-xs focus:outline-none focus:border-white/50" />
                      <button type="submit" className="bg-white text-[#00687A] px-5 py-3 rounded-r-lg font-bold text-xs uppercase hover:bg-white/90 transition border border-white whitespace-nowrap">
                         {lang === 'vi' ? 'Gửi' : 'Join'}
                      </button>
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
              <button onClick={() => { setCurrentView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:opacity-100 hover:underline transition uppercase tracking-wide">
                {lang === 'vi' ? 'Liên Hệ' : 'Contact Us'}
              </button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
