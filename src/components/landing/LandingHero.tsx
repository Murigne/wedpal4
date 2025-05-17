
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import LandingSearchBox from '@/components/LandingSearchBox';

interface LandingHeroProps {
  onGetStarted: () => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onGetStarted }) => {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Plan Your Dream Wedding, <span className="font-satisfy">Effortlessly</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
          WedPal helps you organize every detail of your special day with AI-powered planning tools, vendor connections, and personalized recommendations.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-pink-500 hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="ml-2" />
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="bg-transparent border border-white text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full"
          >
            See How It Works
          </Button>
        </div>
        
        <LandingSearchBox />
        
        <div className="mt-8 flex justify-center gap-6">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm text-white font-medium">1,000+ Vendors</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm text-white font-medium">10,000+ Happy Couples</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-sm text-white font-medium">100% AI Powered</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
