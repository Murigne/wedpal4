
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Planning
            <br />
            <span className="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              Your Perfect Wedding?
            </span>
          </h2>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of couples who've planned their dream wedding with WedPal. 
            Your magical day is just a few clicks away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2" fill="currentColor" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <p className="text-white/60 text-sm mt-6">
            Free to start • No credit card required • Trusted by 10,000+ couples
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
