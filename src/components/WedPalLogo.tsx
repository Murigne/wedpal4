
import React, { useEffect, useRef } from 'react';

interface WedPalLogoProps {
  className?: string;
}

const WedPalLogo: React.FC<WedPalLogoProps> = ({ className = "" }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add CSS for letter-by-letter gradient animation
    const style = document.createElement('style');
    style.textContent = `
      .logo-letter {
        display: inline-block;
        color: white;
        transition: color 0.3s ease;
      }
      
      @keyframes gradient-shift {
        0% { color: white; }
        25% { color: var(--wedding-color-primary); }
        50% { color: var(--wedding-pink-dark); }
        75% { color: var(--gold); }
        100% { color: white; }
      }
    `;
    document.head.appendChild(style);
    
    // Function to animate each letter
    const animateLetters = () => {
      if (!logoRef.current) return;
      
      const letters = logoRef.current.querySelectorAll('.logo-letter');
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.classList.add('animating');
          letter.style.animation = 'gradient-shift 2s ease';
          
          // Reset animation after it completes
          setTimeout(() => {
            letter.style.animation = '';
            letter.classList.remove('animating');
          }, 2000);
        }, index * 200); // Stagger the animation for each letter
      });
      
      // Repeat the animation after all letters have been animated
      setTimeout(() => {
        animateLetters();
      }, letters.length * 200 + 2000);
    };
    
    // Start the animation
    animateLetters();
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={logoRef} className={`font-satisfy text-3xl ${className}`}>
      {'WedPal'.split('').map((letter, index) => (
        <span key={index} className="logo-letter">
          {letter}
        </span>
      ))}
    </div>
  );
};

export default WedPalLogo;
