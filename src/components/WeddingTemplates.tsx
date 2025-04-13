
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, Edit, Flower, Heart, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface WeddingTheme {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  features: string[];
  sampleImage?: string;
  bestFor: string;
}

interface WeddingTemplatesProps {
  userBudget: string;
  userPreferences: Record<string, any>;
  userColors: string[];
  className?: string;
}

// Define all 18 wedding colors
const predefinedColors = [
  // Original 12 colors
  "#FFC1CC", // Blush Pink
  "#800020", // Burgundy
  "#78A2CC" // Dusty Blue
  "#50C878", // Emerald Green
  "#FFD700", // Gold
  "#FFFFF0", // Ivory
  "#E6E6FA", // Lavender
  "#000080", // Navy Blue
  "#FFE5B4", // Peach
  "#A9B89E", // Sage Green
  "#C0C0C0", // Silver
  "#008080", // Teal
  "#FF0000", // Red
  "#4169E1", // Royal Blue
  "#800080", // Purple
  "#FF7F50", // Coral
  "#40E0D0", // Turquoise
  "#F5F5DC"  // Beige
];

const WeddingTemplates: React.FC<WeddingTemplatesProps> = ({
  userBudget,
  userPreferences,
  userColors,
  className
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [customColors, setCustomColors] = useState<string[]>(userColors);
  const [newCustomColor, setNewCustomColor] = useState<string>("#FFFFFF");
  
  // Generate templates based on user preferences and budget
  const templates = generateTemplates(userBudget, userPreferences, customColors);
  
  const handleApplyTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    toast({
      title: "Theme Applied",
      description: `${templates.find(t => t.id === themeId)?.name} theme has been applied to your wedding plan.`,
    });
  };

  const addCustomColor = () => {
    if (customColors.length < 6) {
      setCustomColors([...customColors, newCustomColor]);
      toast({
        title: "Color Added",
        description: "Your custom color has been added to the palette.",
      });
    } else {
      toast({
        title: "Color Limit Reached",
        description: "You can have up to 6 custom colors in your palette.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={cn("border-wedding-pink/20", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Wedding Themes</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            {editMode ? "Save Changes" : "Customize"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {editMode && (
          <div className="mb-6 p-4 bg-white/80 rounded-lg border border-gray-100">
            <h3 className="text-sm font-medium mb-3">Wedding Color Palette</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {customColors.map((color, index) => (
                <div 
                  key={index}
                  className="w-8 h-8 rounded-full cursor-pointer border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    const updatedColors = [...customColors];
                    updatedColors.splice(index, 1);
                    setCustomColors(updatedColors);
                  }}
                  title="Click to remove"
                />
              ))}
              {customColors.length < 6 && (
                <div className="flex">
                  <input 
                    type="color"
                    value={newCustomColor}
                    onChange={(e) => setNewCustomColor(e.target.value)}
                    className="w-8 h-8 p-1 rounded-l-full cursor-pointer border border-gray-200"
                  />
                  <button 
                    className="bg-wedding-pink hover:bg-wedding-pink-dark text-white rounded-r-lg px-2 text-sm"
                    onClick={addCustomColor}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Click a color to remove it. Add up to 6 colors.</p>
            
            {/* Predefined color palette */}
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Predefined Colors</h3>
              <div className="flex flex-wrap gap-1">
                {predefinedColors.map((color, index) => (
                  <div 
                    key={`predefined-${index}`}
                    className="w-6 h-6 rounded-full cursor-pointer border border-gray-200 shadow-sm hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      if (customColors.length < 6) {
                        setCustomColors([...customColors, color]);
                      } else {
                        toast({
                          title: "Color Limit Reached",
                          description: "Remove a color first before adding a new one.",
                          variant: "destructive",
                        });
                      }
                    }}
                    title="Click to add to your palette"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Click a color to add it to your palette.</p>
            </div>
          </div>
        )}
        
        <Tabs defaultValue={templates[0]?.id}>
          <TabsList className="grid grid-cols-6 mb-4">
            {templates.map((theme) => (
              <TabsTrigger 
                key={theme.id} 
                value={theme.id}
                className={selectedTheme === theme.id ? "bg-wedding-pink text-white" : ""}
              >
                {theme.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {templates.map((theme) => (
            <TabsContent key={theme.id} value={theme.id} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div 
                    className="h-48 rounded-lg mb-3 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                      color: theme.accentColor,
                    }}
                  >
                    <Heart className="h-12 w-12" />
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.secondaryColor }}></div>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: theme.accentColor }}></div>
                  </div>
                  
                  <p><strong>Best for:</strong> {theme.bestFor}</p>
                  <p><strong>Price range:</strong> {theme.priceRange}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Features</h3>
                  <ul className="space-y-1">
                    {theme.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Flower className="h-4 w-4 text-wedding-pink" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {editMode && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Customize Theme Colors
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {predefinedColors.map((color, index) => (
                      <div 
                        key={`theme-color-${index}`}
                        className="w-6 h-6 rounded-full cursor-pointer border-2 border-transparent hover:border-black"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          // Logic for customizing theme colors would go here
                          toast({
                            title: "Color Applied",
                            description: `Theme color updated.`,
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Preview Theme</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Theme Preview</DialogTitle>
              <DialogDescription>
                See how your wedding website would look with this theme
              </DialogDescription>
            </DialogHeader>
            <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
              <p>Theme preview would display here</p>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          className="bg-wedding-pink hover:bg-wedding-pink-dark"
          onClick={() => selectedTheme && handleApplyTheme(selectedTheme)}
        >
          Apply Theme
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to generate templates based on user preferences
const generateTemplates = (
  budget: string,
  preferences: Record<string, any>,
  userColors: string[]
): WeddingTheme[] => {
  // Use user's colors when available, or fall back to defaults
  const primaryColor = userColors[0] || "#FAD2E1";
  const secondaryColor = userColors[1] || "#F8BBD0";
  const accentColor = userColors[2] || "#FFFFFF";
  
  // Budget estimate (convert text range to numeric values for comparison)
  const budgetValue = typeof budget === 'string' && budget.includes('-') 
    ? parseInt(budget.split('-')[0].replace(/\D/g, ''), 10)
    : parseInt((budget || "0").replace(/\D/g, ''), 10);
  
  const isLowBudget = budgetValue < 10000;
  const isHighBudget = budgetValue > 30000;

  return [
    {
      id: "elegant",
      name: "Elegant Classic",
      description: "Timeless elegance with refined details",
      priceRange: isLowBudget ? "Budget-Friendly" : isHighBudget ? "Premium" : "Moderate",
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily: "'Playfair Display', serif",
      features: [
        "Traditional ceremony setup",
        "Classic floral arrangements",
        "Elegant table settings",
        "Formal photography style",
        "String quartet music"
      ],
      bestFor: "Couples who appreciate timeless traditions"
    },
    {
      id: "rustic",
      name: "Rustic Charm",
      description: "Warm and cozy with natural elements",
      priceRange: isLowBudget ? "Budget-Friendly" : "Moderate",
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily: "'Quicksand', sans-serif",
      features: [
        "Barn or outdoor venue setting",
        "Wildflower arrangements",
        "Mason jar decorations",
        "Family-style dining",
        "Acoustic live music"
      ],
      bestFor: "Nature-loving couples seeking a relaxed atmosphere"
    },
    {
      id: "modern",
      name: "Modern Minimalist",
      description: "Clean lines with contemporary touches",
      priceRange: isLowBudget ? "Moderate" : "Premium",
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily: "'Montserrat', sans-serif",
      features: [
        "Geometric decor elements",
        "Monochromatic color scheme",
        "Architectural venue",
        "Plated gourmet menu",
        "DJ with lighting design"
      ],
      bestFor: "Contemporary couples with sophisticated taste"
    },
    {
      id: "romantic",
      name: "Romantic Garden",
      description: "Dreamy and enchanting with lush details",
      priceRange: isHighBudget ? "Premium" : "Moderate",
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily: "'Dancing Script', cursive",
      features: [
        "Flower-filled garden venue",
        "Abundant floral installations",
        "Candle-lit atmosphere",
        "Multi-course dining experience",
        "Live band with dance floor"
      ],
      bestFor: "Hopeless romantics seeking a fairy-tale experience"
    },
    {
      id: "bohemian",
      name: "Bohemian",
      description: "Free-spirited with eclectic touches",
      priceRange: isLowBudget ? "Budget-Friendly" : "Moderate",
      primaryColor: "#E3B587",
      secondaryColor: "#D6875F",
      accentColor: "#FFFFFF",
      fontFamily: "'Amatic SC', cursive",
      features: [
        "Outdoor ceremony",
        "Macramé decorations",
        "Pampas grass arrangements",
        "Moroccan-inspired lounge",
        "Food trucks or grazing tables",
        "Polaroid guest book"
      ],
      bestFor: "Free-spirited couples who love personal touches"
    },
    {
      id: "destination",
      name: "Destination",
      description: "Exotic location with vacation vibes",
      priceRange: isHighBudget ? "Premium" : "High",
      primaryColor: "#77C3EC",
      secondaryColor: "#2E86AB",
      accentColor: "#FFFFFF",
      fontFamily: "'Lato', sans-serif",
      features: [
        "Beachfront or exotic venue",
        "Multi-day celebration",
        "Local cultural elements",
        "Curated guest experiences",
        "Travel coordination",
        "Welcome bags/gifts"
      ],
      bestFor: "Adventure-seeking couples who love travel"
    }
  ];
};

export default WeddingTemplates;
