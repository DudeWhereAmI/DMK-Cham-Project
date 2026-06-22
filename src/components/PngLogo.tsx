import React from 'react';

export const LOGO_VERTICAL_URL = 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/4f54e36f4edb0f4fb21768cae473d0fbcf33c436/LOGO%20.png';
export const LOGO_HORIZONTAL_URL = 'https://raw.githubusercontent.com/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project/c3dbd2a321a518bd4dabdde2b3fd07ccca4333b9/DMK%20%20BRAND%20ELEMENT%20.png';

interface PngLogoProps {
  className?: string;
  alt?: string;
}

export const PngLogoCircular: React.FC<PngLogoProps> = ({ className = 'h-28 w-auto', alt = 'Chạm Vertical Logo' }) => {
  return (
    <img 
      src={LOGO_VERTICAL_URL} 
      className={`${className} object-contain transition-all duration-300`} 
      alt={alt} 
      referrerPolicy="no-referrer" 
    />
  );
};

export const PngLogoHorizontal: React.FC<PngLogoProps> = ({ className = 'h-14 w-auto', alt = 'Chạm Horizontal Logo' }) => {
  return (
    <img 
      src={LOGO_HORIZONTAL_URL} 
      className={`${className} object-contain transition-all duration-300`} 
      alt={alt} 
      referrerPolicy="no-referrer" 
    />
  );
};

