
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { WeddingTemplatesProps } from '@/types/wedding';
import { generateTemplates } from '@/utils/templateUtils';
import ColorPalette from './wedding/ColorPalette';
import ThemePreview from './wedding/ThemePreview';
import ThemeDialog from './wedding/ThemeDialog';

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
              <ThemePreview 
                theme={theme}
                editMode={editMode}
                userColors={userColors}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="justify-between">
        <ThemeDialog />
        
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
