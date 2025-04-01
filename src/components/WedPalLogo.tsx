
import React from 'react';

interface WedPalLogoProps {
  className?: string;
}

const WedPalLogo: React.FC<WedPalLogoProps> = ({ className = "" }) => {
  return (
    <div className={`font-satisfy text-3xl text-white drop-shadow-md ${className}`}>
      WedPal
    </div>
  );
};

export default WedPalLogo;
