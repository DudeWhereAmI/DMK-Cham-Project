import React from 'react';
import { ShoppingBag, ShieldCheck, User, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CartItem } from '../types';
import { PngLogoHorizontal } from './PngLogo';

interface NavbarProps {
  cart: CartItem[];
  currentView: string;
  onNavigate: (view: 'home' | 'shop' | 'customizer' | 'about' | 'vision' | 'warranty' | 'contact' | 'collection_cham_than' | 'collection_cham_toi' | 'collection_cham_doi' | 'collection_combo') => void;
  onNavigateElement?: (id: string) => void;
  onNavigateMaterials?: () => void;
  onOpenCart: () => void;
  lang: 'vi' | 'en';
  onLanguageChange: (lang: 'vi' | 'en') => void;
}

export const LogoHorizontal: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center select-none px-4 py-1.5 bg-white/95 rounded-2xl border border-white/50 shadow-xs backdrop-blur-xs relative overflow-hidden ${className}`}>
      <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
      <div className="relative z-10 flex items-center justify-center">
        <PngLogoHorizontal className="h-9 md:h-11 w-auto max-w-[170px] md:max-w-[200px] drop-shadow-xs" />
      </div>
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ 
  cart, 
  currentView, 
  onNavigate, 
  onNavigateElement,
  onNavigateMaterials,
  onOpenCart,
  lang,
  onLanguageChange
}) => {
  const [currentUser, setCurrentUser] = React.useState<any>(auth.currentUser);
  const [activeDropdown, setActiveDropdown] = React.useState<'collections' | 'about' | 'user' | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const handleDocumentClick = () => {
      setActiveDropdown(null);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleNavigate = (view: any) => {
    onNavigate(view);
    setActiveDropdown(null);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#FFDBE9] via-[#FFF2EF] to-[#D7FFFF] border-b border-[#E28C9A]/20 shadow-sm py-2.5 md:py-3 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        
        {/* Logo Brand Frame */}
        <button 
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center group transition-transform hover:scale-[1.01] cursor-pointer shrink-0"
          id="navbar-brand-logo"
        >
          <LogoHorizontal />
        </button>

        {/* Main Links */}
        <nav className="flex items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-7 text-[11px] sm:text-xs md:text-sm tracking-widest font-extrabold uppercase text-[#00687A] flex-wrap md:flex-nowrap">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`hover:text-[#E28C9A] transition-all duration-300 cursor-pointer pb-1 border-b-2 ${
              currentView === 'home'
                ? 'text-[#00687A] border-[#00687A]'
                : 'text-[#00687A]/65 border-transparent hover:border-[#00687A]/20'
            }`}
          >
            <span>{lang === 'vi' ? 'Trang Chủ' : 'Home'}</span>
          </button>
          
          
          {/* Mega Menu for Bộ Sưu Tập / Collections */}
          <div className="group/col">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'collections' ? null : 'collections');
              }}
              className={`flex items-center gap-1 hover:text-[#E28C9A] transition-all duration-300 cursor-pointer pb-1 border-b-2 text-[#00687A]/65 border-transparent hover:border-[#00687A]/20 h-full`}
            >
              <span>{lang === 'vi' ? 'Bộ Sưu Tập' : 'Collections'}</span>
              <span className={`text-[8px] transform transition-transform mb-0.5 ${activeDropdown === 'collections' ? 'rotate-180' : 'group-hover/col:rotate-180'}`}>▼</span>
            </button>

            {/* Mega Menu Content container spans the width of the page when hovered or toggled */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[85vw] max-w-[1100px] min-h-[200px] bg-white/95 backdrop-blur-md shadow-2xl border border-slate-100 rounded-2xl transition-all duration-300 z-[100] flex justify-center py-6 px-4 mt-2 ${
              activeDropdown === 'collections'
                ? 'opacity-100 visible'
                : 'opacity-0 invisible group-hover/col:opacity-100 group-hover/col:visible'
            }`} onClick={(e) => e.stopPropagation()}>
              <div className="w-full flex gap-3 justify-center">
                
                {/* Col 1 */}
                <div 
                  className="w-1/4 max-w-[240px] cursor-pointer group/card flex flex-col"
                  onClick={() => handleNavigate('collection_cham_toi')}
                >
                  <div className="bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 aspect-[4/5] flex items-center justify-center relative">
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
                    <div className="absolute inset-0 bg-[#E28C9A]/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/thay%20%E1%BA%A3nh%20%C4%91o%E1%BA%A1n%20b%E1%BB%99%20s%C6%B0u%20t%E1%BA%ADp%20tr%C6%B0%E1%BB%9Bc%20khi%20b%E1%BA%A5m%20v%C3%A0o/collection%201%20%C4%91o%E1%BA%A1n%20BST.png.png" alt="Collection 01" className="w-full h-full object-contain scale-[2.4] translate-x-[4%] mix-blend-multiply group-hover/card:scale-[2.5] group-hover/card:translate-x-[4%] transition-transform duration-500 relative z-10"  referrerPolicy="no-referrer"  loading="lazy" />
                  </div>
                  <div className="mt-4 pt-3 border-t-[3px] border-[#00687A]/10 group-hover/card:border-[#00687A] transition-colors">
                    <h4 className="font-bold text-[#00687A] uppercase text-sm md:text-base tracking-widest">{lang === 'vi' ? 'Chạm Tôi' : 'Touch Me'}</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Collection 01</p>
                  </div>
                </div>

                {/* Col 2 */}
                <div 
                  className="w-1/4 max-w-[240px] cursor-pointer group/card flex flex-col relative"
                  onClick={() => handleNavigate('collection_cham_than')}
                >
                  <div className="bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 aspect-[4/5] flex items-center justify-center relative">
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
                    <div className="absolute inset-0 bg-[#00687A]/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/thay%20%E1%BA%A3nh%20%C4%91o%E1%BA%A1n%20b%E1%BB%99%20s%C6%B0u%20t%E1%BA%ADp%20tr%C6%B0%E1%BB%9Bc%20khi%20b%E1%BA%A5m%20v%C3%A0o/collection%202%20%C4%91o%E1%BA%A1n%20BST.png" alt="Collection 02" className="w-full h-full object-contain scale-[2.0] mix-blend-multiply group-hover/card:scale-[2.1] transition-transform duration-500 relative z-10"  referrerPolicy="no-referrer"  loading="lazy" />
                  </div>
                  <div className="mt-4 pt-3 border-t-[3px] border-[#00687A]/10 group-hover/card:border-[#00687A] transition-colors flex flex-col relative group/sub">
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <h4 className="font-bold text-[#00687A] uppercase text-sm md:text-base tracking-widest">{lang === 'vi' ? 'Chạm Thần' : 'Touch Spirit'}</h4>
                        <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Collection 02</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Col 3 */}
                <div 
                  className="w-1/4 max-w-[240px] cursor-pointer group/card flex flex-col"
                  onClick={() => handleNavigate('collection_cham_doi')}
                >
                  <div className="bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 aspect-[4/5] flex items-center justify-center relative">
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
                    <div className="absolute inset-0 bg-[#00687A]/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/thay%20%E1%BA%A3nh%20%C4%91o%E1%BA%A1n%20b%E1%BB%99%20s%C6%B0u%20t%E1%BA%ADp%20tr%C6%B0%E1%BB%9Bc%20khi%20b%E1%BA%A5m%20v%C3%A0o/collection%203%20%C4%91o%E1%BA%A1n%20BST.png.png" alt="Collection 03" className="w-full h-full object-contain scale-[2.25] mix-blend-multiply group-hover/card:scale-[2.35] transition-transform duration-500 relative z-10"  referrerPolicy="no-referrer"  loading="lazy" />
                  </div>
                  <div className="mt-4 pt-3 border-t-[3px] border-[#00687A]/10 group-hover/card:border-[#00687A] transition-colors">
                    <h4 className="font-bold text-[#00687A] uppercase text-sm md:text-base tracking-widest">{lang === 'vi' ? 'Chạm Đôi' : 'Touch Us'}</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Collection 03</p>
                  </div>
                </div>

                {/* Col 4 - Combo */}
                <div 
                  className="w-1/4 max-w-[240px] cursor-pointer group/card flex flex-col"
                  onClick={() => handleNavigate('collection_combo')}
                >
                  <div className="bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 aspect-[4/5] flex items-center justify-center relative">
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@7e6c6bd2663bb6a12887178ea97749063e65f398/Des276%20(1000%20x%20500%20px).png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply pointer-events-none" referrerPolicy="no-referrer"  loading="lazy" />
                    <div className="absolute inset-0 bg-[#E28C9A]/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@ed49c7fb37b8188fd6af54a285bdb84289237822/new/thay%20%E1%BA%A3nh%20%C4%91o%E1%BA%A1n%20b%E1%BB%99%20s%C6%B0u%20t%E1%BA%ADp%20tr%C6%B0%E1%BB%9Bc%20khi%20b%E1%BA%A5m%20v%C3%A0o/combo%20thay%20%C4%91o%E1%BA%A1n%20BST.png" alt="Combo" className="w-full h-full object-contain scale-[2.4] translate-x-[4%] mix-blend-multiply group-hover/card:scale-[2.5] group-hover/card:translate-x-[4%] transition-transform duration-500 relative z-10"  referrerPolicy="no-referrer"  loading="lazy" />
                  </div>
                  <div className="mt-4 pt-3 border-t-[3px] border-[#00687A]/10 group-hover/card:border-[#00687A] transition-colors">
                    <h4 className="font-bold text-[#00687A] uppercase text-sm md:text-base tracking-widest">{lang === 'vi' ? 'Combo' : 'Combo Sets'}</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Special Deals</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="relative group/about">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'about' ? null : 'about');
              }}
              className={`flex items-center gap-1 hover:text-[#E28C9A] transition-all duration-300 cursor-pointer pb-1 border-b-2 ${
                currentView === 'about' || currentView === 'vision'
                  ? 'text-[#00687A] border-[#00687A]'
                  : 'text-[#00687A]/65 border-transparent hover:border-[#00687A]/20'
              }`}
            >
              <span>{lang === 'vi' ? 'Về Chúng Tôi' : 'About Us'}</span>
              <span className={`text-[8px] transform transition-transform mb-0.5 ${activeDropdown === 'about' ? 'rotate-180' : 'group-hover/about:rotate-180'}`}>▼</span>
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[240px] bg-white shadow-xl rounded-xl border border-slate-100 transition-all duration-300 z-50 py-2 ${
              activeDropdown === 'about'
                ? 'opacity-100 visible'
                : 'opacity-0 invisible group-hover/about:opacity-100 group-hover/about:visible'
            }`} onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => handleNavigate('about')}
                className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider border-b border-slate-100 hover:text-[#E28C9A] transition-colors"
              >
                {lang === 'vi' ? 'Câu Chuyện Thương Hiệu' : 'Our Story'}
              </button>
              <button 
                onClick={() => handleNavigate('vision')}
                className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider hover:text-[#E28C9A] transition-colors"
              >
                {lang === 'vi' ? 'Tầm Nhìn & Sứ Mệnh' : 'Vision & Mission'}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`hover:text-[#E28C9A] transition-all duration-300 cursor-pointer pb-1 border-b-2 ${
              currentView === 'contact'
                ? 'text-[#00687A] border-[#00687A]'
                : 'text-[#00687A]/65 border-transparent hover:border-[#00687A]/20'
            }`}
          >
            <span>{lang === 'vi' ? 'Liên Hệ' : 'Contact Us'}</span>
          </button>
        </nav>

        {/* Right Pack: Language switcher + Cart on the far right */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Elegant Language Switcher with dark teal / white styling */}
          <div className="flex items-center bg-[#00687A]/10 p-0.5 rounded-lg border border-[#00687A]/5 shadow-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('vi')}
              className={`px-3 py-1 text-[10px] font-extrabold tracking-wider rounded-md transition-all cursor-pointer ${
                lang === 'vi'
                  ? 'bg-[#00687A] text-white shadow-xs'
                  : 'text-[#00687A]/80 hover:text-[#00687A]'
              }`}
            >
              VN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 text-[10px] font-extrabold tracking-wider rounded-md transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#00687A] text-white shadow-xs'
                  : 'text-[#00687A]/80 hover:text-[#00687A]'
              }`}
            >
              EN
            </button>
          </div>

          <span className="text-[#00687A]/15 font-light">|</span>

          {/* User Profile Dropdown */}
          <div className="relative group/user">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'user' ? null : 'user');
              }}
              className="relative p-2 rounded-full hover:bg-[#E28C9A]/10 border border-[#00687A]/15 text-[#00687A] transition hover:text-[#E28C9A] flex items-center justify-center cursor-pointer shadow-xs bg-white/40"
            >
              <User className="w-5 h-5 transition-transform" />
            </button>
            <div className={`absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-slate-100 transition-all duration-300 z-50 py-2 ${
              activeDropdown === 'user'
                ? 'opacity-100 visible'
                : 'opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible'
            }`} onClick={(e) => e.stopPropagation()}>
              {currentUser ? (
                <>
                  <button 
                    onClick={() => handleNavigate('profile' as any)}
                    className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider flex items-center border-b border-slate-100 transition-colors"
                  >
                    <span>{lang === 'vi' ? 'Hồ Sơ Của Tôi' : 'My Profile'}</span>
                  </button>
                  <button 
                    onClick={() => {
                       auth.signOut();
                       handleNavigate('home' as any);
                    }}
                    className="w-full text-left px-5 py-3 text-[#e4002b] hover:bg-red-50 font-bold text-xs uppercase tracking-wider flex items-center transition-colors"
                  >
                    <span>{lang === 'vi' ? 'Đăng Xuất' : 'Sign Out'}</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleNavigate('login' as any)}
                    className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider flex items-center border-b border-slate-100 transition-colors"
                  >
                    <span>{lang === 'vi' ? 'Đăng Nhập' : 'Sign In'}</span>
                  </button>
                  <button 
                    onClick={() => handleNavigate('register' as any)}
                    className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider flex items-center transition-colors"
                  >
                    <span>{lang === 'vi' ? 'Đăng Ký' : 'Register'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Cart Icon trigger button */}
          <button
            type="button"
            onClick={onOpenCart}
            id="cart-trigger-btn"
            className="relative p-2 rounded-full hover:bg-[#E28C9A]/10 border border-[#00687A]/15 text-[#00687A] transition hover:text-[#E28C9A] flex items-center justify-center group cursor-pointer shadow-xs bg-white/40"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
            {totalCartCount > 0 && (
              <span 
                id="cart-badge-count"
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E28C9A] text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse shadow-xs border border-white"
              >
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
