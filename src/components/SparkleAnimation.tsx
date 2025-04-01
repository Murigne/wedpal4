
import React, { useEffect, useRef } from 'react';

interface SparkleAnimationProps {
  initials: string;
  welcomeMessage: string;
}

const SparkleAnimation: React.FC<SparkleAnimationProps> = ({ initials, welcomeMessage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    alpha: number;
    color: string;
  }>>([]);
  const animationFrameId = useRef<number>(0);
  
  // State to control text animation phases
  const [showInitials, setShowInitials] = React.useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = React.useState(false);
  const [initialsFade, setInitialsFade] = React.useState(0);
  const [messageFade, setMessageFade] = React.useState(0);
  
  useEffect(() => {
    // Timeline for animations
    const timer1 = setTimeout(() => {
      setShowInitials(true);
    }, 1000);
    
    const timer2 = setTimeout(() => {
      setInitialsFade(1);
    }, 1500);
    
    const timer3 = setTimeout(() => {
      setShowWelcomeMessage(true);
    }, 3000);
    
    const timer4 = setTimeout(() => {
      setMessageFade(1);
    }, 3500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create initial particles
    const createParticles = () => {
      const particleCount = 150;
      particles.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          alpha: Math.random(),
          color: `hsl(${Math.random() * 60 + 40}, 100%, ${Math.random() * 20 + 70}%)` // Golden colors
        });
      }
    };
    
    createParticles();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.current.forEach(particle => {
        // Update position with a wavy motion
        particle.x += particle.speedX;
        particle.y += particle.speedY + Math.sin(Date.now() * 0.001 + particle.x * 0.1) * 0.5;
        
        // Particles fade in and out
        particle.alpha += Math.random() * 0.1 - 0.05;
        if (particle.alpha <= 0) particle.alpha = 0;
        if (particle.alpha >= 1) particle.alpha = 1;
        
        // Reset particles that go off screen
        if (particle.x < 0 || particle.x > canvas.width || 
            particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.speedX = Math.random() * 2 - 1;
          particle.speedY = Math.random() * 2 - 1;
        }
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`).replace('rgb', 'rgba');
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      
      <div className="relative z-20 text-center px-6">
        {showInitials && (
          <div 
            className="text-6xl font-bold mb-8 transition-opacity duration-1000"
            style={{ opacity: initialsFade }}
          >
            <span className="text-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
              {initials}
            </span>
          </div>
        )}
        
        {showWelcomeMessage && (
          <p 
            className="text-xl font-medium text-white bg-black/20 p-4 rounded-lg backdrop-blur-sm max-w-md transition-opacity duration-1000"
            style={{ opacity: messageFade }}
          >
            {welcomeMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default SparkleAnimation;
