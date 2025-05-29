
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeartAnimation from '@/components/HeartAnimation';
import WedPalLogo from '@/components/WedPalLogo';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

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
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 pt-8 z-20 w-full">
        <div className="w-full flex justify-between items-center px-8 md:px-12">
          <WedPalLogo className="text-4xl md:text-5xl text-white drop-shadow-lg" />
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleLoginClick}
              variant="ghost"
              className="text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Login
            </Button>
            <Button 
              onClick={handleVendorSignupClick}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
            >
              For Vendors
            </Button>
          </div>
        </div>
      </header>
      
      <HeartAnimation avoidTextAreas={true} count={8} />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onGetStarted={handleGetStartedClick} />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection onGetStarted={handleGetStartedClick} />
        <LandingFooter />
      </main>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Index;
