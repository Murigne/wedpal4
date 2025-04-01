
import React from 'react';
import LandingSearchBox from '@/components/LandingSearchBox';
import HeartAnimation from '@/components/HeartAnimation';

const Index = () => {
  // Add CSS for dynamic gradient
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .dynamic-gradient {
        background: var(--dynamic-gradient, linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab));
        background-size: 400% 400%;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center justify-center p-4 relative">
      <HeartAnimation />
      <LandingSearchBox />
      
      {/* Mistletoe at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <img 
          src="/lovable-uploads/ec664159-76dd-48c9-9c16-8a3bd2fb037c.png" 
          alt="Mistletoe decoration" 
          className="w-full h-auto object-cover" 
          style={{ maxHeight: '150px' }}
        />
      </div>
    </div>
  );
};

export default Index;
