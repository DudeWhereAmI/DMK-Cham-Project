import React, { useEffect, useState, useRef } from 'react';
import { Product, ElementType } from '../types';
import { PRODUCTS, ELEMENTS } from '../data';
import { Heart, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import dmkBrandElement1 from '../assets/dmk_brand_element_1.svg';
import mirrorVintage from '../assets/mirror_vintage.svg';

interface ShopGridProps {
  onSelectProduct: (product: Product, elementOverride?: ElementType) => void;
  lang: 'vi' | 'en';
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  recentlyViewedIds?: string[];
}

const ProductCarousel = ({ 
  title, 
  items, 
  lang, 
  wishlistIds, 
  onToggleWishlist, 
  onProductClick 
}: { 
  title: string, 
  items: { product: Product, elementOverride?: ElementType, titleOverride?: string }[],
  lang: 'vi' | 'en',
  wishlistIds: string[],
  onToggleWishlist?: (productId: string) => void,
  onProductClick: (prod: Product, elementOverride?: ElementType) => void
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollable = scrollWidth - clientWidth;
      const progress = scrollable > 0 ? scrollLeft / scrollable : 0;
      setScrollProgress(progress);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollable - 10);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const updateScrollFromPointer = (e: React.PointerEvent | PointerEvent) => {
    if (!progressBarRef.current || !scrollRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    scrollRef.current.scrollLeft = percentage * maxScroll;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateScrollFromPointer(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateScrollFromPointer(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const [isDraggingContainer, setIsDraggingContainer] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleContainerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with primary button (left click)
    if (e.button !== 0) return;
    setIsDraggingContainer(true);
    setDragged(false);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeftState(e.currentTarget.scrollLeft);
  };

  const handleContainerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingContainer) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (Math.abs(walk) > 5) {
      setDragged(true);
    }
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeftState - walk;
    }
  };

  const handleContainerPointerUp = () => {
    setIsDraggingContainer(false);
  };

  const handleContainerPointerLeave = () => {
    setIsDraggingContainer(false);
  };

  const renderProduct = (item: { product: Product, elementOverride?: ElementType, titleOverride?: string, imageOverride?: string }, index: number) => {
    const { product: prod, elementOverride, titleOverride, imageOverride } = item;
    const isWished = wishlistIds.includes(prod.id);
    const transName = titleOverride || (lang === 'vi' ? prod.vietnameseName : prod.name);
    
    // Determine the image to show
    let imgSrc = prod.images?.['none'] 
      ? prod.images['none'] 
      : (prod.category.startsWith('clip') || prod.category === 'limited' ? dmkBrandElement1 : mirrorVintage);
      
    if (elementOverride && prod.images?.[elementOverride]) {
      imgSrc = prod.images[elementOverride];
    }
    
    if (imageOverride) {
      imgSrc = imageOverride;
    }

    return (
      <div 
        key={`${prod.id}-${elementOverride || 'default'}-${index}`}
        className="group relative flex flex-col cursor-pointer w-[240px] md:w-[280px] shrink-0 min-w-[240px] md:min-w-[280px] max-w-[240px] md:max-w-[280px] snap-start"
        onClickCapture={(e) => {
          if (dragged) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        onClick={() => {
          if (!dragged) onProductClick(prod, elementOverride);
        }}
      >
        <div className="bg-[#F5F5F5] rounded-xl aspect-[4/5] relative overflow-hidden flex items-center justify-center mb-3">
          {/* Wishlist Button */}
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              if (!dragged && onToggleWishlist) onToggleWishlist(prod.id);
            }}
            className="absolute top-4 right-4 z-10 p-1"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isWished ? 'fill-[#990000] text-[#990000]' : 'text-[#990000]'}`} 
            />
          </button>

          {/* Product Image */}
          <div className="w-full h-full p-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <img 
              src={imgSrc} 
              className="w-full h-full object-contain mix-blend-multiply select-none" 
              alt={transName}
              referrerPolicy="no-referrer"
              draggable={false}
            />
          </div>

          {/* Add/Customize Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!dragged) onProductClick(prod, elementOverride);
            }}
            className="absolute bottom-4 right-4 w-7 h-7 bg-[#990000] rounded-md flex items-center justify-center text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Product Details */}
        <div className="mt-1 pb-4">
          <h4 className="text-sm text-gray-900 leading-snug line-clamp-2">
            {transName}
          </h4>
          <p className="text-sm font-bold text-gray-900 mt-1 flex items-center gap-1">
            <span className="text-[10px] underline translate-y-[-1px]">đ</span>
            {new Intl.NumberFormat('vi-VN').format(prod.basePrice)}
          </p>
        </div>
      </div>
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')} 
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button 
            onClick={() => scroll('right')} 
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>
      
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onPointerDown={handleContainerPointerDown}
        onPointerMove={handleContainerPointerMove}
        onPointerUp={handleContainerPointerUp}
        onPointerLeave={handleContainerPointerLeave}
        onPointerCancel={handleContainerPointerUp}
        className={`flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-1 ${isDragging ? 'pointer-events-none' : ''} ${isDraggingContainer ? 'cursor-grabbing touch-none' : 'cursor-grab'} ${(isDragging || isDraggingContainer) ? '' : 'snap-x snap-mandatory'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => renderProduct(item, idx))}
      </div>
      
      {/* Progress tracking bar */}
      <div 
        ref={progressBarRef}
        className="mt-2 w-full max-w-md mx-auto h-2 bg-slate-200 rounded-full overflow-hidden cursor-pointer touch-none relative group"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Make hit area larger */}
        <div className="absolute inset-x-0 -top-2 -bottom-2" />
        <div 
          className="h-full bg-[#990000] rounded-full transition-all duration-300 ease-out group-hover:bg-[#b30000]"
          style={{ 
            width: `${Math.max(10, scrollProgress * 100)}%`,
            transition: isDragging ? 'none' : 'width 300ms ease-out' 
          }}
        />
      </div>
    </section>
  );
};

export const ShopGrid: React.FC<ShopGridProps> = ({ onSelectProduct, lang, wishlistIds = [], onToggleWishlist, recentlyViewedIds = [] }) => {
  const handleProductClick = (prod: Product, elementOverride?: ElementType) => {
    onSelectProduct(prod, elementOverride);
  };

  // 1. Material Items
  const materialItems = PRODUCTS.map(p => ({ product: p }));
  
  // 2. Elements Items (Use the first product which has element-specific images)
  const baseProduct = PRODUCTS[0];
  const elementItems = ELEMENTS.map(el => ({
    product: baseProduct,
    elementOverride: el.type,
    titleOverride: lang === 'vi' ? el.nameVi : el.nameEn,
    imageOverride: el.guardianImg
  }));

  // 3. Recently Viewed
  const recentlyViewedItems = recentlyViewedIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined)
    .map(p => ({ product: p }));

  return (
    <div id="shop-catalog-view" className="space-y-16 pb-12 overflow-hidden">
      
      {/* Category 1: By Material */}
      <ProductCarousel 
        title={lang === 'vi' ? 'Chất Liệu' : 'Materials'} 
        items={materialItems}
        lang={lang}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onProductClick={handleProductClick}
      />

      {/* Category 2: By Five Elements */}
      <ProductCarousel 
        title={lang === 'vi' ? 'Ngũ Hành' : 'Five Elements'} 
        items={elementItems}
        lang={lang}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onProductClick={handleProductClick}
      />

      {/* Category 3: Recently Viewed */}
      {recentlyViewedItems.length > 0 && (
        <React.Fragment>
          <div className="w-full h-px bg-slate-200/60 my-4" />
          <ProductCarousel 
            title={lang === 'vi' ? 'Sản phẩm đã xem' : 'Recently Viewed'} 
            items={recentlyViewedItems}
            lang={lang}
            wishlistIds={wishlistIds}
            onToggleWishlist={onToggleWishlist}
            onProductClick={handleProductClick}
          />
        </React.Fragment>
      )}

    </div>
  );
};
