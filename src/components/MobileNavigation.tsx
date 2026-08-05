import React, { useEffect, useState } from 'react';
import { ShoppingBag, Home, User, LayoutGrid, X, ChevronUp } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CartItem } from '../types';
import { LogoHorizontal } from './Navbar';

interface MobileNavProps {
  cart: CartItem[];
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenCart: () => void;
  lang: 'vi' | 'en';
  onLanguageChange: (lang: 'vi' | 'en') => void;
}

export const MobileHeader: React.FC<MobileNavProps> = ({ currentView, onNavigate, lang, onLanguageChange }) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#FFDBE9] via-[#FFF2EF] to-[#D7FFFF] border-b border-[#E28C9A]/20 shadow-sm py-3 px-4 font-sans md:hidden rounded-b-3xl">
      <div className="flex items-center justify-between">
        <button 
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center shrink-0 transition-transform active:scale-95"
        >
          <LogoHorizontal className="scale-[0.85] origin-left shadow-none border-none bg-transparent" />
        </button>
        <div className="flex items-center bg-[#00687A]/10 p-0.5 rounded-xl border border-[#00687A]/5 shadow-xs">
          <button
            type="button"
            onClick={() => onLanguageChange('vi')}
            className={`px-3 py-1.5 text-[11px] font-extrabold tracking-wider rounded-lg transition-all ${
              lang === 'vi' ? 'bg-[#00687A] text-white shadow-sm' : 'text-[#00687A]/80'
            }`}
          >
            VN
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 text-[11px] font-extrabold tracking-wider rounded-lg transition-all ${
              lang === 'en' ? 'bg-[#00687A] text-white shadow-sm' : 'text-[#00687A]/80'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export const MobileBottomNav: React.FC<MobileNavProps> = ({ cart, currentView, onNavigate, onOpenCart, lang }) => {
  const [currentUser, setCurrentUser] = useState<any>(auth.currentUser);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Close shop menu when navigating away
  useEffect(() => {
    setIsShopMenuOpen(false);
  }, [currentView]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const tabs = [
    { id: 'home', icon: Home, label: lang === 'vi' ? 'Trang Chủ' : 'Home' },
    { id: 'shop', icon: LayoutGrid, label: lang === 'vi' ? 'Sản Phẩm' : 'Shop' },
    { id: 'user', icon: User, label: lang === 'vi' ? 'Hồ Sơ' : 'Profile' },
  ];

  const handleShopOptionClick = (view: string) => {
    onNavigate(view);
    setIsShopMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop for shop menu */}
      {isShopMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsShopMenuOpen(false)}
        />
      )}

      {/* Shop Menu Popup */}
      <div 
        className={`fixed left-4 right-4 z-40 md:hidden bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_-8px_30px_rgba(0,104,122,0.15)] border border-white p-4 transition-all duration-300 transform origin-bottom ${
          isShopMenuOpen ? 'bottom-24 opacity-100 scale-100' : '-bottom-full opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-[#00687A] text-sm uppercase tracking-widest">{lang === 'vi' ? 'Bộ Sưu Tập' : 'Collections'}</h3>
          <button onClick={() => setIsShopMenuOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pb-2">
          <div 
            className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex flex-col active:scale-95 transition-transform"
            onClick={() => handleShopOptionClick('collection_cham_toi')}
          >
            <div className="aspect-square bg-white relative flex items-center justify-center p-2">
              <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/thay%20%E1%BA%A3nh%20%C4%91o%E1%BA%A1n%20b%E1%BB%99%20s%C6%B0u%20t%E1%BA%ADp%20tr%C6%B0%E1%BB%9Bc%20khi%20b%E1%BA%A5m%20v%C3%A0o/collection%201%20%C4%91o%E1%BA%A1n%20BST.png.png" alt="Chạm Tôi" className="w-full h-full object-contain mix-blend-multiply scale-[1.25]" referrerPolicy="no-referrer" />
            </div>
            <div className="p-2.5 text-center bg-white border-t border-slate-100">
              <p className="text-xs font-bold text-[#00687A] uppercase">{lang === 'vi' ? 'Chạm Tôi' : 'Touch Me'}</p>
            </div>
          </div>
          
          <div 
            className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex flex-col active:scale-95 transition-transform"
            onClick={() => handleShopOptionClick('collection_cham_than')}
          >
            <div className="aspect-square bg-white relative flex items-center justify-center p-2">
              <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/thay%20%E1%BA%A3nh%20%C4%91o%E1%BA%A1n%20b%E1%BB%99%20s%C6%B0u%20t%E1%BA%ADp%20tr%C6%B0%E1%BB%9Bc%20khi%20b%E1%BA%A5m%20v%C3%A0o/collection%202%20%C4%91o%E1%BA%A1n%20BST.png" alt="Chạm Thần" className="w-full h-full object-contain mix-blend-multiply scale-[1.25]" referrerPolicy="no-referrer" />
            </div>
            <div className="p-2.5 text-center bg-white border-t border-slate-100">
              <p className="text-xs font-bold text-[#00687A] uppercase">{lang === 'vi' ? 'Chạm Thần' : 'Touch Spirit'}</p>
            </div>
          </div>

          <div 
            className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex flex-col active:scale-95 transition-transform"
            onClick={() => handleShopOptionClick('collection_cham_doi')}
          >
            <div className="aspect-square bg-white relative flex items-center justify-center p-2">
              <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/thay%20%E1%BA%A3nh%20%C4%91o%E1%BA%A1n%20b%E1%BB%99%20s%C6%B0u%20t%E1%BA%ADp%20tr%C6%B0%E1%BB%9Bc%20khi%20b%E1%BA%A5m%20v%C3%A0o/collection%203%20%C4%91o%E1%BA%A1n%20BST.png.png" alt="Chạm Đôi" className="w-full h-full object-contain mix-blend-multiply scale-[1.25]" referrerPolicy="no-referrer" />
            </div>
            <div className="p-2.5 text-center bg-white border-t border-slate-100">
              <p className="text-xs font-bold text-[#00687A] uppercase">{lang === 'vi' ? 'Chạm Đôi' : 'Touch Us'}</p>
            </div>
          </div>

          <div 
            className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex flex-col active:scale-95 transition-transform"
            onClick={() => handleShopOptionClick('collection_combo')}
          >
            <div className="aspect-square bg-white relative flex items-center justify-center p-2">
              <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/thay%20%E1%BA%A3nh%20%C4%91o%E1%BA%A1n%20b%E1%BB%99%20s%C6%B0u%20t%E1%BA%ADp%20tr%C6%B0%E1%BB%9Bc%20khi%20b%E1%BA%A5m%20v%C3%A0o/combo%20thay%20%C4%91o%E1%BA%A1n%20BST.png" alt="Combo" className="w-full h-full object-contain mix-blend-multiply scale-[1.25]" referrerPolicy="no-referrer" />
            </div>
            <div className="p-2.5 text-center bg-white border-t border-slate-100">
              <p className="text-xs font-bold text-[#00687A] uppercase">{lang === 'vi' ? 'Combo' : 'Combo Sets'}</p>
            </div>
          </div>

          <div 
            className="col-span-2 rounded-2xl overflow-hidden bg-slate-50 border border-[#00687A]/20 flex items-center justify-center active:scale-95 transition-transform p-3 mt-1 cursor-pointer"
            onClick={() => handleShopOptionClick('shop')}
          >
            <p className="text-xs font-bold text-[#00687A] uppercase tracking-wider">{lang === 'vi' ? 'Xem Tất Cả Sản Phẩm' : 'View All Products'}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        {/* Curves: Floating pill shaped bottom nav */}
        <nav className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_12px_40px_rgba(0,104,122,0.15)] border border-white flex items-center justify-between px-2 py-2 relative">
          {tabs.map((tab) => {
            const isActive = tab.id === 'user' 
              ? ['profile', 'login', 'register'].includes(currentView)
              : tab.id === 'shop' 
                ? (['shop', 'collection_cham_toi', 'collection_cham_than', 'collection_cham_doi', 'collection_combo'].includes(currentView) || isShopMenuOpen)
                : currentView === tab.id;
              
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'shop') {
                    setIsShopMenuOpen(!isShopMenuOpen);
                  } else {
                    setIsShopMenuOpen(false);
                    if (tab.id === 'user') {
                      onNavigate(currentUser ? 'profile' : 'login');
                    } else {
                      onNavigate(tab.id);
                    }
                  }
                }}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-[24px] transition-all duration-300 active:scale-90 relative ${
                  isActive 
                    ? 'bg-[#00687A]/10 text-[#00687A]' 
                    : 'text-slate-400'
                }`}
              >
                <tab.icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] font-bold tracking-wide ${isActive ? 'text-[#00687A]' : ''}`}>
                  {tab.label}
                </span>
                
                {/* Indicator for popup */}
                {tab.id === 'shop' && (
                  <ChevronUp className={`w-3 h-3 absolute top-1 right-2 transition-transform duration-300 ${isShopMenuOpen ? 'rotate-180 text-[#00687A]' : 'text-slate-300'}`} />
                )}
              </button>
            );
          })}
          
          {/* Cart Tab */}
          <button
            onClick={() => {
              setIsShopMenuOpen(false);
              onOpenCart();
            }}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-[24px] transition-all duration-300 text-slate-400 active:scale-90 relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 mb-1" strokeWidth={2} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#E28C9A] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm border border-white">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-wide">
              {lang === 'vi' ? 'Giỏ Hàng' : 'Cart'}
            </span>
          </button>
        </nav>
      </div>
    </>
  );
};

