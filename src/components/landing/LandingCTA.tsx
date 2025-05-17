
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import FloatingHearts from '@/components/FloatingHearts';

interface LandingCTAProps {
  onGetStarted: () => void;
}

const LandingCTA: React.FC<LandingCTAProps> = ({ onGetStarted }) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden z-10">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute inset-0 pointer-events-none">
          <FloatingHearts count={20} />
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-pink-100 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Planning Your Dream Wedding?
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of couples who have planned their perfect day with WedPal's AI-powered tools and expert guidance.
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-lg"
          >
            Get Started Now
            <ArrowRight className="ml-2" />
          </Button>
          
          <p className="text-gray-500 mt-4">
            No credit card required · Free forever · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;
