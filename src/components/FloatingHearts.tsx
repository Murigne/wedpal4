
import React from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 10 }) => {
  const hearts = Array.from({ length: count }).map((_, index) => {
    const size = Math.floor(Math.random() * 20) + 10; // Random size between 10px and 30px
    const left = Math.floor(Math.random() * 100); // Random position from left (0% to 100%)
    const animationDelay = Math.random() * 5; // Random delay for animation
    const opacity = Math.random() * 0.5 + 0.1; // Random opacity between 0.1 and 0.6
    
    return (
      <div
        key={index}
        className="floating-heart"
        style={{
          left: `${left}%`,
          top: `${Math.floor(Math.random() * 100)}%`,
          animationDelay: `${animationDelay}s`,
          opacity
        }}
      >
        <Heart size={size} fill="#FAD2E1" />
      </div>
    );
  });

  return <>{hearts}</>;
};

export default FloatingHearts;
