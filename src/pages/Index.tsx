
import React from 'react';
import LandingSearchBox from '@/components/LandingSearchBox';
import HeartAnimation from '@/components/HeartAnimation';
import WedPalLogo from '@/components/WedPalLogo';

const Index = () => {
  // Add CSS for dynamic gradient
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .dynamic-gradient {
        background: var(--dynamic-gradient, linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab));
        background-size: 400% 400%;
      }
      
      .gradient-overlay {
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* WedPal Logo repositioned further from the corner with larger size */}
      <div className="absolute top-8 left-8 z-10">
        <WedPalLogo className="text-4xl md:text-5xl text-white drop-shadow-lg" />
      </div>
      
      <HeartAnimation avoidTextAreas={true} />
      <LandingSearchBox />
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Index;
