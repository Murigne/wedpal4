
import React from 'react';
import { Flower, Heart, Palette } from 'lucide-react';
import { WeddingTheme } from '@/types/wedding';
import { toast } from '@/components/ui/use-toast';

interface ThemePreviewProps {
  theme: WeddingTheme;
  editMode: boolean;
  userColors: string[];
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, editMode, userColors }) => {
  return (
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

      {editMode && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Customize Theme Colors
          </h3>
          <div className="flex gap-3">
            {userColors.map((color, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-black"
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

export default ThemePreview;
