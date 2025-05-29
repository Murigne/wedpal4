
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Headline */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Dream Wedding
            <br />
            <span className="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              Begins Here
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Plan your perfect day with AI-powered recommendations, 
            budget management, and vendor connections all in one magical place.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2" fill="currentColor" />
            Start Planning
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            See How It Works
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="relative">
          <div className="absolute -top-20 -left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute -top-32 -right-16 w-16 h-16 bg-pink-300/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-10 left-1/3 w-12 h-12 bg-white/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
