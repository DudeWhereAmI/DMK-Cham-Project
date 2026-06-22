import React, { useState } from 'react';
import { CartItem } from '../types';
import { PngLogoHorizontal } from './PngLogo';
import { db } from '../lib/firebase';
import { collection, addDoc, doc, getDoc, Timestamp, setDoc } from 'firebase/firestore';
import { X, CheckCircle, Tag, Copy, ShieldCheck } from 'lucide-react';

interface CheckoutPageProps {
  cart: CartItem[];
  lang: 'vi' | 'en';
  globalDiscountCode: string;
  setGlobalDiscountCode: (code: string) => void;
  isGlobalDiscountApplied: boolean;
  setIsGlobalDiscountApplied: (applied: boolean) => void;
  onNavigateHome: () => void;
  onNavigateToShop: () => void;
  onNavigateToLogin: () => void;
  onCheckoutSuccess: () => void;
  currentUser: any;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  lang,
  globalDiscountCode,
  setGlobalDiscountCode,
  isGlobalDiscountApplied,
  setIsGlobalDiscountApplied,
  onNavigateHome,
  onNavigateToShop,
  onNavigateToLogin,
  onCheckoutSuccess,
  currentUser
}) => {
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: ''
  });

  // Fetch from users collection if available, or just fallback to currentUser info
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData(prev => ({
            ...prev,
            name: prev.name || userData.name || currentUser.displayName || '',
            email: prev.email || userData.email || currentUser.email || '',
            phone: prev.phone || userData.phone || '',
            address: prev.address || userData.address || '',
            province: prev.province || userData.province || '',
            district: prev.district || userData.district || '',
            ward: prev.ward || userData.ward || '',
          }));
        } else {
          // Just use auth identity if no doc yet
          setFormData(prev => ({
            ...prev,
            name: prev.name || currentUser.displayName || '',
            email: prev.email || currentUser.email || ''
          }));
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [currentUser]);
  
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'momo' | 'zalopay'>('cod');
  const [wrappingOption, setWrappingOption] = useState<'standard' | 'giftBox'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreorderPopup, setShowPreorderPopup] = useState(false);
  const [preorderSuccess, setPreorderSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  const packagingFee = wrappingOption === 'giftBox' ? 20000 : 0;
  const shippingFee = 0; // Free shipping for now
  const baseTotal = subtotal + packagingFee + shippingFee;
  const discountAmount = isGlobalDiscountApplied ? baseTotal * 0.2 : 0;
  const total = baseTotal - discountAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleApplyDiscount = () => {
    if (globalDiscountCode.trim().toUpperCase() === 'CHAMISBYEUCOHOA') {
      setIsGlobalDiscountApplied(true);
      alert(lang === 'vi' ? 'Áp dụng mã giảm giá thành công!' : 'Discount applied successfully!');
    } else {
      setIsGlobalDiscountApplied(false);
      alert(lang === 'vi' ? 'Mã giảm giá không hợp lệ.' : 'Invalid discount code.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // Instead of immediately ordering, show preorder popup
    setShowPreorderPopup(true);
  };

  const handleConfirmPreorder = async () => {
    setIsSubmitting(true);
    try {
      // Serialize cart to remove undefined fields which Firestore rejects
      const sanitizedCart = JSON.parse(JSON.stringify(cart));
      
      // Create Firestore doc
      const docRef = await addDoc(collection(db, 'orders'), {
        userId: currentUser ? currentUser.uid : 'guest',
        customerInfo: formData,
        items: sanitizedCart,
        subtotal,
        packagingFee,
        total,
        discountAmount,
        discountCode: isGlobalDiscountApplied ? globalDiscountCode : '',
        wrappingOption,
        paymentMethod,
        status: 'preorder', // Mark as preorder
        createdAt: Timestamp.now()
      });

      // Save user details to profile if logged in
      if (currentUser) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            province: formData.province,
            district: formData.district,
            ward: formData.ward,
            updatedAt: Timestamp.now()
          }, { merge: true });
        } catch (e) {
          console.error("Failed to update user profile", e);
        }
      }

      // Call Express background email API
      try {
        await fetch('/api/send-preorder-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: formData.name,
            customerEmail: formData.email,
            orderDetails: sanitizedCart.map((item: any) => ({
              name: item.product.name,
              quantity: item.quantity,
              customization: item.customization
            })),
            totalAmount: total,
          })
        });
      } catch (emailError) {
        // Do not fail the whole process if email logic errors out
        console.error("Failed to trigger email:", emailError);
      }

      // Track purchase event with GA
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'purchase', {
          transaction_id: newOrderRef.id,
          value: total,
          currency: 'VND',
          items: sanitizedCart.map((item: any) => ({
            item_id: item.product.id,
            item_name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          }))
        });
      }

      // Show success screen within the popup
      setPreorderSuccess(true);
    } catch (error) {
      console.error("Error creating order:", error);
      alert(lang === 'vi' ? 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại' : 'Error creating order. Please try again');
      setShowPreorderPopup(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CHAMISBYEUCOHOA');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleFinishPreorder = () => {
    setShowPreorderPopup(false);
    setPreorderSuccess(false);
    onCheckoutSuccess();
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Forms */}
        <div className="w-full md:w-[60%] p-8 border-r border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 md:gap-4 cursor-pointer" onClick={onNavigateHome}>
              <div className="h-10 md:h-12">
                <PngLogoHorizontal className="h-full w-auto" />
              </div>
              <div className="h-6 w-px bg-gray-300 mx-1 md:mx-2 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-gray-800">
                <ShieldCheck className="w-5 h-5 text-[#00687A]" />
                <span className="font-bold uppercase tracking-widest text-sm">{lang === 'vi' ? 'THANH TOÁN' : 'CHECKOUT'}</span>
              </div>
            </div>
            {!currentUser && (
              <button 
                onClick={onNavigateToLogin}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>{lang === 'vi' ? 'Đăng nhập' : 'Sign In'}</span>
              </button>
            )}
          </div>

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Delivery Info */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'vi' ? 'Thông tin mua hàng' : 'Billing Information'}</h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                />
                <input 
                  type="text" 
                  name="name"
                  placeholder={lang === 'vi' ? 'Họ và tên' : 'Full Name'} 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder={lang === 'vi' ? 'Số điện thoại' : 'Phone'} 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                />
                <input 
                  type="text" 
                  name="address"
                  placeholder={lang === 'vi' ? 'Địa chỉ chi tiết' : 'Address'} 
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                />
                <textarea 
                  name="note"
                  placeholder={lang === 'vi' ? 'Ghi chú (tùy chọn)' : 'Notes (optional)'} 
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                />
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'vi' ? 'Thanh toán' : 'Payment'}</h2>
              <div className="space-y-3 border border-gray-200 rounded-md p-4 mb-8">
                <label className="flex items-center gap-3 cursor-pointer py-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-[#990000] focus:ring-[#990000]"
                  />
                  <span className="text-sm font-medium">{lang === 'vi' ? 'Thu hộ (COD)' : 'Cash on Delivery'}</span>
                </label>
                <div className="h-px bg-gray-100 w-full"></div>
                <label className="flex items-center gap-3 cursor-pointer py-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="momo" 
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="w-4 h-4 text-[#990000] focus:ring-[#990000]"
                  />
                  <span className="text-sm font-medium">{lang === 'vi' ? 'Thanh toán qua MoMo' : 'Pay via MoMo'}</span>
                </label>
                <div className="h-px bg-gray-100 w-full"></div>
                <label className="flex items-center gap-3 cursor-pointer py-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="zalopay" 
                    checked={paymentMethod === 'zalopay'}
                    onChange={() => setPaymentMethod('zalopay')}
                    className="w-4 h-4 text-[#990000] focus:ring-[#990000]"
                  />
                  <span className="text-sm font-medium">{lang === 'vi' ? 'Thanh toán qua ZaloPay' : 'Pay via ZaloPay'}</span>
                </label>
              </div>
            </div>

            {/* Gift Wrap options card */}
            <div className="pt-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'vi' ? 'Lựa Chọn Bao Bì' : 'Packaging Selection'}</h2>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <label className={`flex gap-4 p-5 cursor-pointer transition-colors ${wrappingOption === 'standard' ? 'bg-[#F9F9F9]' : 'hover:bg-gray-50'}`}>
                   <div className="flex items-start h-5 pt-0.5">
                       <input type="radio" className="w-4 h-4 text-black focus:ring-black border-gray-300" checked={wrappingOption === 'standard'} onChange={() => setWrappingOption('standard')} />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900 uppercase tracking-widest leading-none mb-1.5">{lang === 'vi' ? 'Hộp Gói Tiêu Chuẩn' : 'Bespoke Essential Box'}</h4>
                      <p className="text-xs text-gray-500 font-serif leading-relaxed">
                        {lang === 'vi' ? 'Hộp giấy tái chế bảo vệ môi trường, thiết kế tối giản, thanh lịch, đảm bảo an toàn cho sản phẩm.' : 'Minimalist eco-friendly protection box. Elegant and sustainable.'}
                      </p>
                   </div>
                   <span className="text-sm font-bold text-gray-400">{lang === 'vi' ? 'Miễn phí' : 'Complimentary'}</span>
                </label>

                <div className="w-full h-px bg-gray-200"></div>

                <label className={`flex gap-4 p-5 cursor-pointer transition-colors ${wrappingOption === 'giftBox' ? 'bg-[#Fbf5f5]' : 'hover:bg-gray-50'}`}>
                   <div className="flex items-start h-5 pt-0.5">
                       <input type="radio" className="w-4 h-4 text-[#990000] focus:ring-[#990000] border-gray-300" checked={wrappingOption === 'giftBox'} onChange={() => setWrappingOption('giftBox')} />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                         <h4 className="font-bold text-sm text-[#990000] uppercase tracking-widest leading-none">{lang === 'vi' ? 'Hộp Quà Thượng Hạng' : 'Premium Signature Box'}</h4>
                         <span className="bg-[#990000]/10 text-[#990000] text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase">Gift</span>
                      </div>
                      <p className="text-xs text-gray-600 font-serif leading-relaxed">
                        {lang === 'vi' ? 'Hộp cứng ép kim vân ruy-băng. Thiết kế bởi nghệ nhân. Đi kèm hộp bảo quản, thiệp kể chuyện Ngũ Hành cá nhân và bưu thiếp hỷ xả.' : 'Hand-tied ribbon signature tactile box. Includes dedicated protective vault, Elemental reading booklet and personalized gift card.'}
                      </p>
                   </div>
                   <span className="text-sm font-bold text-gray-900">+20.000 ₫</span>
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Right Side - Cart Summary */}
        <div className="w-full md:w-[40%] bg-gray-50 p-8 border-l border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
            {lang === 'vi' ? `Đơn hàng (${cart.length} sản phẩm)` : `Order (${cart.length} items)`}
          </h2>

          <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 relative">
                     <div className="w-16 h-16 bg-white rounded-md border border-gray-200 p-1 flex-shrink-0 relative">
                       <img 
                         src={item.product?.images?.[item.customization?.color] || item.product?.image || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || 'https://via.placeholder.com/150?text=Chạm'} 
                         alt={item.product?.name} 
                         className="w-full h-full object-contain mix-blend-multiply"
                   />
                   <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                     {item.quantity}
                   </div>
                 </div>
                 <div className="flex flex-col flex-1">
                   <span className="text-sm font-bold text-gray-900 line-clamp-1">{item.product.name}</span>
                   <span className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                     {item.customization.element} - {item.customization.baseStyle}
                   </span>
                   <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-400">× {item.quantity}</span>
                      <span className="text-sm font-bold text-[#990000]">{formatVND(item.finalPrice)}</span>
                   </div>
                 </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 mb-6 border-b border-gray-200 pb-6">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={globalDiscountCode}
                onChange={(e) => setGlobalDiscountCode(e.target.value)}
                placeholder={lang === 'vi' ? 'Nhập mã giảm giá' : 'Discount code'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm uppercase"
                disabled={isGlobalDiscountApplied}
              />
              {!isGlobalDiscountApplied ? (
                <button 
                  type="button" 
                  onClick={handleApplyDiscount}
                  className="px-4 py-2 bg-gray-600 text-white font-medium text-sm rounded-md hover:bg-gray-700 transition"
                >
                  {lang === 'vi' ? 'Áp dụng' : 'Apply'}
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => {
                    setIsGlobalDiscountApplied(false);
                    setGlobalDiscountCode('');
                  }}
                  className="px-4 py-2 bg-red-100 text-[#990000] font-medium text-sm rounded-md hover:bg-red-200 transition"
                >
                  {lang === 'vi' ? 'Hủy' : 'Remove'}
                </button>
              )}
            </div>
            {isGlobalDiscountApplied && (
              <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <CheckCircle className="w-3 h-3" />
                {lang === 'vi' ? 'Đã áp dụng mã giảm 20%' : '20% discount applied'}
              </div>
            )}
          </div>

          <div className="space-y-3 mb-6 border-b border-gray-200 pb-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            {wrappingOption === 'giftBox' && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>{lang === 'vi' ? 'Đóng gói quà tặng' : 'Gift Packaging'}</span>
                <span>{formatVND(packagingFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600">
              <span>{lang === 'vi' ? 'Phí vận chuyển' : 'Shipping'}</span>
              <span>-</span>
            </div>
            {isGlobalDiscountApplied && (
              <div className="flex justify-between text-sm font-bold text-green-600">
                <span>{lang === 'vi' ? 'Giảm giá (20%)' : 'Discount (20%)'}</span>
                <span>-{formatVND(discountAmount)}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-base text-gray-800">{lang === 'vi' ? 'Tổng cộng' : 'Total'}</span>
            <span className="text-2xl font-bold text-[#990000]">{formatVND(total)}</span>
          </div>

          <div className="flex justify-between items-center">
            <button 
              type="button" 
              onClick={onNavigateToShop}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>‹ {lang === 'vi' ? 'Quay về giỏ hàng' : 'Back to cart'}</span>
            </button>
            <button 
              form="checkout-form"
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="px-8 py-4 bg-black text-white font-bold uppercase tracking-wider text-sm rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (lang === 'vi' ? 'ĐANG ĐẶT...' : 'PROCESSING...') : (lang === 'vi' ? 'ĐẶT HÀNG' : 'PLACE ORDER')}
            </button>
          </div>

        </div>

      </div>

      {showPreorderPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !preorderSuccess && setShowPreorderPopup(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="bg-[#FFF2EF] px-6 py-4 flex items-center justify-between border-b border-[#E28C9A]/20">
              <h3 className="font-bold text-[#990000] uppercase tracking-wider relative z-10 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                {lang === 'vi' ? 'THÔNG BÁO PRE-ORDER' : 'PRE-ORDER NOTICE'}
              </h3>
              {!preorderSuccess && (
                <button onClick={() => setShowPreorderPopup(false)} className="text-gray-500 hover:text-gray-800 transition relative z-10">
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              {!preorderSuccess ? (
                <>
                  <div className="text-gray-700 text-sm space-y-4 mb-8 leading-relaxed">
                    <p>
                      {lang === 'vi' 
                        ? 'Cảm ơn bạn đã lựa chọn Chạm! Hiện tại sản phẩm đang trong giai đoạn Pre-order nhằm đảm bảo quy trình cá nhân hóa được hoàn thiện chỉn chu nhất.' 
                        : 'Thank you for choosing Cham! Currently, the product is in the Pre-order phase to ensure the personalization process is perfected.'}
                    </p>
                    <p>
                      {lang === 'vi'
                        ? 'Khi xác nhận Pre-order, bạn sẽ lưu lại yêu cầu cá nhân hóa này. Tụi mình sẽ liên hệ lại với bạn khi các sản phẩm sẵn sàng mở bán chính thức.'
                        : 'By confirming Pre-order, you will save this personalization request. We will contact you when the products are ready for official sale.'}
                    </p>
                    <div className="bg-[#FFF2EF] border border-[#E28C9A]/30 p-4 rounded-md text-[#990000] font-medium text-center">
                      {lang === 'vi'
                        ? 'Đặc biệt: Nhận ngay mã giảm giá lớn khi xác nhận Pre-order hôm nay!'
                        : 'Special: Get a huge discount code when confirming Pre-order today!'}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowPreorderPopup(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md font-bold text-gray-600 uppercase text-xs hover:bg-gray-50 transition"
                      disabled={isSubmitting}
                    >
                      {lang === 'vi' ? 'QUAY LẠI' : 'GO BACK'}
                    </button>
                    <button 
                      onClick={handleConfirmPreorder}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-[#990000] text-white rounded-md font-bold uppercase text-xs hover:bg-[#7a0000] transition disabled:opacity-70 flex items-center justify-center"
                    >
                      {isSubmitting ? (lang === 'vi' ? 'ĐANG XỬ LÝ...' : 'PROCESSING...') : (lang === 'vi' ? 'XÁC NHẬN PRE-ORDER' : 'CONFIRM PRE-ORDER')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFF2EF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#990000]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {lang === 'vi' ? 'Pre-order Thành Công!' : 'Pre-order Successful!'}
                  </h4>
                  <p className="text-gray-600 text-sm mb-6">
                    {lang === 'vi' 
                      ? 'Yêu cầu của bạn đã được ghi nhận. Dưới đây là quà tặng đặc biệt dành riêng cho bạn.' 
                      : 'Your request has been recorded. Below is a special gift just for you.'}
                  </p>
                  
                  {/* Coupon Box */}
                  <div className="bg-gray-50 border-2 border-dashed border-[#E28C9A] p-6 rounded-xl mb-8 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-white text-xs font-bold text-[#E28C9A] uppercase tracking-wider">
                      {lang === 'vi' ? 'VOUCHER GIẢM GIÁ 20%' : '20% OFF VOUCHER'}
                    </div>
                    <div className="text-2xl font-black text-[#990000] tracking-widest break-all">
                      CHAMISBYEUCOHOA
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {lang === 'vi'
                        ? 'Sử dụng mã này khi ứng dụng mở bán chính thức để nhận ngay ưu đãi giảm 20% cho toàn bộ sản phẩm.'
                        : 'Use this code when the app officially launches to get an instant 20% off on all products.'}
                    </p>

                    <button 
                      onClick={handleCopyCode}
                      className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-white border border-[#990000] text-[#990000] font-bold rounded-md hover:bg-[#FFF2EF] transition"
                    >
                      {copiedCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedCode ? (lang === 'vi' ? 'Đã sao chép' : 'Copied') : (lang === 'vi' ? 'Sao chép mã' : 'Copy Code')}
                    </button>
                  </div>

                  <button 
                    onClick={handleFinishPreorder}
                    className="w-full px-4 py-4 bg-gray-900 text-white rounded-md font-bold uppercase text-xs hover:bg-black transition"
                  >
                    {lang === 'vi' ? 'HOÀN TẤT & VỀ TRANG CHỦ' : 'FINISH & GO HOME'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
