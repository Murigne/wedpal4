
import React from 'react';
import LandingSearchBox from '@/components/LandingSearchBox';
import HeartAnimation from '@/components/HeartAnimation';
import WedPalLogo from '@/components/WedPalLogo';
import { Button } from '@/components/ui/button';

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
      {/* WedPal Logo repositioned further from the corner */}
      <div className="absolute top-6 left-8 z-10">
        <WedPalLogo className="drop-shadow-lg" />
      </div>
      
      <HeartAnimation />
      <LandingSearchBox />
      
      {/* Navigation buttons at the bottom */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 px-4 z-10">
        <Button variant="outline" className="bg-white/60 backdrop-blur-sm text-gray-800 hover:bg-white/80">Contact Us</Button>
        <Button variant="outline" className="bg-white/60 backdrop-blur-sm text-gray-800 hover:bg-white/80">About</Button>
        <Button variant="outline" className="bg-white/60 backdrop-blur-sm text-gray-800 hover:bg-white/80">Help</Button>
        <Button variant="outline" className="bg-white/60 backdrop-blur-sm text-gray-800 hover:bg-white/80">FAQ</Button>
      </div>
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Index;
