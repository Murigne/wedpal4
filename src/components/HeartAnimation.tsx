
import React, { useEffect, useRef } from 'react';

interface HeartAnimationProps {
  avoidTextAreas?: boolean;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ avoidTextAreas = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create small hearts at random positions
    const createHeart = () => {
      const container = containerRef.current;
      if (!container) return;
      
      // Create a new heart container
      const heartContainer = document.createElement('div');
      heartContainer.className = 'absolute';
      
      // Random position on the screen
      const x = Math.random() * (window.innerWidth - 80);
      const y = Math.random() * (window.innerHeight - 80);
      
      // If avoidTextAreas is true, avoid placing hearts in areas with text
      if (avoidTextAreas) {
        // Get all text elements on the page
        const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, label, button, input, textarea, a, li, span');
        
        // Check if the heart overlaps with any text element
        let overlaps = false;
        const padding = 40; // Extra padding around text elements
        
        textElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          
          if (
            x + 40 > rect.left - padding && 
            x < rect.right + padding && 
            y + 40 > rect.top - padding && 
            y < rect.bottom + padding
          ) {
            overlaps = true;
          }
        });
        
        // If overlaps, try another position
        if (overlaps) {
          return;
        }
      }
      
      heartContainer.style.left = `${x}px`;
      heartContainer.style.top = `${y}px`;
      heartContainer.style.width = '40px';
      heartContainer.style.height = '40px';
      
      // Create SVG for the heart
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '40');
      svg.setAttribute('height', '40');
      svg.setAttribute('viewBox', '0 0 40 40');
      
      // Create heart path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M20,15 C17,10 10,10 10,15 C10,20 15,22 20,30 C25,22 30,20 30,15 C30,10 23,10 20,15 Z');
      path.setAttribute('stroke', 'rgba(255, 255, 255, 0.6)');
      path.setAttribute('stroke-width', '1');
      path.setAttribute('fill', 'none');
      path.classList.add('small-heart-path');
      
      svg.appendChild(path);
      heartContainer.appendChild(svg);
      
      // Create vertices (small circles)
      const numVertices = 6 + Math.floor(Math.random() * 4); // 6-9 vertices
      for (let i = 0; i < numVertices; i++) {
        const circle = document.createElement('div');
        circle.className = 'heart-vertex';
        
        // Position circles along the heart path
        const angle = (i / numVertices) * Math.PI * 2;
        const radius = 15 + Math.random() * 5; // Random radius variation
        const circleX = 20 + Math.cos(angle) * radius;
        const circleY = 20 + Math.sin(angle) * radius;
        
        circle.style.left = `${circleX}px`;
        circle.style.top = `${circleY}px`;
        
        // Random size variation
        const size = 3 + Math.random() * 2;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        
        // Random delay for animation
        circle.style.animationDelay = `${Math.random() * 2}s`;
        
        heartContainer.appendChild(circle);
      }
      
      container.appendChild(heartContainer);
      
      // Remove heart after animation completes
      setTimeout(() => {
        if (heartContainer.parentNode === container) {
          container.removeChild(heartContainer);
        }
      }, 4000);
    };
    
    // Create hearts periodically
    const interval = setInterval(createHeart, 800);
    
    // Create some initial hearts
    for (let i = 0; i < 5; i++) {
      setTimeout(createHeart, i * 400);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [avoidTextAreas]);
  
  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
  );
};

export default HeartAnimation;
