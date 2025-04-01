
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Heart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  priceRange: string;
  image?: string;
  tags: string[];
  featured?: boolean;
}

interface CustomVendorSelectorProps {
  className?: string;
}

const vendorCategories = [
  "Photography",
  "Catering",
  "Venue",
  "Decoration",
  "Music",
  "Attire"
];

const CustomVendorSelector: React.FC<CustomVendorSelectorProps> = ({
  className
}) => {
  const [selectedCategory, setSelectedCategory] = useState(vendorCategories[0]);
  const [selectedVendors, setSelectedVendors] = useState<Record<string, string>>({});
  
  // Filter vendors by the selected category
  const vendorsInCategory = dummyVendors.filter(
    vendor => vendor.category === selectedCategory
  );

  const handleSelectVendor = (vendorId: string) => {
    setSelectedVendors(prev => ({
      ...prev,
      [selectedCategory]: vendorId
    }));
    
    toast({
      title: "Vendor Selected",
      description: `${dummyVendors.find(v => v.id === vendorId)?.name} added to your wedding plan.`,
    });
  };

  return (
    <Card className={cn("border-wedding-pink/20", className)}>
      <CardHeader>
        <CardTitle>Customize Your Wedding</CardTitle>
        <CardDescription>
          Select your preferred vendors for each category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
          className="space-y-4"
        >
          <TabsList className="flex flex-wrap gap-2 h-auto">
            {vendorCategories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="relative"
              >
                {category}
                {selectedVendors[category] && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-wedding-pink rounded-full" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedCategory} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vendorsInCategory.map((vendor) => (
                <div 
                  key={vendor.id}
                  className={cn(
                    "border rounded-lg p-4 flex gap-4 cursor-pointer transition-all hover:shadow-md",
                    selectedVendors[selectedCategory] === vendor.id 
                      ? "border-wedding-pink bg-wedding-pink/5" 
                      : "border-transparent bg-white/60"
                  )}
                  onClick={() => handleSelectVendor(vendor.id)}
                >
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={vendor.image} alt={vendor.name} />
                    <AvatarFallback>{vendor.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {vendor.name}
                          {vendor.featured && <Heart className="h-3 w-3 text-wedding-pink fill-wedding-pink" />}
                        </h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-3 w-3",
                                  i < vendor.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs">{vendor.rating.toFixed(1)}</span>
                          <span className="text-xs">•</span>
                          <span className="text-xs">{vendor.priceRange}</span>
                        </div>
                      </div>
                      
                      {selectedVendors[selectedCategory] === vendor.id && (
                        <CheckCircle className="h-5 w-5 text-wedding-pink" />
                      )}
                    </div>
                    
                    <p className="text-sm mt-1 line-clamp-2">{vendor.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {vendor.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  const newSelectedVendors = { ...selectedVendors };
                  delete newSelectedVendors[selectedCategory];
                  setSelectedVendors(newSelectedVendors);
                }}
                disabled={!selectedVendors[selectedCategory]}
              >
                Clear Selection
              </Button>
              
              <Button 
                variant="link" 
                size="sm" 
                className="text-wedding-pink"
                onClick={() => {
                  window.location.href = "/vendors";
                }}
              >
                View All Vendors
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-center">
          <Button 
            className="bg-wedding-pink hover:bg-wedding-pink-dark"
            onClick={() => {
              const selectedCount = Object.keys(selectedVendors).length;
              toast({
                title: `${selectedCount} Vendors Selected`,
                description: "Your custom wedding plan has been created!",
              });
            }}
          >
            Create Custom Wedding Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Dummy vendor data for demonstration
const dummyVendors: Vendor[] = [
  {
    id: "photo-1",
    name: "Capture Moments",
    category: "Photography",
    description: "Award-winning photography team specializing in candid moments and artistic shots.",
    rating: 4.8,
    priceRange: "$$$",
    tags: ["Candid", "Artistic", "Full-day coverage"],
    featured: true
  },
  {
    id: "photo-2",
    name: "Forever Frames",
    category: "Photography",
    description: "Traditional photography with a modern twist, focusing on family portraits and key moments.",
    rating: 4.5,
    priceRange: "$$",
    tags: ["Traditional", "Family Portraits", "Budget-friendly"]
  },
  {
    id: "cater-1",
    name: "Gourmet Delights",
    category: "Catering",
    description: "Exquisite menu options from around the world, with focus on presentation and flavor.",
    rating: 4.9,
    priceRange: "$$$",
    tags: ["Gourmet", "International Cuisine", "Custom Menus"],
    featured: true
  },
  {
    id: "cater-2",
    name: "Comfort Feast",
    category: "Catering",
    description: "Homestyle cooking that everyone will love, with generous portions and family recipes.",
    rating: 4.6,
    priceRange: "$$",
    tags: ["Comfort Food", "Family Style", "Dietary Accommodations"]
  },
  {
    id: "venue-1",
    name: "Crystal Gardens",
    category: "Venue",
    description: "Elegant glass-enclosed garden venue with panoramic views and indoor/outdoor options.",
    rating: 4.9,
    priceRange: "$$$$",
    tags: ["Garden", "Indoor/Outdoor", "Up to 300 guests"],
    featured: true
  },
  {
    id: "venue-2",
    name: "Historic Mansion",
    category: "Venue",
    description: "Charming historic mansion with classic architecture and beautiful photo opportunities.",
    rating: 4.7,
    priceRange: "$$$",
    tags: ["Historic", "Intimate", "Up to 150 guests"]
  },
  {
    id: "decor-1",
    name: "Elegant Touches",
    category: "Decoration",
    description: "Luxury floral designs and decor elements that transform any space into a magical setting.",
    rating: 4.8,
    priceRange: "$$$",
    tags: ["Floral Design", "Full-venue Decoration", "Custom Installations"]
  },
  {
    id: "decor-2",
    name: "Simple Elegance",
    category: "Decoration",
    description: "Beautiful but budget-conscious decorations that make a big impact without breaking the bank.",
    rating: 4.5,
    priceRange: "$$",
    tags: ["Budget-friendly", "DIY Options", "Rental Packages"]
  },
  {
    id: "music-1",
    name: "Harmony Orchestra",
    category: "Music",
    description: "Live orchestra that can perform everything from classical to contemporary hits.",
    rating: 4.9,
    priceRange: "$$$$",
    tags: ["Live Music", "Orchestra", "Customizable Playlist"]
  },
  {
    id: "music-2",
    name: "Mix Masters",
    category: "Music",
    description: "Professional DJ services with state-of-the-art sound equipment and lighting options.",
    rating: 4.7,
    priceRange: "$$",
    tags: ["DJ", "Lighting", "MC Services"]
  },
  {
    id: "attire-1",
    name: "Couture Bridal",
    category: "Attire",
    description: "Exclusive designer gowns and suits with custom alterations for the perfect fit.",
    rating: 4.8,
    priceRange: "$$$$",
    tags: ["Designer", "Custom", "Full Bridal Party"],
    featured: true
  },
  {
    id: "attire-2",
    name: "Perfect Fit",
    category: "Attire",
    description: "Beautiful wedding attire at accessible prices with quick turnaround times.",
    rating: 4.6,
    priceRange: "$$",
    tags: ["Affordable", "Ready-to-wear", "Rental Options"]
  }
];

export default CustomVendorSelector;
