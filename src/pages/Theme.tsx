
import React, { useState, useEffect } from 'react';
import { Palette, ArrowLeft, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '@/hooks/useDashboardData';
import PageLayout from '@/components/dashboard/PageLayout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';

const Theme = () => {
  const navigate = useNavigate();
  const { weddingColors } = useDashboardData();
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [temporaryColors, setTemporaryColors] = useState<string[]>([]);
  const [isPreferredColorsActive, setIsPreferredColorsActive] = useState(false);
  
  // Default gradient animation background colors
  const defaultGradientColors = [
    "#ee7752", "#e73c7e", "#23a6d5", "#23d5ab"
  ];

  const [gradientBackgroundColors, setGradientBackgroundColors] = useState<string[]>(defaultGradientColors);
  
  // Base color palettes for onboarding
  const onboardingColorPalettes = [
    { name: "Classic Romance", colors: ["#D8315B", "#FFFAFF", "#1B998B", "#2E294E"] },
    { name: "Spring Pastels", colors: ["#FDE2E4", "#FAD2E1", "#E2CFC4", "#F7F7F7"] },
    { name: "Summer Vibrant", colors: ["#FF7F50", "#FFD700", "#7FFF00", "#40E0D0"] },
    { name: "Fall Warmth", colors: ["#582F0E", "#7F4F24", "#936639", "#A68A64"] }
  ];

  // All colors flattened for the color picker
  const allPaletteColors = onboardingColorPalettes.flatMap(palette => palette.colors);

  useEffect(() => {
    // Initialize temporary colors with current gradient colors
    setTemporaryColors([...gradientBackgroundColors]);
  }, [gradientBackgroundColors]);
  
  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleColorClick = (index: number) => {
    setSelectedColorIndex(index);
    setShowColorDialog(true);
  };

  const handlePaletteColorSelect = (color: string) => {
    if (selectedColorIndex !== null && temporaryColors) {
      const newColors = [...temporaryColors];
      newColors[selectedColorIndex] = color;
      setTemporaryColors(newColors);
    }
    setShowColorDialog(false);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedColorIndex !== null && temporaryColors) {
      const newColors = [...temporaryColors];
      newColors[selectedColorIndex] = e.target.value;
      setTemporaryColors(newColors);
    }
  };

  const handleApplyTheme = () => {
    setGradientBackgroundColors([...temporaryColors]);
    toast({
      title: "Theme Applied",
      description: "Your color theme has been applied across all screens.",
    });
  };

  const toggleColorSet = () => {
    if (isPreferredColorsActive && weddingColors && weddingColors.length > 0) {
      // Switch back to default colors
      setIsPreferredColorsActive(false);
      setTemporaryColors([...defaultGradientColors]);
    } else if (weddingColors && weddingColors.length > 0) {
      // Switch to preferred wedding colors
      setIsPreferredColorsActive(true);
      // Use wedding colors, fill any missing slots with default colors
      const combined = [...weddingColors];
      while (combined.length < 4) {
        combined.push(defaultGradientColors[combined.length]);
      }
      setTemporaryColors(combined.slice(0, 4));
    }
  };

  return (
    <PageLayout 
      title="Wedding Theme" 
      description="Choose the perfect color palette and style for your special day"
      icon={<Palette className="w-8 h-8" />}
    >
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="gap-2" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Current Theme Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Current Theme Colors</CardTitle>
            <CardDescription>Customize the colors used across your wedding planning app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Your Preferred Wedding Colors</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={toggleColorSet}
                    disabled={!weddingColors || weddingColors.length === 0}
                  >
                    {isPreferredColorsActive ? "Use Default Colors" : "Use Wedding Colors"}
                  </Button>
                </div>
                <div className="flex gap-2">
                  {weddingColors && weddingColors.length > 0 ? (
                    weddingColors.map((color, index) => (
                      <div 
                        key={`wedding-color-${index}`}
                        className="h-10 w-10 rounded-full border border-gray-200 shadow-sm cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorClick(index)}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No preferred colors selected yet</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Gradient Animation Background Colors</h3>
                <div className="flex gap-2">
                  {temporaryColors.map((color, index) => (
                    <div 
                      key={`gradient-color-${index}`} 
                      className={`flex flex-col items-center cursor-pointer ${activeColorIndex === index ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                      onClick={() => handleColorClick(index)}
                      onMouseEnter={() => setActiveColorIndex(index)}
                      onMouseLeave={() => setActiveColorIndex(null)}
                    >
                      <div 
                        className="h-10 w-10 rounded-full border border-gray-200 shadow-sm" 
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs mt-1">{color}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-4 rounded-lg h-16 flex items-center justify-center text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${temporaryColors.join(', ')})`,
                    backgroundSize: '300% 300%',
                    animation: 'gradient-animation 10s ease infinite'
                  }}
                >
                  Animated Gradient Preview
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    onClick={handleApplyTheme} 
                    disabled={JSON.stringify(temporaryColors) === JSON.stringify(gradientBackgroundColors)}
                    className="bg-wedding-pink hover:bg-wedding-pink-dark"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Apply Theme
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color Selection Dialog */}
      <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose a Color</DialogTitle>
            <DialogDescription>
              Select from preset colors or enter a custom color value.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-8 gap-2 py-4">
            {allPaletteColors.map((color, index) => (
              <div
                key={`palette-color-${index}`}
                className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => handlePaletteColorSelect(color)}
              />
            ))}
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="custom-color" className="text-sm font-medium">
                Custom Color
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="color"
                  id="custom-color"
                  className="w-12 h-10"
                  value={selectedColorIndex !== null ? temporaryColors[selectedColorIndex] : "#ffffff"}
                  onChange={handleCustomColorChange}
                />
                <input
                  type="text"
                  className="flex-grow px-3 py-2 border rounded-md"
                  value={selectedColorIndex !== null ? temporaryColors[selectedColorIndex] : "#ffffff"}
                  onChange={handleCustomColorChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => handlePaletteColorSelect(selectedColorIndex !== null ? temporaryColors[selectedColorIndex] : "#ffffff")}>
              Apply Color
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Theme;
