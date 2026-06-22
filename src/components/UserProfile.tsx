import React, { useEffect, useState } from 'react';
import { Package, Calendar, Tag, ChevronRight, User as UserIcon, Settings, LogOut, Loader2, Heart, ArrowRight } from 'lucide-react';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { PngLogoCircular } from './PngLogo';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import dmkBrandElement1 from '../assets/dmk_brand_element_1.svg';
import mirrorVintage from '../assets/mirror_vintage.svg';

interface UserProfileProps {
  lang: 'vi' | 'en';
  onLogout: () => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  onSelectProduct?: (product: Product) => void;
}

interface Order {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: any;
  items: any[];
}

export const UserProfile: React.FC<UserProfileProps> = ({ lang, onLogout, wishlistIds = [], onToggleWishlist, onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites' | 'settings'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;
      try {
        setLoading(true);
        const q = query(
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
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
      setSelectedOrder(null);
    }
  }, [activeTab]);

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
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                          {selectedOrder.status || (lang === 'vi' ? 'Đã Giao Vận' : 'Shipped')}
                        </span>
                      </div>
                    </div>
                    <div className="p-0 bg-white">
                      {selectedOrder.items?.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-6 p-6 border-b border-slate-100 last:border-b-0">
                          <div className="w-24 h-24 bg-[#f4f4f4] rounded-lg overflow-hidden shrink-0">
                            <img src={item.product?.images?.[item.customization?.color] || item.product?.image || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || 'https://via.placeholder.com/150?text=Chạm'} alt={item.product?.name} className="w-full h-full object-cover mix-blend-multiply" />
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <h4 className="font-bold text-slate-900 text-base">{item.product?.name}</h4>
                            <div className="text-sm text-slate-500 mt-2 space-y-1">
                              {item.customization?.element && (
                                <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Hệ Bản Mệnh:' : 'Element:'}</span> {item.customization.element}</p>
                              )}
                              {item.customization?.material && (
                                <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Chất Liệu:' : 'Material:'}</span> {item.customization.material}</p>
                              )}
                              {item.customization?.text && (
                                <p><span className="font-medium text-slate-700">{lang === 'vi' ? 'Khắc Chữ:' : 'Engraving:'}</span> <span className="font-mono text-xs font-bold text-[#b89552] underline decoration-dotted">{item.customization.text}</span></p>
                              )}
                              <p className="font-bold text-[#8A1538] mt-2">{(item.product?.price || 0).toLocaleString('vi-VN')} ₫ <span className="text-slate-400 font-medium text-xs">x {item.quantity}</span></p>
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
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
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
                                <img src={item.product?.images?.[item.customization?.color] || item.product?.image || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || 'https://via.placeholder.com/150?text=Chạm'} alt={item.product?.name} className="w-full h-full object-cover mix-blend-multiply" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-slate-900 text-sm">{item.product?.name}</h4>
                                <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-2">
                                  {item.customization?.element && (
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                      {item.customization.element}
                                    </span>
                                  )}
                                  {item.customization?.text && (
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                      {item.customization.text}
                                    </span>
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
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                           </span>
                           <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                             {order.status || (lang === 'vi' ? 'Đã Giao Vận' : 'Shipped')}
                           </span>
                        </div>
                        <button onClick={() => setSelectedOrder(order)} className="text-[#00687A] text-sm font-bold flex items-center gap-1 hover:text-[#E28C9A] transition-colors">
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
                            />
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 h-full min-h-[500px] flex items-center justify-center">
               <p className="text-slate-400 font-medium">{lang === 'vi' ? 'Cài đặt đang phát triển' : 'Settings section in development'}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
