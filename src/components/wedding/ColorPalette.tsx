
import React from 'react';
import { toast } from '@/components/ui/use-toast';

interface ColorPaletteProps {
  customColors: string[];
  setCustomColors: React.Dispatch<React.SetStateAction<string[]>>;
  newCustomColor: string;
  setNewCustomColor: React.Dispatch<React.SetStateAction<string>>;
}

// Define all 18 wedding colors
export const predefinedColors = [
  // Original 12 colors
  "#FFC1CC", // Blush Pink
  "#800020", // Burgundy
  "#78A2CC", // Dusty Blue
  "#50C878", // Emerald Green
  "#FFD700", // Gold
  "#FFFFF0", // Ivory
  "#E6E6FA", // Lavender
  "#000080", // Navy Blue
  "#FFE5B4", // Peach
  "#A9B89E", // Sage Green
  "#C0C0C0", // Silver
  "#008080", // Teal
  // Additional 6 colors
  "#FF0000", // Red
  "#4169E1", // Royal Blue
  "#800080", // Purple
  "#FF7F50", // Coral
  "#40E0D0", // Turquoise
  "#F5F5DC"  // Beige
];

const ColorPalette: React.FC<ColorPaletteProps> = ({
  customColors,
  setCustomColors,
  newCustomColor,
  setNewCustomColor
}) => {
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
              className="w-5 h-5 rounded-full cursor-pointer border border-gray-200 shadow-sm hover:scale-110 transition-transform"
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
  );
};

export default ColorPalette;
