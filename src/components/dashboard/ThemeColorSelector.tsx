import React, { useState, useEffect } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, Palette } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ThemeColorSelectorProps {
  weddingColors?: string[];
  onColorChange: (colors: [string, string]) => void;
}

interface ColorPaletteProps {
  colors: [string, string];
  name: string;
  selected: boolean;
  onSelect: () => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, name, selected, onSelect }) => {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
      onClick={onSelect}
    >
      <div className="w-20 h-10 rounded-md overflow-hidden mb-1 relative">
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)` 
          }}
        />
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <Check className="text-white drop-shadow-md" />
          </div>
        )}
      </div>
      <span className="text-xs text-gray-700">{name}</span>
    </div>
  );
};

const ThemeColorSelector: React.FC<ThemeColorSelectorProps> = ({ weddingColors = ['#FAD2E1', '#D5C6E0'], onColorChange }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('default');
  const [customStartColor, setCustomStartColor] = useState('#FF6479');
  const [customEndColor, setCustomEndColor] = useState('#FFB6C1');
  
  // Default website theme colors (blue and pink)
  const defaultColors: [string, string] = ['#1EAEDB', '#D946EF'];
  
  // Wedding colors from user preferences
  const userWeddingColors: [string, string] = weddingColors.length >= 2 
    ? [weddingColors[0], weddingColors[1]]
    : ['#FAD2E1', '#D5C6E0']; // Default wedding pink and lavender if none set
  
  // Other color options from onboarding
  const otherColorOptions = [
    { name: 'Blush & Gold', colors: ['#FDE2E4', '#FFD700'] as [string, string] },
    { name: 'Sage & Cream', colors: ['#B7C4B5', '#FFF1E6'] as [string, string] },
    { name: 'Navy & Silver', colors: ['#0A2342', '#A9A9A9'] as [string, string] },
    { name: 'Burgundy & Peach', colors: ['#800020', '#FFE5B4'] as [string, string] },
    { name: 'Lavender & Mint', colors: ['#E6E6FA', '#98FB98'] as [string, string] },
  ];

  const handleThemeChange = (theme: string, colors: [string, string]) => {
    setSelectedTheme(theme);
    onColorChange(colors);
    toast({
      title: "Theme updated",
      description: `Your background theme has been updated to ${theme}.`,
    });
  };

  const handleCustomColorChange = () => {
    const customColors: [string, string] = [customStartColor, customEndColor];
    handleThemeChange('custom', customColors);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90"
        >
          <Palette className="h-6 w-6 mb-1" />
          <span className="text-xs">Theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="center">
        <h3 className="font-medium mb-3">Background Theme Colors</h3>
        
        <div className="space-y-4">
          {/* Default website colors */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Default Colors</h4>
            <div className="flex justify-center">
              <ColorPalette 
                colors={defaultColors}
                name="Default"
                selected={selectedTheme === 'default'}
                onSelect={() => handleThemeChange('default', defaultColors)}
              />
            </div>
          </div>
          
          {/* Wedding colors */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Your Wedding Colors</h4>
            <div className="flex justify-center">
              <ColorPalette 
                colors={userWeddingColors}
                name="Wedding Colors"
                selected={selectedTheme === 'wedding'}
                onSelect={() => handleThemeChange('wedding', userWeddingColors)}
              />
            </div>
          </div>
          
          {/* Other color options */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Other Options</h4>
            <div className="grid grid-cols-3 gap-2">
              {otherColorOptions.map((option, index) => (
                <ColorPalette 
                  key={index}
                  colors={option.colors}
                  name={option.name}
                  selected={selectedTheme === `other-${index}`}
                  onSelect={() => handleThemeChange(`other-${index}`, option.colors)}
                />
              ))}
            </div>
          </div>
          
          {/* Custom colors */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Custom Colors</h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Start Color</label>
                <div className="flex">
                  <input 
                    type="color" 
                    value={customStartColor}
                    onChange={(e) => setCustomStartColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <input 
                    type="text"
                    value={customStartColor}
                    onChange={(e) => setCustomStartColor(e.target.value)}
                    className="flex-1 ml-2 text-xs border rounded p-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">End Color</label>
                <div className="flex">
                  <input 
                    type="color" 
                    value={customEndColor}
                    onChange={(e) => setCustomEndColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <input 
                    type="text"
                    value={customEndColor}
                    onChange={(e) => setCustomEndColor(e.target.value)}
                    className="flex-1 ml-2 text-xs border rounded p-1"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Button 
                size="sm"
                className="w-full text-xs"
                onClick={handleCustomColorChange}
              >
                Apply Custom Colors
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColorSelector;
