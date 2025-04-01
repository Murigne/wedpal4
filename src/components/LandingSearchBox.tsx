
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingSearchBox = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Start the onboarding process when user submits
    navigate('/onboarding');
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow-md">
        Wanna get married? We are here to help <span className="text-pink-300">: )</span>
      </h1>
      
      {/* Search box */}
      <div className="bg-white rounded-xl shadow-xl p-1">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tell us about your dream wedding..."
            className="w-full pl-5 pr-16 py-4 text-base md:text-lg rounded-lg focus:outline-none"
          />
          <Button 
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </form>
      </div>
      
      {/* Login button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/auth')}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
        >
          Already planning? Login
        </Button>
      </div>
      
      {/* Decorative elements */}
      <div className="text-center text-white/80 text-sm mt-8">
        <p>Start planning your perfect day with us</p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <Heart className="h-4 w-4 text-pink-300 fill-pink-300" />
          <span>Forever Together</span>
          <Heart className="h-4 w-4 text-pink-300 fill-pink-300" />
        </div>
      </div>
    </div>
  );
};

export default LandingSearchBox;
