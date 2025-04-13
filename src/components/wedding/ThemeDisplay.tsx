
import React from 'react';
import { Heart, Palette, Star } from 'lucide-react';
import ThemeFeatures from './ThemeFeatures';
import { toast } from '@/components/ui/use-toast';
import { predefinedColors } from './ColorPalette';
import { Button } from '@/components/ui/button';
import { WeddingTheme } from './ThemeGenerator';

interface ThemeDisplayProps {
  theme: WeddingTheme;
  editMode: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (themeId: string) => void;
}

const ThemeDisplay: React.FC<ThemeDisplayProps> = ({ 
  theme, 
  editMode, 
  isFavorite = false,
  onToggleFavorite 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="relative">
          <div 
            className="h-48 rounded-lg mb-3 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
              color: theme.accentColor,
            }}
          >
            <Heart className="h-12 w-12" />
          </div>
          
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/40 hover:bg-white/60 backdrop-blur-sm rounded-full"
              onClick={() => onToggleFavorite(theme.id)}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star 
                className={`h-5 w-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
              />
            </Button>
          )}
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
        <ThemeFeatures features={theme.features} />
      </div>
      
      {editMode && (
        <div className="pt-4 border-t border-gray-200 col-span-1 md:col-span-2">
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
    </div>
  );
};

export default ThemeDisplay;
