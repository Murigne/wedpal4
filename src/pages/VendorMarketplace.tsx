
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Star, Filter, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const VendorMarketplace = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [favoriteVendors, setFavoriteVendors] = useState<number[]>([]);

  const vendorCategories = [
    "Venues", "Photography", "Catering", "Flowers", "Attire", "Beauty", "Music", "Decor", "Cake"
  ];

  const mockVendors = [
    {
      id: 1,
      name: "Elegant Gardens Venue",
      category: "Venues",
      rating: 4.8,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop",
      price: "$$$",
      description: "Beautiful outdoor wedding venue with gardens and reception hall"
    },
    {
      id: 2,
      name: "Moments Photography",
      category: "Photography",
      rating: 4.9,
      reviewCount: 98,
      image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=2187&auto=format&fit=crop",
      price: "$$",
      description: "Capturing your special moments with artistry and emotion"
    },
    {
      id: 3,
      name: "Divine Catering Co.",
      category: "Catering",
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
      price: "$$",
      description: "Exquisite food and service for your wedding reception"
    },
    {
      id: 4,
      name: "Blooming Joy Florals",
      category: "Flowers",
      rating: 4.8,
      reviewCount: 87,
      image: "https://images.unsplash.com/photo-1561128290-405d2341465b?q=80&w=1974&auto=format&fit=crop",
      price: "$$",
      description: "Custom floral designs for your wedding day"
    },
    {
      id: 5,
      name: "Harmony Wedding Music",
      category: "Music",
      rating: 4.6,
      reviewCount: 72,
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
      price: "$$",
      description: "Live music and DJ services for ceremonies and receptions"
    },
    {
      id: 6,
      name: "Dream Dress Boutique",
      category: "Attire",
      rating: 4.9,
      reviewCount: 143,
      image: "https://images.unsplash.com/photo-1594612173567-3cfe1503a697?q=80&w=2070&auto=format&fit=crop",
      price: "$$$",
      description: "Designer wedding dresses and suits with custom alterations"
    },
    {
      id: 7,
      name: "Enchanted Decor",
      category: "Decor",
      rating: 4.5,
      reviewCount: 91,
      image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=2070&auto=format&fit=crop",
      price: "$$",
      description: "Transform your venue with magical decorations and lighting"
    },
    {
      id: 8,
      name: "Sweet Celebrations Cake",
      category: "Cake",
      rating: 4.7,
      reviewCount: 118,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop",
      price: "$$",
      description: "Custom wedding cakes and dessert tables to match your theme"
    },
  ];

  const handleToggleFavorite = (vendorId: number) => {
    if (favoriteVendors.includes(vendorId)) {
      setFavoriteVendors(favoriteVendors.filter(id => id !== vendorId));
      toast({
        title: "Removed from favorites",
        description: "Vendor has been removed from your favorites",
      });
    } else {
      setFavoriteVendors([...favoriteVendors, vendorId]);
      toast({
        title: "Added to favorites",
        description: "Vendor has been added to your favorites",
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (vendorId: number) => {
    toast({
      title: "Vendor details",
      description: "Viewing details for this vendor. This would navigate to a detailed page in a real app.",
    });
  };

  const filteredVendors = mockVendors.filter(vendor => {
    const matchesCategory = selectedCategory === 'All Categories' || vendor.category === selectedCategory;
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-wedding-pink/30 backdrop-blur-sm py-6 px-4 mb-8">
        <div className="container max-w-[1600px] mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Vendor Marketplace</h1>
          <p className="text-muted-foreground">Find and book the perfect vendors for your wedding day</p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container max-w-[1600px] mx-auto px-4">
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search vendors..." 
              className="wedding-input w-full pl-12"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <Button 
            className="wedding-button-secondary"
            onClick={() => toast({ title: "Filters", description: "Filter options would open here" })}
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>
        
        {/* Categories */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 no-scrollbar">
          <Button 
            className={`wedding-button whitespace-nowrap ${selectedCategory === 'All Categories' ? 'bg-wedding-pink' : ''}`}
            onClick={() => handleCategoryClick('All Categories')}
          >
            All Categories
          </Button>
          {vendorCategories.map(category => (
            <Button 
              key={category} 
              variant="outline" 
              className={`bg-white/70 border-wedding-pink/30 hover:bg-wedding-pink/20 whitespace-nowrap ${selectedCategory === category ? 'bg-wedding-pink/40' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Vendors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="wedding-card overflow-hidden group relative">
              <div className="absolute top-2 right-2 z-10">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
                  onClick={() => handleToggleFavorite(vendor.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${favoriteVendors.includes(vendor.id) ? 'fill-wedding-pink text-wedding-pink' : 'text-muted-foreground'}`} 
                  />
                </Button>
              </div>
              
              <div className="h-48 overflow-hidden rounded-md mb-4">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{vendor.name}</h3>
                <span className="text-sm bg-wedding-lavender/30 px-2 py-0.5 rounded-full">
                  {vendor.price}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{vendor.category}</p>
              
              <p className="text-sm mb-4">{vendor.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-wedding-gold text-wedding-gold mr-1" />
                  <span className="text-sm font-medium">{vendor.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">({vendor.reviewCount} reviews)</span>
                </div>
                
                <Button 
                  className="text-sm px-3 py-1 h-auto wedding-button"
                  onClick={() => handleViewDetails(vendor.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load more */}
        <div className="flex justify-center mt-10">
          <Button 
            variant="outline" 
            className="wedding-button-secondary px-8"
            onClick={() => toast({ title: "Load More", description: "Loading more vendors..." })}
          >
            Load More Vendors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorMarketplace;
