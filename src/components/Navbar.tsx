import React from 'react';
import { ShoppingBag, ShieldCheck, User, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CartItem } from '../types';
import { PngLogoHorizontal } from './PngLogo';

interface NavbarProps {
  cart: CartItem[];
  currentView: string;
  onNavigate: (view: 'home' | 'shop' | 'customizer' | 'about' | 'vision' | 'warranty' | 'contact') => void;
  onNavigateElement?: (id: string) => void;
  onNavigateMaterials?: () => void;
  onOpenCart: () => void;
  lang: 'vi' | 'en';
  onLanguageChange: (lang: 'vi' | 'en') => void;
}

export const LogoHorizontal: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center select-none px-4 py-1.5 bg-white/95 rounded-2xl border border-white/50 shadow-xs backdrop-blur-xs ${className}`}>
      <PngLogoHorizontal className="h-9 md:h-11 w-auto max-w-[170px] md:max-w-[200px] drop-shadow-xs" />
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

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

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
          
          {/* Dropdown for Sản phẩm */}
          <div className="relative group/shop">
            <button
              type="button"
              className={`flex items-center gap-1 hover:text-[#E28C9A] transition-all duration-300 cursor-pointer pb-1 border-b-2 ${
                currentView === 'shop' || currentView === 'customizer' || currentView === 'materials'
                  ? 'text-[#00687A] border-[#00687A]'
                  : 'text-[#00687A]/65 border-transparent hover:border-[#00687A]/20'
              }`}
            >
              <span>{lang === 'vi' ? 'Sản Phẩm' : 'Shop'}</span>
              <span className="text-[8px] transform transition-transform group-hover/shop:rotate-180 mb-0.5">▼</span>
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[220px] bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover/shop:opacity-100 group-hover/shop:visible transition-all duration-300 z-50 py-2">
              <button 
                onClick={() => onNavigate('shop')}
                className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b border-slate-100 group/item"
              >
                <span>{lang === 'vi' ? 'Tất Cả Sản Phẩm' : 'All Products'}</span>
                <span className="text-[#E28C9A] opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
              </button>
              
              <button 
                onClick={() => { if (onNavigateMaterials) onNavigateMaterials(); }}
                className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider flex items-center justify-between group/item"
              >
                <span>{lang === 'vi' ? 'Nguyên Vật Liệu' : 'Materials'}</span>
                <span className="text-[#E28C9A] opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
              </button>
            </div>
          </div>
          
          {/* Mega Menu for Bộ Sưu Tập / Collections */}
          <div className="group/col">
            <button
              type="button"
              className={`flex items-center gap-1 hover:text-[#E28C9A] transition-all duration-300 cursor-pointer pb-1 border-b-2 text-[#00687A]/65 border-transparent hover:border-[#00687A]/20 h-full`}
            >
              <span>{lang === 'vi' ? 'Bộ Sưu Tập' : 'Collections'}</span>
              <span className="text-[8px] transform transition-transform group-hover/col:rotate-180 mb-0.5">▼</span>
            </button>

            {/* Mega Menu Content container spans the width of the page when hovered */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[50vw] max-w-[600px] min-h-[200px] bg-white/95 backdrop-blur-md shadow-2xl border border-slate-100 rounded-2xl opacity-0 invisible group-hover/col:opacity-100 group-hover/col:visible transition-all duration-300 z-[100] flex justify-center py-6 px-4 mt-2">
              <div className="w-full flex gap-3 justify-center">
                
                {/* Col 1 */}
                <div 
                  className="w-1/3 max-w-[280px] cursor-pointer group/card flex flex-col"
                  onClick={() => { /* Navigate to collection 1 if needed */ }}
                >
                  <div className="bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 aspect-[4/5] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[#E28C9A]/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <img src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/8c3283d652661f5c4524e67d35f7057b8c547916/M%E1%BA%AAU.png" alt="Collection 01" className="w-full h-full object-contain mix-blend-multiply group-hover/card:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="mt-4 pt-3 border-t-[3px] border-[#00687A]/10 group-hover/card:border-[#00687A] transition-colors">
                    <h4 className="font-bold text-[#00687A] uppercase text-sm md:text-base tracking-widest">{lang === 'vi' ? 'Chạm Tôi' : 'Touch Me'}</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Collection 01</p>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="w-1/3 max-w-[280px] cursor-pointer group/card flex flex-col relative">
                  <div className="bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 aspect-[4/5] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[#00687A]/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <img src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/725e9664b9c72f9af9fee9399adbfe17e52a2f2f/Collection%2003.png" alt="Collection 02" className="w-full h-full object-contain mix-blend-multiply group-hover/card:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="mt-4 pt-3 border-t-[3px] border-[#00687A]/10 group-hover/card:border-[#00687A] transition-colors flex flex-col relative group/sub">
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <h4 className="font-bold text-[#00687A] uppercase text-sm md:text-base tracking-widest">{lang === 'vi' ? 'Chạm Thần' : 'Touch Spirit'}</h4>
                        <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Collection 02</p>
                      </div>
                    </div>
                    {/* Hover dropdown for elements inside mega menu item */}
                    <div className="absolute top-[110%] left-0 w-full min-w-[200px] bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-[60] py-2 flex flex-col overflow-hidden">
                      {[
                        { id: 'kim', name: 'Kim Cương (Kim)' },
                        { id: 'moc', name: 'Lục Bảo (Mộc)' },
                        { id: 'thuy', name: 'Biển Thẳm (Thủy)' },
                        { id: 'hoa', name: 'Hồng Hoang (Hỏa)' },
                        { id: 'tho', name: 'Hổ Phách (Thổ)' }
                      ].map(el => (
                        <button 
                          key={el.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onNavigateElement) onNavigateElement(el.id);
                            else onNavigate('shop');
                          }}
                          className="w-full text-left px-4 py-2.5 text-[#00687A] hover:bg-slate-50 font-medium text-xs hover:text-[#E28C9A] transition-colors flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E28C9A]/40 block shrink-0"></span>
                          {el.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Col 3 */}
                <div 
                  className="w-1/3 max-w-[280px] cursor-pointer group/card flex flex-col"
                >
                  <div className="bg-[#fcfcfc] rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 aspect-[4/5] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[#EAB308]/10 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <img src="https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/63f722cf71afbdc305860327c408c71b406e9090/BRAND%20ELEMENT/K%E1%BA%B8P%20M%E1%BA%AAU/DMK%20%20BRAND%20ELEMENT%20-46.png" alt="Collection 03" className="w-full h-full object-contain mix-blend-multiply group-hover/card:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="mt-4 pt-3 border-t-[3px] border-[#00687A]/10 group-hover/card:border-[#00687A] transition-colors">
                    <h4 className="font-bold text-[#00687A] uppercase text-sm md:text-base tracking-widest">{lang === 'vi' ? 'Chạm Đôi' : 'Touch Synergy'}</h4>
                    <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Collection 03</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="relative group/about">
            <button
              type="button"
              className={`flex items-center gap-1 hover:text-[#E28C9A] transition-all duration-300 cursor-pointer pb-1 border-b-2 ${
                currentView === 'about' || currentView === 'vision'
                  ? 'text-[#00687A] border-[#00687A]'
                  : 'text-[#00687A]/65 border-transparent hover:border-[#00687A]/20'
              }`}
            >
              <span>{lang === 'vi' ? 'Về Chúng Tôi' : 'About Us'}</span>
              <span className="text-[8px] transform transition-transform group-hover/about:rotate-180 mb-0.5">▼</span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[240px] bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover/about:opacity-100 group-hover/about:visible transition-all duration-300 z-50 py-2">
              <button 
                onClick={() => onNavigate('about')}
                className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider border-b border-slate-100 hover:text-[#E28C9A] transition-colors"
              >
                {lang === 'vi' ? 'Câu Chuyện Thương Hiệu' : 'Our Story'}
              </button>
              <button 
                onClick={() => onNavigate('vision')}
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
              className="relative p-2 rounded-full hover:bg-[#E28C9A]/10 border border-[#00687A]/15 text-[#00687A] transition hover:text-[#E28C9A] flex items-center justify-center cursor-pointer shadow-xs bg-white/40"
            >
              <User className="w-5 h-5 transition-transform" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-300 z-50 py-2">
              {currentUser ? (
                <>
                  <button 
                    onClick={() => onNavigate('profile' as any)}
                    className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider flex items-center border-b border-slate-100 transition-colors"
                  >
                    <span>{lang === 'vi' ? 'Hồ Sơ Của Tôi' : 'My Profile'}</span>
                  </button>
                  <button 
                    onClick={() => {
                       auth.signOut();
                       onNavigate('home' as any);
                    }}
                    className="w-full text-left px-5 py-3 text-[#e4002b] hover:bg-red-50 font-bold text-xs uppercase tracking-wider flex items-center transition-colors"
                  >
                    <span>{lang === 'vi' ? 'Đăng Xuất' : 'Sign Out'}</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => onNavigate('login' as any)}
                    className="w-full text-left px-5 py-3 text-[#00687A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider flex items-center border-b border-slate-100 transition-colors"
                  >
                    <span>{lang === 'vi' ? 'Đăng Nhập' : 'Sign In'}</span>
                  </button>
                  <button 
                    onClick={() => onNavigate('register' as any)}
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
