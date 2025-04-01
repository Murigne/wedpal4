
import React, { useEffect, useRef } from 'react';

const HeartAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sparklesRef.current) return;
    
    // Create sparkles
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // Random position near the heart
      const heartWidth = 800;
      const heartHeight = 800;
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Random position along the heart path
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 120 + 200; // Position along heart outline
      const x = centerX + Math.cos(angle) * distance - 6;
      const y = centerY + Math.sin(angle) * distance - 6;
      
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      
      // Random delay
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      
      sparklesRef.current?.appendChild(sparkle);
      
      // Remove sparkle after animation
      setTimeout(() => {
        sparkle.remove();
      }, 2000);
    };
    
    // Create sparkles periodically
    const interval = setInterval(createSparkle, 200);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div ref={sparklesRef} className="absolute inset-0"></div>
      <svg 
        ref={svgRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        width="800" 
        height="800" 
        viewBox="0 0 100 100" 
        fill="none"
      >
        <path
          className="infinite-heart-path"
          d="M50,30 C35,10 10,20 10,40 C10,60 25,65 50,90 C75,65 90,60 90,40 C90,20 65,10 50,30 Z"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default HeartAnimation;
