
import React from 'react';
import { Link } from 'react-router-dom';

interface WedPalLogoProps {
  className?: string;
  linkToHome?: boolean;
}

const WedPalLogo: React.FC<WedPalLogoProps> = ({ 
  className = "", 
  linkToHome = false 
}) => {
  const logoContent = (
    <div className={`font-satisfy ${className}`}>
      WedPal
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="hover:opacity-90 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default WedPalLogo;
