
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingSearchBox = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="z-10 w-full max-w-md md:max-w-lg">
      <div className={`wedding-card transition-all duration-300 ${searchFocused ? 'scale-[1.02]' : ''}`}>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Forever <span className="text-wedding-pink-dark">Together</span>
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Let's plan the wedding of your dreams, every step of the way
        </p>
        
        <form onSubmit={handleSubmit} className="relative mb-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="What kind of wedding do you dream of?"
              className="wedding-input w-full pl-10 pr-28"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Button 
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 wedding-button text-sm px-4 py-1 h-auto"
            >
              Let's Start
            </Button>
          </div>
        </form>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Button 
            variant="ghost" 
            className="flex items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => navigate('/onboarding')}
          >
            <Heart className="h-3 w-3 text-wedding-pink-dark" />
            <span>Plan My Wedding</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => navigate('/onboarding')}
          >
            <ArrowRight className="h-3 w-3 text-wedding-pink-dark" />
            <span>Get Started</span>
          </Button>
        </div>
      </div>
      
      <div className="text-white text-center text-sm mt-8 space-y-1 drop-shadow-lg">
        <p>Create the perfect wedding with AI assistance</p>
        <p className="text-xs opacity-80">Vendors, budgeting, timelines & more</p>
      </div>
    </div>
  );
};

export default LandingSearchBox;
