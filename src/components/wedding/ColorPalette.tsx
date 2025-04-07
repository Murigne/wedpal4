
import React from 'react';
import { toast } from '@/components/ui/use-toast';

interface ColorPaletteProps {
  customColors: string[];
  setCustomColors: React.Dispatch<React.SetStateAction<string[]>>;
  newCustomColor: string;
  setNewCustomColor: React.Dispatch<React.SetStateAction<string>>;
}

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
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-200 shadow-sm"
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
              className="w-10 h-10 p-1 rounded-l-full cursor-pointer border border-gray-200"
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
    </div>
  );
};

export default ColorPalette;
