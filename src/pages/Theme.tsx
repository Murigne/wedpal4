
import React, { useState } from 'react';
import { Palette, Check, RefreshCw, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/dashboard/PageLayout';

interface ThemeOption {
  id: string;
  name: string;
  colors: string[];
  style: 'classic' | 'modern' | 'rustic' | 'bohemian';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  image: string;
}

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  
  const themeOptions: ThemeOption[] = [
    {
      id: '1',
      name: 'Elegant Blush',
      colors: ['#FDE2E4', '#FAD2E1', '#E2CFC4', '#F7F7F7', '#C9CCD5'],
      style: 'classic',
      season: 'spring',
      image: 'https://placehold.co/600x400',
    },
    {
      id: '2',
      name: 'Tropical Paradise',
      colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'],
      style: 'modern',
      season: 'summer',
      image: 'https://placehold.co/600x400',
    },
    {
      id: '3',
      name: 'Rustic Autumn',
      colors: ['#582F0E', '#7F4F24', '#936639', '#A68A64', '#B6AD90'],
      style: 'rustic',
      season: 'fall',
      image: 'https://placehold.co/600x400',
    },
    {
      id: '4',
      name: 'Winter Wonderland',
      colors: ['#CAF0F8', '#90E0EF', '#00B4D8', '#0077B6', '#03045E'],
      style: 'modern',
      season: 'winter',
      image: 'https://placehold.co/600x400',
    },
    {
      id: '5',
      name: 'Bohemian Garden',
      colors: ['#FF7F50', '#FFD700', '#7FFF00', '#40E0D0', '#9370DB'],
      style: 'bohemian',
      season: 'summer',
      image: 'https://placehold.co/600x400',
    },
    {
      id: '6',
      name: 'Classic Romance',
      colors: ['#D8315B', '#FFFAFF', '#1B998B', '#2E294E', '#0E0E52'],
      style: 'classic',
      season: 'spring',
      image: 'https://placehold.co/600x400',
    },
  ];

  const [activeFilters, setActiveFilters] = useState({
    style: '',
    season: '',
  });

  const filteredThemes = themeOptions.filter(theme => {
    if (activeFilters.style && theme.style !== activeFilters.style) return false;
    if (activeFilters.season && theme.season !== activeFilters.season) return false;
    return true;
  });

  return (
    <PageLayout 
      title="Wedding Theme" 
      description="Choose the perfect color palette and style for your special day"
      icon={<Palette className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
              <CardDescription>Filter themes based on your preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Wedding Style</h3>
                <RadioGroup 
                  value={activeFilters.style} 
                  onValueChange={(value) => setActiveFilters({...activeFilters, style: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="style-all" />
                    <Label htmlFor="style-all">All Styles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="classic" id="style-classic" />
                    <Label htmlFor="style-classic">Classic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="modern" id="style-modern" />
                    <Label htmlFor="style-modern">Modern</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rustic" id="style-rustic" />
                    <Label htmlFor="style-rustic">Rustic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bohemian" id="style-bohemian" />
                    <Label htmlFor="style-bohemian">Bohemian</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Season</h3>
                <RadioGroup 
                  value={activeFilters.season} 
                  onValueChange={(value) => setActiveFilters({...activeFilters, season: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="season-all" />
                    <Label htmlFor="season-all">All Seasons</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spring" id="season-spring" />
                    <Label htmlFor="season-spring">Spring</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="summer" id="season-summer" />
                    <Label htmlFor="season-summer">Summer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fall" id="season-fall" />
                    <Label htmlFor="season-fall">Fall</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="winter" id="season-winter" />
                    <Label htmlFor="season-winter">Winter</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => setActiveFilters({ style: '', season: '' })}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create Custom Theme</CardTitle>
              <CardDescription>
                Design your own unique wedding color palette
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Palette className="w-4 h-4 mr-2" />
                Start Creating
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Wedding Themes</CardTitle>
              <CardDescription>
                Browse through our curated collection of wedding themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grid">
                <TabsList className="mb-4">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredThemes.map((theme) => (
                    <Card key={theme.id} className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${selectedTheme === theme.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedTheme(theme.id)}>
                      <div className="aspect-video w-full overflow-hidden">
                        <img src={theme.image} alt={theme.name} className="object-cover w-full h-full" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{theme.name}</h3>
                        <div className="flex gap-1 mt-2">
                          {theme.colors.map((color, index) => (
                            <div 
                              key={index} 
                              className="h-6 w-6 rounded-full" 
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {theme.style.charAt(0).toUpperCase() + theme.style.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {theme.season.charAt(0).toUpperCase() + theme.season.slice(1)}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between p-4 pt-0">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-gray-500"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        
                        {selectedTheme === theme.id && (
                          <Badge className="bg-green-500">
                            <Check className="h-3 w-3 mr-1" />
                            Selected
                          </Badge>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="list">
                  <div className="space-y-4">
                    {filteredThemes.map((theme) => (
                      <div key={theme.id} className="flex gap-4 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                          <img src={theme.image} alt={theme.name} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{theme.name}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {theme.style.charAt(0).toUpperCase() + theme.style.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {theme.season.charAt(0).toUpperCase() + theme.season.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {theme.colors.map((color, index) => (
                              <div 
                                key={index} 
                                className="h-5 w-5 rounded-full" 
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button size="sm" variant="outline">Select</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Theme;
