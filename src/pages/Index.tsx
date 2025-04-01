
import React, { useState } from 'react';
import LandingSearchBox from '@/components/LandingSearchBox';
import HeartAnimation from '@/components/HeartAnimation';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [videoFile, setVideoFile] = useState<string | null>(null);
  
  // Add CSS for dynamic gradient
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .dynamic-gradient {
        background: var(--dynamic-gradient, linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab));
        background-size: 400% 400%;
      }
      
      .gradient-overlay {
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle video upload
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFile(url);
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HeartAnimation />
      <LandingSearchBox />
      
      {/* Video upload and display component */}
      <div className="max-w-3xl w-full mt-8 rounded-2xl overflow-hidden shadow-xl wedding-card">
        <h2 className="text-2xl font-semibold text-pink-600 mb-3 text-center">Our Wedding Journey</h2>
        
        {!videoFile ? (
          <div className="p-6 flex flex-col items-center">
            <p className="text-gray-600 mb-4">Upload your wedding video to display it here</p>
            <label className="wedding-button py-2 px-6 cursor-pointer">
              <span>Choose Video</span>
              <Input 
                type="file" 
                accept="video/*" 
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="relative pt-[56.25%]">
            <video 
              className="absolute top-0 left-0 w-full h-full" 
              src={videoFile} 
              controls
              controlsList="nodownload"
            />
          </div>
        )}
      </div>
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
      
      {/* Bouquet of flowers at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
          alt="Bouquet of flowers" 
          className="w-full h-auto object-cover" 
          style={{ maxHeight: '150px' }}
        />
      </div>
    </div>
  );
};

export default Index;
