import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Product, ElementProfile, CustomizationState, CharmItem } from '../types';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import dmkBrandElement1 from '../assets/dmk_brand_element_1.svg';
import mirrorVintage from '../assets/mirror_vintage.svg';

interface ProductVisualizerProps {
  product: Product;
  element: ElementProfile;
  customization: CustomizationState;
  selectedCharms: CharmItem[];
  onUpdateCustomization: (updater: Partial<CustomizationState>) => void;
}

export const ProductVisualizer: React.FC<ProductVisualizerProps> = ({
  product,
  element,
  customization,
  selectedCharms,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isClip = product.category.startsWith('clip') || product.category === 'limited';

  // Gather all available product images
  const images: string[] = [];
  if (product.images) {
    if (product.images['none']) images.push(product.images['none']);
    if (product.category === 'limited' && product.images['sunlight']) {
      images.push(product.images['sunlight']);
    }
    // Add element-specific images if available
    Object.values(product.images).forEach(img => {
      if (img && !images.includes(img)) images.push(img);
    });
  } else {
    images.push(isClip ? dmkBrandElement1 : mirrorVintage);
  }

  // Fallback if no images
  if (images.length === 0) {
    images.push(isClip ? dmkBrandElement1 : mirrorVintage);
  }

  // Effect to switch to the element's image when element changes
  useEffect(() => {
    if (element && element.type && product.images && product.images[element.type]) {
      const targetImg = product.images[element.type];
      const idx = images.indexOf(targetImg);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element.type, product.id]);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const safeIndex = currentIndex >= images.length ? 0 : currentIndex;
  const currentImage = images[safeIndex];

  const galleryView = (
    <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[calc(100vh-280px)] lg:max-h-[600px] bg-[#F3F3F3] rounded-sm flex items-center justify-center group overflow-hidden">
      <img 
        src={currentImage} 
        alt={product.name} 
        className="w-[85%] h-[85%] object-contain select-none"
        draggable={false}
        referrerPolicy="no-referrer"
      />
      
      {/* Zoom Button */}
      <button 
        onClick={() => setIsFullscreen(true)}
        className="absolute top-4 right-4 p-2 bg-transparent hover:bg-black/5 rounded-full transition-colors"
      >
        <Search className="w-5 h-5 text-gray-800" strokeWidth={2} />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === safeIndex ? 'bg-gray-800' : 'bg-gray-400/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="w-full flex flex-col space-y-4">
      {galleryView}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex items-center justify-center flex-shrink-0 w-20 h-24 bg-[#F3F3F3] rounded-sm overflow-hidden border-2 transition-colors ${idx === safeIndex ? 'border-[#00687A]' : 'border-transparent'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover scale-[1.2] select-none pointer-events-none origin-center" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Overlay */}
      {isFullscreen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-[#F3F3F3]/95 backdrop-blur-sm flex items-center justify-center cursor-pointer"
          onClick={() => setIsFullscreen(false)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
            className="absolute top-6 right-6 p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors z-10 cursor-pointer"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
          
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={currentImage} 
              alt={product.name} 
              className="w-full h-full object-contain p-8 md:p-16 select-none cursor-default"
              referrerPolicy="no-referrer"
            />
          </div>

          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all text-gray-800 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all text-gray-800 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator in Fullscreen */}
              <div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors shadow-sm cursor-pointer ${idx === safeIndex ? 'bg-[#00687A] scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
