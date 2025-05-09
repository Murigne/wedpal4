
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface SuccessStory {
  id: number;
  coupleName: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

const SuccessStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const successStories: SuccessStory[] = [
    {
      id: 1,
      coupleName: "Emma & Noah",
      date: "June 12, 2024",
      location: "Beach Resort, Accra",
      description: "Our dream beach wedding became a reality with WedPal's help.",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 2,
      coupleName: "Olivia & Liam",
      date: "April 23, 2024",
      location: "Botanical Gardens",
      description: "WedPal helped us find the perfect garden venue for our springtime wedding.",
      imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 3,
      coupleName: "Ava & William",
      date: "March 8, 2024",
      location: "Grand Hotel, Kumasi",
      description: "Planning our wedding was so easy with WedPal's organized budgeting tools.",
      imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      coupleName: "Sophia & James",
      date: "February 14, 2024",
      location: "Lakeside Manor",
      description: "Our Valentine's Day wedding was perfectly planned using WedPal.",
      imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      coupleName: "Isabella & Benjamin",
      date: "January 20, 2024",
      location: "Mountain Resort",
      description: "WedPal helped us coordinate our winter wedding with ease.",
      imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: 6,
      coupleName: "Mia & Elijah",
      date: "December 30, 2023",
      location: "City Plaza Hotel",
      description: "Our New Year's wedding was a magical experience thanks to WedPal.",
      imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2030&auto=format&fit=crop"
    },
    {
      id: 7,
      coupleName: "Charlotte & Lucas",
      date: "November 12, 2023",
      location: "Historic Church",
      description: "WedPal's vendor marketplace helped us find our perfect wedding team.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 8,
      coupleName: "Amelia & Mason",
      date: "October 7, 2023",
      location: "Vineyard Estate",
      description: "Planning our autumn wedding was a breeze with WedPal's assistance.",
      imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop"
    }
  ];
  
  // Setup the auto-scrolling animation
  useEffect(() => {
    if (!containerRef.current) return;
    
    const scrollContainer = containerRef.current;
    let animationFrame: number;
    let currentIndex = 0;
    const cardWidth = 300; // Approximate width of each card + margin
    const visibleCards = 4;
    
    const scrollNextCard = () => {
      if (!scrollContainer) return;
      
      // Scroll one card at a time
      currentIndex = (currentIndex + 1) % (successStories.length - visibleCards + 1);
      scrollContainer.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
      
      // Schedule next scroll
      animationFrame = window.setTimeout(scrollNextCard, 3000);
    };
    
    // Start scrolling
    animationFrame = window.setTimeout(scrollNextCard, 3000);
    
    // Clean up
    return () => {
      if (animationFrame) {
        clearTimeout(animationFrame);
      }
    };
  }, [successStories.length]);
  
  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Success Stories
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div 
          ref={containerRef} 
          className="flex space-x-4 overflow-x-hidden pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {successStories.map((story) => (
            <div 
              key={story.id}
              className="min-w-[280px] flex-none rounded-lg overflow-hidden shadow-md bg-white transition-all duration-500 hover:shadow-lg"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={story.imageUrl} 
                  alt={`${story.coupleName} wedding`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{story.coupleName}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{story.date}</span>
                  <span>{story.location}</span>
                </div>
                <p className="text-sm">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessStories;
