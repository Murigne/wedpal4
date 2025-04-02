
import React from 'react';
import { Check } from 'lucide-react';
import WedPalLogo from '@/components/WedPalLogo';

const LoginFeatures: React.FC = () => {
  return (
    <div className="mb-8">
      <WedPalLogo className="text-4xl md:text-5xl mb-2" />
      <h2 className="text-2xl md:text-3xl font-medium mb-6">Where Love Brews</h2>
      
      <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed">
        ✨ WedPal takes the stress out of wedding planning, no matter your budget!
        <br /><br />
        ✨ From personalized plans to budget friendly vendors, we simplify every step of the wedding planning journey
        <br /><br />
        ✨ Our AI-powered platform ensures a seamless, beautiful, and memorable wedding experience.
        <br /><br />
        ✨ Weddings are fun - planning them should be equally fun and stress-free don't you think? 😊
      </p>
      
      <ul className="space-y-4">
        <li className="flex items-center">
          <div className="rounded-full bg-white/20 p-2 mr-3">
            <Check className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg">Stress Free</span>
        </li>
        <li className="flex items-center">
          <div className="rounded-full bg-white/20 p-2 mr-3">
            <Check className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg">Budget Friendly & Personalized</span>
        </li>
        <li className="flex items-center">
          <div className="rounded-full bg-white/20 p-2 mr-3">
            <Check className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg">Memorable & Seamless Experience</span>
        </li>
      </ul>
    </div>
  );
};

export default LoginFeatures;
