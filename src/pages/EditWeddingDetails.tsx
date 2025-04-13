
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Heart, Save, X, Home, Plane, Users, Tag, Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import HeartAnimation from '@/components/HeartAnimation';

const EditWeddingDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Form state
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const [weddingDate, setWeddingDate] = useState<Date | undefined>(undefined);
  const [weddingHashtag, setWeddingHashtag] = useState('');
  const [budget, setBudget] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [honeymoonDestination, setHoneymoonDestination] = useState('');
  const [needNewHome, setNeedNewHome] = useState('');
  const [theme, setTheme] = useState('');
  const [colors, setColors] = useState<string[]>(['#FFC0CB', '#FFAFBD', '#E7F0FD']);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Fetch wedding details
  useEffect(() => {
    const fetchWeddingDetails = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching wedding details:', error);
          if (error.code !== 'PGRST116') {
            throw error;
          }
        }
        
        if (data) {
          setPartner1Name(data.partner1_name || '');
          setPartner2Name(data.partner2_name || '');
          
          if (data.wedding_date) {
            try {
              const date = new Date(data.wedding_date);
              if (!isNaN(date.getTime())) {
                setWeddingDate(date);
              }
            } catch (e) {
              console.error('Error parsing date:', e);
            }
          }
          
          setWeddingHashtag(data.hashtag || '');
          
          // Remove 'GHS ' prefix if present in budget
          setBudget(data.budget ? data.budget.replace('GHS ', '') : '');
          
          setGuestCount(data.guest_count || '');
          setHoneymoonDestination(data.honeymoon_destination || '');
          setNeedNewHome(data.need_new_home || '');
          setTheme(data.theme || '');
          
          if (data.colors) {
            try {
              const parsedColors = JSON.parse(data.colors);
              if (Array.isArray(parsedColors) && parsedColors.length > 0) {
                setColors(parsedColors);
              }
            } catch (e) {
              console.error('Error parsing colors:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching wedding details:', error);
        toast({
          title: 'Error',
          description: 'Could not load your wedding details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWeddingDetails();
  }, [user, navigate]);
  
  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('wedding_details')
        .upsert({
          user_id: user.id,
          partner1_name: partner1Name,
          partner2_name: partner2Name,
          wedding_date: weddingDate ? weddingDate.toISOString() : null,
          hashtag: weddingHashtag,
          budget: budget ? `GHS ${budget}` : null,
          guest_count: guestCount,
          honeymoon_destination: honeymoonDestination,
          need_new_home: needNewHome,
          theme: theme,
          colors: JSON.stringify(colors),
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) {
        console.error('Error saving wedding details:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Wedding details updated successfully',
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving wedding details:', error);
      toast({
        title: 'Error',
        description: 'Could not save your wedding details',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/dashboard');
  };
  
  const updateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient dynamic-gradient">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <p className="text-lg">Loading your wedding details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full animated-gradient dynamic-gradient relative">
      <HeartAnimation avoidTextAreas={true} count={10} />
      
      <DashboardHeader userName={partner1Name} partnerName={partner2Name} />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Wedding Details</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-purple-100 text-purple-800 text-xl">
                    {partner1Name.charAt(0)}{partner2Name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={partner1Name}
                    onChange={(e) => setPartner1Name(e.target.value)}
                    className="pl-10"
                    placeholder="Your name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Partner's Name
                </label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={partner2Name}
                    onChange={(e) => setPartner2Name(e.target.value)}
                    className="pl-10"
                    placeholder="Partner's name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Wedding Date
                </label>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative cursor-pointer">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          value={weddingDate ? format(weddingDate, 'PPP') : ''}
                          readOnly
                          className="pl-10"
                          placeholder="Select date"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={weddingDate}
                        onSelect={setWeddingDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Wedding Hashtag
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={weddingHashtag}
                    onChange={(e) => setWeddingHashtag(e.target.value)}
                    className="pl-10"
                    placeholder="#LoveStory"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Budget (GHS)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">GHS</span>
                  <Input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="pl-12"
                    placeholder="15k - 25k"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Guest Count
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="pl-10"
                    placeholder="Number of guests"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Honeymoon Destination
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={honeymoonDestination}
                    onChange={(e) => setHoneymoonDestination(e.target.value)}
                    className="pl-10"
                    placeholder="Dream destination"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Need New Home
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={needNewHome}
                    onChange={(e) => setNeedNewHome(e.target.value)}
                    className="pl-10"
                    placeholder="Yes/No/Not sure"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Theme
                </label>
                <Input
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Wedding theme"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Wedding Colors</h3>
            <div className="flex items-center space-x-4">
              <Palette className="text-gray-400 h-5 w-5" />
              {colors.map((color, index) => (
                <div key={index} className="relative">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              These colors will be used to customize your wedding dashboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditWeddingDetails;
