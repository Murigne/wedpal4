
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { WeddingTheme } from './ThemeGenerator';

interface ThemeComparisonProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  favoriteThemes: WeddingTheme[];
  onRemoveFavorite: (themeId: string) => void;
}

const ThemeComparison: React.FC<ThemeComparisonProps> = ({
  open,
  onOpenChange,
  favoriteThemes,
  onRemoveFavorite
}) => {
  if (favoriteThemes.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Favorite Themes</DialogTitle>
            <DialogDescription>
              You haven't added any themes to your favorites yet.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-8">
            <p className="text-muted-foreground">Select the star icon on themes to add them to your favorites.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compare Favorite Themes</DialogTitle>
          <DialogDescription>
            Review and compare your favorite wedding themes side by side.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {favoriteThemes.map((theme) => (
            <div 
              key={theme.id}
              className="border rounded-lg p-4 relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => onRemoveFavorite(theme.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <h3 className="font-medium text-lg mb-3">{theme.name}</h3>
              <div 
                className="h-32 rounded-lg mb-3 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                  color: theme.accentColor,
                }}
              ></div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Price:</strong> {theme.priceRange}</p>
                <p><strong>Best for:</strong> {theme.bestFor}</p>
                <p><strong>Description:</strong> {theme.description}</p>
                
                <div>
                  <strong>Features:</strong>
                  <ul className="list-disc pl-5">
                    {theme.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                    {theme.features.length > 3 && (
                      <li>+{theme.features.length - 3} more features</li>
                    )}
                  </ul>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.secondaryColor }}></div>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.accentColor }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeComparison;
