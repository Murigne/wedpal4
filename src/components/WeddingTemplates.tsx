
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, Edit, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import ColorPalette from './wedding/ColorPalette';
import ThemeDisplay from './wedding/ThemeDisplay';
import ThemeComparison from './wedding/ThemeComparison';
import { generateTemplates, WeddingTheme } from './wedding/ThemeGenerator';

interface WeddingTemplatesProps {
  userBudget: string;
  userPreferences: Record<string, any>;
  userColors: string[];
  className?: string;
}

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
  const [favoriteThemes, setFavoriteThemes] = useState<string[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  
  // Use localStorage to persist favorite themes
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteThemes');
    if (savedFavorites) {
      try {
        setFavoriteThemes(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse saved favorites:', e);
      }
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteThemes', JSON.stringify(favoriteThemes));
  }, [favoriteThemes]);
  
  // Generate templates based on user preferences and budget
  const templates = generateTemplates(userBudget, userPreferences, customColors);
  
  const handleApplyTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    toast({
      title: "Theme Applied",
      description: `${templates.find(t => t.id === themeId)?.name} theme has been applied to your wedding plan.`,
    });
  };

  const handleToggleFavorite = (themeId: string) => {
    setFavoriteThemes(prev => {
      if (prev.includes(themeId)) {
        // Remove from favorites
        toast({
          title: "Removed from Favorites",
          description: `Theme has been removed from your favorites.`,
        });
        return prev.filter(id => id !== themeId);
      } else {
        // Add to favorites
        if (prev.length >= 5) {
          toast({
            title: "Favorites Limit Reached",
            description: "You can only save up to 5 favorite themes. Please remove one to add another.",
            variant: "destructive"
          });
          return prev;
        }
        toast({
          title: "Added to Favorites",
          description: `Theme has been added to your favorites.`,
        });
        return [...prev, themeId];
      }
    });
  };

  // Get the actual theme objects for favorites
  const favoritedThemes = templates.filter(theme => favoriteThemes.includes(theme.id));

  return (
    <Card className={cn("border-wedding-pink/20", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Wedding Themes</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setComparisonOpen(true)}
              disabled={favoriteThemes.length === 0}
            >
              <BookmarkCheck className="h-4 w-4" />
              Compare Favorites {favoriteThemes.length > 0 && `(${favoriteThemes.length})`}
            </Button>
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
        </div>
      </CardHeader>
      <CardContent>
        {editMode && (
          <ColorPalette 
            customColors={customColors}
            setCustomColors={setCustomColors}
            newCustomColor={newCustomColor}
            setNewCustomColor={setNewCustomColor}
          />
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
              <ThemeDisplay 
                theme={theme} 
                editMode={editMode} 
                isFavorite={favoriteThemes.includes(theme.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Theme Comparison Dialog */}
        <ThemeComparison
          open={comparisonOpen}
          onOpenChange={setComparisonOpen}
          favoriteThemes={favoritedThemes}
          onRemoveFavorite={handleToggleFavorite}
        />
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

export default WeddingTemplates;
