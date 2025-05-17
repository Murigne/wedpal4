
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeartAnimation from '@/components/HeartAnimation';
import WedPalLogo from '@/components/WedPalLogo';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import LandingCTA from '@/components/landing/LandingCTA';
import LandingFooter from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';

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
  
  const handleGetStartedClick = () => {
    navigate('/onboarding');
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen animated-gradient flex flex-col relative overflow-hidden">
      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-sm bg-white/10">
        <div className="w-full flex justify-between items-center px-4 sm:px-8 py-4 md:py-5 max-w-7xl mx-auto">
          <WedPalLogo className="text-3xl md:text-4xl text-white drop-shadow-md" linkToHome={true} />
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              onClick={handleLoginClick}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              Log In
            </Button>
            
            <Button 
              onClick={handleVendorSignupClick}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
            >
              Vendor Sign Up
            </Button>
          </div>
        </div>
      </header>
      
      {/* Background animation */}
      <HeartAnimation avoidTextAreas={true} count={15} />
      
      {/* Main content */}
      <main className="flex-1 pt-20">
        <LandingHero onGetStarted={handleGetStartedClick} />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingTestimonials />
        <LandingCTA onGetStarted={handleGetStartedClick} />
      </main>
      
      <LandingFooter />
      
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Index;
