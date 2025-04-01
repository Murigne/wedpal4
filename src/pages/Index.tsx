
import React from 'react';
import LandingSearchBox from '@/components/LandingSearchBox';
import HeartAnimation from '@/components/HeartAnimation';

const Index = () => {
  // Add CSS for dynamic gradient and flower animation
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
      
      @keyframes gentle-sway {
        0% { transform: translateX(-5px) rotate(-0.5deg); }
        50% { transform: translateX(5px) rotate(0.5deg); }
        100% { transform: translateX(-5px) rotate(-0.5deg); }
      }
      
      .flower-animation {
        animation: gentle-sway 6s ease-in-out infinite;
        transform-origin: bottom center;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HeartAnimation />
      <LandingSearchBox />
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
      
      {/* Bouquet of flowers at the bottom with animation */}
      <div className="absolute bottom-0 left-0 w-full">
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
          alt="Bouquet of flowers" 
          className="w-full h-auto object-cover flower-animation" 
          style={{ maxHeight: '150px' }}
        />
      </div>
    </div>
  );
};

export default Index;
