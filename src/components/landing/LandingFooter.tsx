
import React from 'react';
import WedPalLogo from '@/components/WedPalLogo';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="py-16 px-4 border-t border-white/20 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <WedPalLogo className="text-3xl text-white mb-4" />
            <p className="text-white/70 max-w-md leading-relaxed">
              Making wedding planning magical with AI-powered recommendations, 
              budget management, and vendor connections.
            </p>
            <div className="flex items-center mt-4 text-white/60">
              <Heart className="w-4 h-4 mr-2" fill="currentColor" />
              <span className="text-sm">Made with love for couples everywhere</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For Vendors</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 WedPal. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center text-white/60 text-sm">
              <Mail className="w-4 h-4 mr-2" />
              hello@wedpal.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
