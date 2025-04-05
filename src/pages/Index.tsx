
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingSearchBox from '@/components/LandingSearchBox';
import HeartAnimation from '@/components/HeartAnimation';
import WedPalLogo from '@/components/WedPalLogo';

const Index = () => {
  const navigate = useNavigate();
  
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

  const handleVendorSignupClick = () => {
    navigate('/vendor-signup');
  };

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="container mx-auto max-w-[1600px] flex justify-between items-center px-2">
          <WedPalLogo className="text-4xl md:text-5xl text-white drop-shadow-lg ml-4" />
          
          <Button 
            onClick={handleVendorSignupClick}
            className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
          >
            Sign Up as a Vendor
          </Button>
        </div>
      </div>
      
      <HeartAnimation avoidTextAreas={true} />
      <LandingSearchBox />
      
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Index;
