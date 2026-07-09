import React, { useState } from 'react';
import { CartItem } from '../types';
import { processOrderInventory } from '../lib/inventory';
import { PngLogoHorizontal } from './PngLogo';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, doc, getDoc, Timestamp, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { X, CheckCircle, Tag, Copy, ShieldCheck, MapPin, UploadCloud } from 'lucide-react';
import { MIRROR_IMAGES_CHU_NOI, MIRROR_IMAGES_LINH_VAT } from '../data';

const NEW_WARDS: Record<string, string[]> = {
  'Quận 1': ['Phường Sài Gòn', 'Phường Tân Định', 'Phường Bến Thành', 'Phường Cầu Ông Lãnh'],
  'Quận 3': ['Phường Bàn Cờ', 'Phường Xuân Hòa', 'Phường Nhiêu Lộc'],
  'Quận 4': ['Phường Xóm Chiếu', 'Phường Khánh Hội', 'Phường Vĩnh Hội'],
  'Quận 5': ['Phường Chợ Quán', 'Phường An Đông', 'Phường Chợ Lớn'],
  'Quận 6': ['Phường Bình Tây', 'Phường Bình Tiên', 'Phường Bình Phú', 'Phường Phú Lâm'],
  'Quận 7': ['Phường Tân Thuận', 'Phường Phú Thuận', 'Phường Tân Mỹ', 'Phường Tân Hưng'],
  'Quận 8': ['Phường Chánh Hưng', 'Phường Phú Định', 'Phường Bình Đông'],
  'Quận 10': ['Phường Diên Hồng', 'Phường Vườn Lài', 'Phường Hòa Hưng'],
  'Quận 11': ['Phường Minh Phụng', 'Phường Bình Thới', 'Phường Hòa Bình', 'Phường Phú Thọ'],
  'Quận 12': ['Phường Đông Hưng Thuận', 'Phường Trung Mỹ Tây', 'Phường Tân Thới Hiệp', 'Phường Thới An', 'Phường An Phú Đông'],
  'Bình Tân': ['Phường An Lạc', 'Phường Bình Tân', 'Phường Tân Tạo', 'Phường Bình Trị Đông', 'Phường Bình Hưng Hòa'],
  'Bình Thạnh': ['Phường Gia Định', 'Phường Bình Thạnh', 'Phường Bình Lợi Trung', 'Phường Thạnh Mỹ Tây', 'Phường Bình Quới'],
  'Gò Vấp': ['Phường Hạnh Thông', 'Phường An Nhơn', 'Phường Gò Vấp', 'Phường An Hội Đông', 'Phường Thông Tây Hội', 'Phường An Hội Tây'],
  'Phú Nhuận': ['Phường Đức Nhuận', 'Phường Cầu Kiệu', 'Phường Phú Nhuận'],
  'Tân Bình': ['Phường Tân Sơn Hòa', 'Phường Tân Sơn Nhất', 'Phường Tân Hòa', 'Phường Bảy Hiền', 'Phường Tân Bình', 'Phường Tân Sơn'],
  'Tân Phú': ['Phường Tây Thạnh', 'Phường Tân Sơn Nhì', 'Phường Phú Thọ Hòa', 'Phường Tân Phú', 'Phường Phú Thạnh'],
  'TP. Thủ Đức': ['Phường Hiệp Bình', 'Phường Thủ Đức', 'Phường Tam Bình', 'Phường Linh Xuân', 'Phường Tăng Nhơn Phú', 'Phường Long Bình', 'Phường Long Phước', 'Phường Long Trường', 'Phường Cát Lái', 'Phường Bình Trưng', 'Phường Phước Long', 'Phường An Khánh']
};

const getCartItemImage = (item: CartItem): string => {
  if (item.product?.category === 'mirror' || item.product?.id === 'guong') {
    const isZodiacMode = item.customization?.customType === 'zodiac' || !!item.customization?.selectedZodiacCharmId;
    const mirrorMap = isZodiacMode ? MIRROR_IMAGES_LINH_VAT : MIRROR_IMAGES_CHU_NOI;
    return mirrorMap[item.customization?.element] || item.product?.images?.['none'] || '';
  }
  return item.product?.images?.[item.customization?.element] || item.product?.images?.['none'] || Object.values(item.product?.images || {})[0] || '';
};

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
      } catch (err: any) {
        if (err?.message?.includes('client is offline')) {
          console.warn("Client is offline, using fallback auth profile.");
        } else {
          console.error("Error fetching user profile:", err);
        }
        setFormData(prev => ({
          ...prev,
          name: prev.name || currentUser.displayName || '',
          email: prev.email || currentUser.email || ''
        }));
      }
    };

    fetchUserProfile();
  }, [currentUser]);
  
  const [deliveryMethod, setDeliveryMethod] = useState<'direct' | 'online'>('direct');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'momo' | 'bank_transfer'>('cod');
  const [wrappingOption, setWrappingOption] = useState<'standard'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showPreorderPopup, setShowPreorderPopup] = useState(false);
  const [preorderSuccess, setPreorderSuccess] = useState(false);
  const [qrTimeLeft, setQrTimeLeft] = useState(15 * 60);
  const [copiedCode, setCopiedCode] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState<string>('');
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [addressWarning, setAddressWarning] = useState<string | null>(null);
  const [useOldAddress, setUseOldAddress] = useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPreorderPopup && (paymentMethod === 'bank_transfer' || paymentMethod === 'momo') && !preorderSuccess) {
      timer = setInterval(() => {
        setQrTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showPreorderPopup, paymentMethod, preorderSuccess]);

  React.useEffect(() => {
    if (qrTimeLeft === 0 && showPreorderPopup && !preorderSuccess) {
      if (currentOrderId) {
        deleteDoc(doc(db, 'orders', currentOrderId)).catch(console.error);
      }
      setShowPreorderPopup(false);
      setCurrentOrderId(null);
      setTimeout(() => {
        alert(lang === 'vi' ? 'Hết thời gian thanh toán. Vui lòng đặt hàng lại.' : 'Payment time expired. Please re-order.');
      }, 100);
    }
  }, [qrTimeLeft, showPreorderPopup, preorderSuccess, currentOrderId, lang]);

  React.useEffect(() => {
    if (!showPreorderPopup) {
      setQrTimeLeft(15 * 60);
    }
  }, [showPreorderPopup]);

  const isChamis = isGlobalDiscountApplied && globalDiscountCode.trim().toUpperCase() === 'CHAMISBYEUCOHOA';
  const isBanToiYeu = isGlobalDiscountApplied && globalDiscountCode.trim().toUpperCase() === 'BANTOIYEU';

  const subtotal = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  const packagingFee = 0;
  
  const rawShippingFee = deliveryMethod === 'online' ? 15000 : 0;
  const shippingDiscount = isBanToiYeu ? Math.min(rawShippingFee, 15000) : 0;
  const shippingFee = Math.max(0, rawShippingFee - shippingDiscount);
  
  const baseTotal = subtotal + packagingFee + shippingFee;
  const discountAmount = isChamis ? baseTotal * 0.1 : 0;
  const total = baseTotal - discountAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => {
      const newForm = { ...prev, [name]: value };
      
      if (name === 'district') {
        newForm.ward = '';
      }
      
      // Address validation
      if (useOldAddress && (name === 'address' || name === 'district') && deliveryMethod === 'online' && newForm.district && newForm.district !== 'Ngoài tỉnh' && newForm.district !== 'Khác') {
        const addressLower = newForm.address.toLowerCase();
        let aliases: string[] = [];
        const dLower = newForm.district.toLowerCase();
        
        if (dLower.includes('quận 1') && !dLower.includes('11') && !dLower.includes('10') && !dLower.includes('12')) aliases = ['quận 1', 'quan 1', 'q1', 'q.1'];
        else if (dLower.includes('quận 2')) aliases = ['quận 2', 'quan 2', 'q2', 'q.2', 'thủ đức', 'thu duc'];
        else if (dLower.includes('quận 3')) aliases = ['quận 3', 'quan 3', 'q3', 'q.3'];
        else if (dLower.includes('quận 4')) aliases = ['quận 4', 'quan 4', 'q4', 'q.4'];
        else if (dLower.includes('quận 5')) aliases = ['quận 5', 'quan 5', 'q5', 'q.5'];
        else if (dLower.includes('quận 6')) aliases = ['quận 6', 'quan 6', 'q6', 'q.6'];
        else if (dLower.includes('quận 7')) aliases = ['quận 7', 'quan 7', 'q7', 'q.7'];
        else if (dLower.includes('quận 8')) aliases = ['quận 8', 'quan 8', 'q8', 'q.8'];
        else if (dLower.includes('quận 9')) aliases = ['quận 9', 'quan 9', 'q9', 'q.9', 'thủ đức', 'thu duc'];
        else if (dLower.includes('quận 10')) aliases = ['quận 10', 'quan 10', 'q10', 'q.10'];
        else if (dLower.includes('quận 11')) aliases = ['quận 11', 'quan 11', 'q11', 'q.11'];
        else if (dLower.includes('quận 12')) aliases = ['quận 12', 'quan 12', 'q12', 'q.12'];
        else if (dLower.includes('tân bình')) aliases = ['tân bình', 'tan binh', 'q. tân bình', 'q tan binh'];
        else if (dLower.includes('tân phú')) aliases = ['tân phú', 'tan phu', 'q. tân phú', 'q tan phu'];
        else if (dLower.includes('bình tân')) aliases = ['bình tân', 'binh tan', 'q. bình tân', 'q binh tan'];
        else if (dLower.includes('phú nhuận')) aliases = ['phú nhuận', 'phu nhuan', 'q. phú nhuận', 'q phu nhuan'];
        else if (dLower.includes('gò vấp')) aliases = ['gò vấp', 'go vap', 'q. gò vấp', 'q go vap'];
        else if (dLower.includes('bình thạnh')) aliases = ['bình thạnh', 'binh thanh', 'q. bình thạnh', 'q binh thanh'];
        else if (dLower.includes('thủ đức')) aliases = ['thủ đức', 'thu duc', 'tp thủ đức', 'tp. thủ đức', 'q2', 'quận 2', 'q9', 'quận 9'];
        else aliases = [dLower];
        
        const hasMatch = newForm.address.trim() === '' || aliases.some(alias => addressLower.includes(alias));
        if (!hasMatch) {
          setAddressWarning(lang === 'vi' ? `Địa chỉ dường như không khớp với ${newForm.district}. Vui lòng kiểm tra lại.` : `Address doesn't seem to match ${newForm.district}. Please check again.`);
        } else {
          setAddressWarning(null);
        }
      } else {
        setAddressWarning(null);
      }

      return newForm;
    });
  };

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleApplyDiscount = () => {
    const code = globalDiscountCode.trim().toUpperCase();
    if (code === 'CHAMISBYEUCOHOA' || code === 'BANTOIYEU') {
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
    
    if (deliveryMethod === 'online') {
      if (formData.district === 'Ngoài tỉnh') {
        alert(lang === 'vi' ? 'Xin lỗi, chúng tôi hiện tại không hỗ trợ giao hàng ngoài tỉnh.' : 'Sorry, we currently do not support out-of-province shipping.');
        return;
      }
      if (!formData.district) {
        alert(lang === 'vi' ? 'Vui lòng chọn quận/huyện.' : 'Please select a district.');
        return;
      }
      if (!useOldAddress && NEW_WARDS[formData.district] && !formData.ward) {
        alert(lang === 'vi' ? 'Vui lòng chọn phường/xã.' : 'Please select a ward.');
        return;
      }
    }
    
    // Show confirmation popup first
    setShowConfirmPopup(true);
  };

  const handleConfirmOrderInfo = async () => {
    setIsSubmitting(true);
    try {
      const sanitizedCart = JSON.parse(JSON.stringify(cart));
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
        paymentProofUrl: '',
        paymentStatus: 'Đang chờ',
        deliveryMethod,
        status: 'draft',
        createdAt: Timestamp.now()
      });
      setCurrentOrderId(docRef.id);
      setShowConfirmPopup(false);
      setShowPreorderPopup(true);
      setQrTimeLeft(15 * 60);
    } catch (e) {
      console.error(e);
      alert(lang === 'vi' ? 'Có lỗi xảy ra, vui lòng thử lại' : 'An error occurred, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelPreorder = async () => {
    if (currentOrderId && !preorderSuccess) {
      await deleteDoc(doc(db, 'orders', currentOrderId)).catch(console.error);
      setCurrentOrderId(null);
    }
    setShowPreorderPopup(false);
  };

  const handleConfirmPreorder = async () => {
    if ((paymentMethod === 'bank_transfer' || paymentMethod === 'momo') && !paymentProofFile) {
      alert(lang === 'vi' ? 'Vui lòng tải lên minh chứng chuyển khoản' : 'Please upload payment proof');
      return;
    }
    
    if (!currentOrderId) return;
    
    setIsSubmitting(true);
    try {
      const orderRef = doc(db, 'orders', currentOrderId);
      await setDoc(orderRef, {
        status: 'preorder', // Mark as preorder
        paymentMethod,
        paymentStatus: (paymentMethod === 'bank_transfer' || paymentMethod === 'momo') ? 'Chờ xác nhận' : 'Chưa thanh toán',
      }, { merge: true });

      const sanitizedCart = JSON.parse(JSON.stringify(cart));

      let uploadedUrl = '';
      if (paymentProofFile) {
        try {
          const fileRef = ref(storage, `payment_proofs/${Date.now()}_${paymentProofFile.name}`);
          await uploadBytes(fileRef, paymentProofFile);
          uploadedUrl = await getDownloadURL(fileRef);
          await setDoc(orderRef, { paymentProofUrl: uploadedUrl }, { merge: true });
        } catch (uploadError: any) {
          console.warn("Failed to upload payment proof to Storage:", uploadError);
          if (uploadError?.message?.includes('unauthorized') || uploadError?.code?.includes('unauthorized')) {
            alert(lang === 'vi' 
              ? 'Lỗi quyền truy cập Firebase Storage. Vui lòng vào Firebase Console -> Storage -> Rules và cấp quyền ghi (allow write: if true;).' 
              : 'Firebase Storage permission denied. Please go to Firebase Console -> Storage -> Rules and allow writes.');
          } else {
            alert(lang === 'vi' ? 'Không thể tải ảnh lên Firebase Storage. Vui lòng thử lại.' : 'Failed to upload image to Firebase Storage. Please try again.');
          }
          setIsSubmitting(false);
          return; // Stop the flow
        }
      }

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

      // Call Express background email API (run in background)
      const emailResponsePromise = fetch('/api/send-preorder-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: currentOrderId,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          orderDetails: sanitizedCart.map((item: any) => {
            let itemName = lang === 'vi' ? item.product?.vietnameseName : item.product?.name;
            if (item.customization?.comboId === 'couple_combo') {
              itemName = lang === 'vi' ? `Combo Chạm Cùng Nhau (${itemName})` : `Couple Combo (${itemName})`;
            } else if (item.customization?.comboId === 'mirror_combo') {
              itemName = lang === 'vi' ? `Combo Chạm Ánh Nhìn (${itemName} & Gương)` : `Mirror Combo (${itemName} & Mirror)`;
            }
            return {
              name: itemName,
              quantity: item.quantity,
              customization: item.customization,
              images: item.product?.images,
              itemImageUrl: getCartItemImage(item)
            };
          }),
          totalAmount: total,
        })
      });

      const emailPromise = emailResponsePromise.then(async (res) => {
        if (res.ok) {
          await setDoc(orderRef, { emailSent: true }, { merge: true }).catch(console.error);
        } else {
          try {
            const text = await res.text();
            console.error("Email API failed:", text);
          } catch (_) {}
        }
      }).catch(emailError => {
        console.error("Failed to trigger email:", emailError);
      });

      // Record to Google Sheets (always)
      const sheetPromise = fetch('/api/record-preorder-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: currentOrderId,
          customerInfo: formData,
          items: sanitizedCart,
          subtotal,
          packagingFee,
          total,
          discountAmount,
          discountCode: isGlobalDiscountApplied ? globalDiscountCode : '',
          wrappingOption,
          paymentMethod,
          paymentProofUrl: uploadedUrl,
          paymentStatus: (paymentMethod === 'bank_transfer' || paymentMethod === 'momo') ? 'Chờ xác nhận' : 'Chưa thanh toán',
          deliveryMethod,
          createdAt: new Date().toISOString(),
          userId: currentUser?.uid || ''
        })
      }).then(async (res) => {
        if (res.ok) {
          await setDoc(orderRef, { sheetRecorded: true }, { merge: true }).catch(console.error);
        } else {
          try {
            const text = await res.text();
            console.error("Sheet API failed:", text);
          } catch (_) {}
        }
      }).catch(sheetError => {
        console.error("Failed to record to Google Sheets:", sheetError);
      });

      // Fire email and sheet updates in background without blocking UI
      Promise.allSettled([emailPromise, sheetPromise]).then(() => {
         console.log("Background order notifications completed.");
      });

      // Track purchase event with GA
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'purchase', {
          transaction_id: currentOrderId,
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

      // Process inventory (skip for test email hoangphucunknown@gmail.com)
      if (formData.email?.toLowerCase() !== 'hoangphucunknown@gmail.com') {
        try {
          processOrderInventory(sanitizedCart, currentOrderId);
        } catch (err) {
          console.error("Failed to process inventory:", err);
        }
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
    <div className="w-full flex flex-col items-center py-6 px-4 sm:px-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
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
            {/* Delivery Method */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'vi' ? 'Phương thức nhận hàng' : 'Delivery Method'}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`bg-white rounded-xl cursor-pointer p-4 shadow-sm border ${deliveryMethod === 'direct' ? 'border-[#990000] ring-1 ring-[#990000]/20' : 'border-gray-200'} transition-all`}>
                  <div className="flex items-start gap-3">
                    <input type="radio" checked={deliveryMethod === 'direct'} onChange={() => setDeliveryMethod('direct')} className="text-[#990000] focus:ring-[#990000] mt-1" />
                    <span className="font-bold text-sm text-gray-900 mt-0.5">{lang === 'vi' ? 'Nhận tại cửa hàng' : 'Direct Pickup'}</span>
                  </div>
                </label>
                <label className={`bg-white rounded-xl cursor-pointer p-4 shadow-sm border ${deliveryMethod === 'online' ? 'border-[#990000] ring-1 ring-[#990000]/20' : 'border-gray-200'} transition-all`}>
                  <div className="flex items-start gap-3">
                    <input type="radio" checked={deliveryMethod === 'online'} onChange={() => setDeliveryMethod('online')} className="text-[#990000] focus:ring-[#990000] mt-1" />
                    <span className="font-bold text-sm text-gray-900 mt-0.5">{lang === 'vi' ? 'Giao hàng tận nơi' : 'Online Delivery'}</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Billing Info */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'vi' ? 'Thông tin người nhận' : 'Recipient Information'}</h2>
              {deliveryMethod === 'direct' && (
                <div className="mb-4 bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-[#00687A] mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{lang === 'vi' ? 'Địa chỉ nhận hàng' : 'Pickup Address'}</h3>
                    <p className="text-sm text-gray-600">279 Nguyễn Tri Phương, Phường 5, Quận 10, TP.HCM</p>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    pattern="[0-9]*"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                  />
                </div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                />
                
                {deliveryMethod === 'online' && (
                  <>

                    <div className="flex items-center gap-2 mt-2 mb-2">
                      <input 
                        type="checkbox" 
                        id="useOldAddress" 
                        checked={useOldAddress} 
                        onChange={(e) => {
                          setUseOldAddress(e.target.checked);
                          setFormData(prev => ({ ...prev, district: '', ward: '' }));
                          setAddressWarning(null);
                        }} 
                        className="w-4 h-4 text-[#00687A] border-gray-300 rounded focus:ring-[#00687A]"
                      />
                      <label htmlFor="useOldAddress" className="text-sm font-medium text-gray-700 cursor-pointer">
                        {lang === 'vi' ? 'Dùng địa chỉ cũ trước sáp nhập' : 'Use old address before merge'}
                      </label>
                    </div>
                    
                    <select 
                      name="district" 
                      value={formData.district} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                    >
                      <option value="">{lang === 'vi' ? 'Chọn Quận/Huyện' : 'Select District'}</option>
                      {useOldAddress ? (
                        <>
                          {['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Tân', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'Thủ Đức'].map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </>
                      ) : (
                        <>
                          {Object.keys(NEW_WARDS).map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </>
                      )}
                      <option value="Khác">Khác</option>
                      <option value="Ngoài tỉnh">Ngoài tỉnh</option>
                    </select>

                    {!useOldAddress && formData.district !== 'Khác' && formData.district !== 'Ngoài tỉnh' && (
                      <select 
                        name="ward" 
                        value={formData.ward} 
                        onChange={handleInputChange} 
                        required 
                        disabled={!formData.district || !NEW_WARDS[formData.district]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#990000] text-sm"
                      >
                        <option value="">{lang === 'vi' ? 'Chọn Phường/Xã' : 'Select Ward'}</option>
                        {formData.district && NEW_WARDS[formData.district] && NEW_WARDS[formData.district].map(w => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    )}

                    <input 
                      type="text" 
                      name="address"
                      placeholder={lang === 'vi' ? (useOldAddress || formData.district === 'Khác' || formData.district === 'Ngoài tỉnh' ? 'Địa chỉ chi tiết (Số nhà, Tên đường, Phường)' : 'Địa chỉ chi tiết (Số nhà, Tên đường)') : 'Detailed Address'} 
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border ${addressWarning ? 'border-amber-400' : 'border-gray-300'} rounded-md focus:outline-none focus:border-[#990000] text-sm`}
                    />
                    {addressWarning && (
                      <p className="text-amber-600 text-xs mt-1 animate-pulse font-medium">{addressWarning}</p>
                    )}
                  </>
                )}

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
              <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'vi' ? 'Phương thức thanh toán' : 'Payment Method'}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Cash */}
                <label className={`bg-white rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-row h-20 cursor-pointer group shadow-sm border ${paymentMethod === 'cod' ? 'border-[#990000] ring-1 ring-[#990000]/20' : 'border-gray-200'}`}>
                  <div className="w-[35%] h-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
                    <span className="font-black text-[#00687A] text-xl uppercase tracking-wider">CASH</span>
                  </div>
                  <div className="w-[65%] p-3 flex items-center bg-transparent border-l border-gray-100">
                    <div className="flex items-center gap-3 w-full group/link">
                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-black text-[#00687A] tracking-tight line-clamp-2">
                          {lang === 'vi' ? 'Thanh toán bằng Tiền mặt' : 'Pay with Cash'}
                        </span>
                      </div>
                      <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                    </div>
                  </div>
                </label>

                {/* Option 2: MoMo */}
                <label className={`bg-white rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-row h-20 cursor-pointer group shadow-sm border ${paymentMethod === 'momo' ? 'border-[#990000] ring-1 ring-[#990000]/20' : 'border-gray-200'}`}>
                  <div className="w-[35%] h-full relative overflow-hidden bg-[#a50064]/5 flex items-center justify-center p-2">
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@1a5b754e8930371efb213eda348b1e56f82ec6ef/MOMO-Logo-App.png" alt="MoMo" className="w-full h-full object-contain"  referrerPolicy="no-referrer"  loading="lazy" />
                  </div>
                  <div className="w-[65%] p-3 flex items-center bg-transparent border-l border-gray-100">
                    <div className="flex items-center gap-3 w-full group/link">
                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-black text-[#00687A] tracking-tight line-clamp-2">
                          {lang === 'vi' ? 'Thanh toán qua MoMo' : 'Pay via MoMo'}
                        </span>
                      </div>
                      <input type="radio" name="payment" value="momo" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} className="hidden" />
                    </div>
                  </div>
                </label>

                {/* Option 3: Bank Transfer */}
                <label className={`sm:col-span-2 bg-white rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-row h-20 cursor-pointer group shadow-sm border ${paymentMethod === 'bank_transfer' ? 'border-[#990000] ring-1 ring-[#990000]/20' : 'border-gray-200'}`}>
                  <div className="w-[35%] h-full relative overflow-hidden bg-white flex items-center justify-center p-3 border-r border-gray-100">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/VietQR_Logo.png" alt="VietQR" className="w-full h-full object-contain"  referrerPolicy="no-referrer"  loading="lazy" />
                  </div>
                  <div className="w-[65%] p-3 flex items-center bg-transparent border-l border-gray-100">
                    <div className="flex items-center gap-3 w-full group/link">
                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-black text-[#00687A] tracking-tight line-clamp-2">
                          {lang === 'vi' ? 'Chuyển khoản Ngân hàng' : 'Bank Transfer'}
                        </span>
                      </div>
                      <input type="radio" name="payment" value="bank_transfer" checked={paymentMethod === 'bank_transfer'} onChange={() => setPaymentMethod('bank_transfer')} className="hidden" />
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Gift Wrap options card */}
            <div className="pt-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{lang === 'vi' ? 'Hình Ảnh Bao Bì' : 'Packaging Image'}</h2>
              <div className="border border-gray-200 rounded-md overflow-hidden bg-[#F9F9F9] p-5 flex flex-col gap-4">
                <div className="flex gap-4 items-start">
                   <div className="flex items-start h-5 pt-0.5">
                       <CheckCircle className="w-5 h-5 text-[#00687A]" />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900 uppercase tracking-widest leading-none mb-1.5">{lang === 'vi' ? 'Hộp Gói Tiêu Chuẩn' : 'Bespoke Essential Box'}</h4>
                      <p className="text-xs text-gray-500 font-serif leading-relaxed">
                        {lang === 'vi' ? 'Hộp giấy tái chế bảo vệ môi trường, thiết kế tối giản, thanh lịch, đảm bảo an toàn cho sản phẩm.' : 'Minimalist eco-friendly protection box. Elegant and sustainable.'}
                      </p>
                   </div>
                   <span className="text-sm font-bold text-gray-400">{lang === 'vi' ? 'Miễn phí' : 'Complimentary'}</span>
                </div>
                
                {/* Packaging Images */}
                <div className="flex gap-2 w-full mt-2 pl-9">
                  <div 
                    className="w-[120px] h-[80px] bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setZoomImage('https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/BRAND%20ELEMENT%20(UPDATE)/Pakaging/Pakaging%20Ch%E1%BA%A1m%20-%20l%C3%BAc%20m%E1%BB%9F.jpg')}
                  >
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/BRAND%20ELEMENT%20(UPDATE)/Pakaging/Pakaging%20Ch%E1%BA%A1m%20-%20l%C3%BAc%20m%E1%BB%9F.jpg" alt="Packaging Box Open" className="w-full h-full object-cover"  referrerPolicy="no-referrer"  loading="lazy" />
                  </div>
                  <div 
                    className="w-[120px] h-[80px] bg-white rounded border border-gray-200 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setZoomImage('https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/BRAND%20ELEMENT%20(UPDATE)/Pakaging/Pakaging%20Ch%E1%BA%A1m%20-%20l%C3%BAc%20%C4%91%C3%B3ng.png')}
                  >
                    <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@f42cff5f483939de7ef9559c2f121d08444532ea/BRAND%20ELEMENT%20(UPDATE)/Pakaging/Pakaging%20Ch%E1%BA%A1m%20-%20l%C3%BAc%20%C4%91%C3%B3ng.png" alt="Packaging Box Closed" className="w-full h-full object-cover"  referrerPolicy="no-referrer"  loading="lazy" />
                  </div>
                </div>
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
                       
                     <img src={getCartItemImage(item)} alt={item.product?.name} className="w-full h-full object-contain mix-blend-multiply"  referrerPolicy="no-referrer"  loading="lazy" />

                   <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                     {item.quantity}
                   </div>
                 </div>
                 <div className="flex flex-col flex-1">
                   <span className="text-sm font-bold text-gray-900 line-clamp-1">
                     {(() => {
                        let itemName = lang === 'vi' ? item.product.vietnameseName : item.product.name;
                        if (item.customization?.comboId === 'couple_combo') {
                          return lang === 'vi' ? `Combo Chạm Cùng Nhau (${itemName})` : `Couple Combo (${itemName})`;
                        } else if (item.customization?.comboId === 'mirror_combo') {
                          return lang === 'vi' ? `Combo Chạm Ánh Nhìn (${itemName} & Gương)` : `Mirror Combo (${itemName} & Mirror)`;
                        }
                        return itemName;
                     })()}
                   </span>
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
                {globalDiscountCode.trim().toUpperCase() === 'CHAMISBYEUCOHOA' ? (
                  lang === 'vi' ? 'Đã áp dụng mã giảm 10%' : '10% discount applied'
                ) : (
                  lang === 'vi' ? 'Đã áp dụng mã giảm 15k phí vận chuyển' : '15k shipping discount applied'
                )}
              </div>
            )}
          </div>

          <div className="space-y-3 mb-6 border-b border-gray-200 pb-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{lang === 'vi' ? 'Phí vận chuyển' : 'Shipping'}</span>
              <span>{rawShippingFee > 0 ? formatVND(rawShippingFee) : (lang === 'vi' ? 'Miễn phí' : 'Free')}</span>
            </div>
            {/*
            {isBanToiYeu && shippingDiscount > 0 && (
              <div className="flex justify-between text-sm font-bold text-green-600">
                <span>{lang === 'vi' ? 'Giảm phí ship (BANTOIYEU)' : 'Shipping Discount (BANTOIYEU)'}</span>
                <span>-{formatVND(shippingDiscount)}</span>
              </div>
            )}
            {isChamis && (
              <div className="flex justify-between text-sm font-bold text-green-600">
                <span>{lang === 'vi' ? 'Giảm giá (10%)' : 'Discount (10%)'}</span>
                <span>-{formatVND(discountAmount)}</span>
              </div>
            )}
            */}
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
              <span>‹ {lang === 'vi' ? 'Quay lại' : 'Back'}</span>
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

      {showConfirmPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirmPopup(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="font-bold text-gray-900 uppercase tracking-wider relative z-10">
                {lang === 'vi' ? 'XÁC NHẬN THÔNG TIN' : 'CONFIRM INFORMATION'}
              </h3>
              <button onClick={() => setShowConfirmPopup(false)} className="text-gray-500 hover:text-gray-800 transition relative z-10">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold">{lang === 'vi' ? 'Người nhận' : 'Recipient'}</span>
                  <p className="font-medium text-gray-900 text-lg">{formData.name}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold">{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</span>
                  <p className="font-medium text-gray-900">{formData.phone}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold">{lang === 'vi' ? 'Phương thức nhận hàng' : 'Delivery Method'}</span>
                  <p className="font-medium text-gray-900">
                    {deliveryMethod === 'direct' 
                      ? (lang === 'vi' ? 'Nhận tại cửa hàng (279 Nguyễn Tri Phương, P.5, Q.10, TP.HCM)' : 'Direct Pickup') 
                      : (lang === 'vi' ? 'Giao hàng tận nơi' : 'Online Delivery')}
                  </p>
                </div>
                {deliveryMethod === 'online' && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-bold">{lang === 'vi' ? 'Địa chỉ' : 'Address'}</span>
                    <p className="font-medium text-gray-900">{formData.address}{formData.ward ? `, ${formData.ward}` : ""}, {formData.district}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold">{lang === 'vi' ? 'Phương thức thanh toán' : 'Payment Method'}</span>
                  <p className="font-medium text-gray-900">
                    {paymentMethod === 'cod' ? (lang === 'vi' ? 'Tiền mặt' : 'Cash') : paymentMethod.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowConfirmPopup(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md font-bold text-gray-600 uppercase text-xs hover:bg-gray-50 transition"
                >
                  {lang === 'vi' ? 'QUAY LẠI' : 'GO BACK'}
                </button>
                <button 
                  onClick={handleConfirmOrderInfo}
                  className="flex-1 px-4 py-3 bg-[#00687A] text-white rounded-md font-bold uppercase text-xs hover:bg-[#005161] transition"
                >
                  {lang === 'vi' ? 'TIẾP TỤC' : 'CONTINUE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreorderPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !preorderSuccess && handleCancelPreorder()}></div>
          <div className={`relative bg-white w-full ${(paymentMethod === 'bank_transfer' || paymentMethod === 'momo') && !preorderSuccess ? 'max-w-4xl' : 'max-w-lg'} rounded-xl shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto`}>
            {/* Header */}
            <div className="bg-[#E5F0F2] px-6 py-4 flex items-center justify-between border-b border-[#00687A]/20 sticky top-0 z-20">
              <h3 className="font-bold text-[#00687A] uppercase tracking-wider relative z-10 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                {lang === 'vi' ? 'THÔNG BÁO PRE-ORDER' : 'PRE-ORDER NOTICE'}
              </h3>
              {!preorderSuccess && (
                <button onClick={handleCancelPreorder} className="text-gray-500 hover:text-gray-800 transition relative z-10">
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              {!preorderSuccess ? (
                <>
                  {(paymentMethod === 'bank_transfer' || paymentMethod === 'momo') ? (
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      {/* Left Column: Intro & QR */}
                      <div className="flex-1">
                        <div className="text-gray-900 text-base font-semibold space-y-4 mb-6 leading-relaxed">
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
                        </div>
                        
                        <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-[#F9F9F9]">
                          <h4 className="font-bold text-[#00687A] mb-2 uppercase text-sm">
                            {lang === 'vi' ? 'Mã QR Thanh Toán' : 'Payment QR Code'}
                          </h4>
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-3 w-full max-w-sm mx-auto">
                            {paymentMethod === 'bank_transfer' ? (
                              <img 
                                src={`https://img.vietqr.io/image/970407-500217777777-compact2.png?amount=${total}&addInfo=${encodeURIComponent((formData.name + ' ' + formData.phone + ' ' + (currentOrderId || '')).trim())}&accountName=NGUYEN HOANG PHUC`} 
                                alt="QR Code" 
                                className="w-full h-auto object-contain mx-auto"
                               referrerPolicy="no-referrer"  loading="lazy" />
                            ) : (
                              <img 
                                src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@1d210243f851f1f56d6a41ba5c73144ff8636c8f/730775708_1725132161906814_8498991417054631504_n.jpg" 
                                alt="MoMo QR Code" 
                                className="w-full h-auto object-contain mx-auto"
                               referrerPolicy="no-referrer"  loading="lazy" />
                            )}
                          </div>
                          <div className="text-center mb-2">
                            <span className="font-bold text-[#990000] block mb-1">
                              {lang === 'vi' ? `Tổng: ${total.toLocaleString('vi-VN')} VND` : `Total: ${total.toLocaleString('vi-VN')} VND`}
                            </span>
                            <p className="text-xs text-gray-500 mb-1">{lang === 'vi' ? 'Mã QR sẽ hết hạn sau:' : 'QR Code expires in:'}</p>
                            <p className={`font-mono font-bold text-lg ${qrTimeLeft < 60 ? 'text-red-500' : 'text-[#00687A]'}`}>
                              {Math.floor(qrTimeLeft / 60).toString().padStart(2, '0')}:{(qrTimeLeft % 60).toString().padStart(2, '0')}
                            </p>
                          </div>
                          <div className="flex items-center justify-center mt-2">
                            {paymentMethod === 'bank_transfer' ? (
                              <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/VietQR_Logo.png" alt="VietQR" className="h-5 object-contain"  referrerPolicy="no-referrer"  loading="lazy" />
                            ) : (
                              <img src="https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@1a5b754e8930371efb213eda348b1e56f82ec6ef/MOMO-Logo-App.png" alt="MoMo" className="h-5 object-contain"  referrerPolicy="no-referrer"  loading="lazy" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Upload Proof */}
                      <div className="flex-1 flex flex-col justify-start">
                        <div className="w-full bg-white p-5 rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
                          <h4 className="font-bold text-base text-[#990000] mb-4">
                            {lang === 'vi' ? 'Minh chứng chuyển khoản *' : 'Payment Proof *'}
                          </h4>
                          <div className="border-2 border-dashed border-[#990000]/50 rounded-xl p-8 bg-[#FDF8F8] hover:bg-[#FDF0F0] transition cursor-pointer flex flex-col items-center justify-center relative flex-1 min-h-[200px]">
                            {paymentProofPreview ? (
                              <img src={paymentProofPreview} alt="Proof" className="max-h-56 object-contain rounded"  referrerPolicy="no-referrer"  loading="lazy" />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-500">
                                <UploadCloud className="w-8 h-8 mb-3 text-[#990000]" />
                                <p className="text-sm font-medium text-center text-[#990000]">
                                  {lang === 'vi' ? 'Ấn để chọn tệp tin hoặc kéo tệp tin vào...' : 'Click to select or drag and drop...'}
                                </p>
                                <p className="text-xs mt-2 text-gray-400">Dung lượng tối đa: 10 MB</p>
                              </div>
                            )}
                            <input 
                              type="file" 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                              accept="image/*" 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setPaymentProofFile(e.target.files[0]);
                                  setPaymentProofPreview(URL.createObjectURL(e.target.files[0]));
                                }
                              }} 
                            />
                          </div>
                          
                          <div className="mt-6 pt-5 border-t border-gray-100">
                            <p className="text-[#990000] font-bold text-sm mb-3">
                              {lang === 'vi' ? 'Bạn vui lòng điền nội dung chuyển khoản theo cú pháp dưới đây nhé:' : 'Please enter the transfer content exactly as formatted below:'}
                            </p>
                            <div className="bg-[#FDF8F8] p-3 rounded-lg border border-[#990000]/20 flex items-center justify-between">
                              <p className="text-gray-900 text-base font-semibold">
                                {formData.name || 'Tên'} {formData.phone || 'SĐT'} {currentOrderId || 'Mã Đơn Hàng'}
                              </p>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(`${formData.name} ${formData.phone} ${currentOrderId || ''}`.trim());
                                  setCopiedCode(true);
                                  setTimeout(() => setCopiedCode(false), 2000);
                                }}
                                className="text-[#990000] hover:bg-[#990000]/10 p-2 rounded transition flex items-center gap-1"
                              >
                                {copiedCode ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                <span className="text-xs font-bold">{copiedCode ? (lang === 'vi' ? 'Đã sao chép' : 'Copied') : (lang === 'vi' ? 'Sao chép' : 'Copy')}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-900 text-base font-semibold space-y-4 mb-8 leading-relaxed">
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
                    </div>
                  )}

                  <div className="flex gap-4 mt-auto">
                    <button 
                      onClick={handleCancelPreorder}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md font-bold text-gray-600 uppercase text-xs hover:bg-gray-50 transition"
                      disabled={isSubmitting}
                    >
                      {lang === 'vi' ? 'QUAY LẠI' : 'GO BACK'}
                    </button>
                    <button 
                      onClick={handleConfirmPreorder}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-[#00687A] text-white rounded-md font-bold uppercase text-xs hover:bg-[#005161] transition disabled:opacity-70 flex items-center justify-center text-center"
                    >
                      {isSubmitting ? (lang === 'vi' ? 'ĐANG XỬ LÝ...' : 'PROCESSING...') : paymentMethod === 'cod' ? (lang === 'vi' ? 'XÁC NHẬN HÓA ĐƠN' : 'CONFIRM INVOICE') : (lang === 'vi' ? 'XÁC NHẬN ĐÃ CHUYỂN KHOẢN' : 'CONFIRM PRE-ORDER')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E5F0F2] rounded-full flex items-center justify-center mx-auto mb-6 text-[#00687A]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {lang === 'vi' ? 'Pre-order Thành Công!' : 'Pre-order Successful!'}
                  </h4>
                  <p className="text-gray-600 text-sm mb-6">
                    {lang === 'vi' 
                      ? 'Yêu cầu của bạn đã được ghi nhận và đang chờ xử lý.' 
                      : 'Your request has been recorded and is pending processing.'}
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl mb-8">
                    <p className="text-sm font-bold text-gray-800">
                      {lang === 'vi' 
                        ? 'Lưu ý: Hàng sẽ có sau 2-5 ngày gia công tuỳ địa chỉ.' 
                        : 'Note: Goods will be available after 2-5 processing days depending on the address.'}
                    </p>
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

      {/* Zoom Image Popup */}
      {zoomImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <button 
            onClick={() => setZoomImage(null)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors bg-black/20 rounded-full p-2"
          >
            <X className="w-8 h-8" />
          </button>
          
          <img 
            src={zoomImage} 
            alt="Zoomed Packaging" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
           referrerPolicy="no-referrer"  loading="lazy" />
        </div>
      )}

    </div>
  );
};
