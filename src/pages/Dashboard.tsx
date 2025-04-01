
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, ArrowLeft, ChevronRight, Check, Clock } from 'lucide-react';
import WeddingPlanCard from '@/components/WeddingPlanCard';
import TimelineItem from '@/components/TimelineItem';
import FloatingHearts from '@/components/FloatingHearts';
import { Progress } from '@/components/ui/progress';
import WedPalLogo from '@/components/WedPalLogo';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

interface WeddingTemplate {
  title: string;
  description: string;
  price: string;
  timeline: string;
  guests: string;
  features: string[];
  highlight?: boolean;
}

interface VendorCategory {
  name: string;
  icon: React.ReactNode;
  options: string[];
  selected: string | null;
}

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<any>(null);
  const [progress, setProgress] = useState(10);
  const [templates, setTemplates] = useState<WeddingTemplate[]>([]);
  const [vendorCategories, setVendorCategories] = useState<VendorCategory[]>([]);
  const [themeColor, setThemeColor] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if we're authenticated
    if (!user) {
      navigate('/');
      return;
    }
    
    // Fetch user's wedding details
    const fetchWeddingDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('wedding_details')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          // Transform the data to match our expected format
          const transformedData = {
            partner1Name: data.partner1_name,
            partner2Name: data.partner2_name,
            weddingDate: data.wedding_date,
            budget: data.budget,
            theme: data.theme,
            guestCount: data.guest_count,
            honeymoonDestination: data.honeymoon_destination,
            needNewHome: data.need_new_home
          };
          
          setFormData(transformedData);
          
          // Set theme color based on wedding theme if possible
          setThemeColorFromTheme(data.theme);
          
          // Generate relevant vendor categories
          generateVendorCategories(transformedData);
          
          // Generate customized templates based on user preferences
          generateWeddingTemplates(transformedData);
          
          // Welcome toast
          toast({
            title: "Welcome to Your Wedding Dashboard!",
            description: `We've created some beautiful wedding plans for ${data.partner1_name} & ${data.partner2_name}.`,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error("Failed to fetch wedding details:", error);
        // If we have formData from the location state, use that as fallback
        if (location.state?.formData) {
          setFormData(location.state.formData);
          setThemeColorFromTheme(location.state.formData.theme);
          generateVendorCategories(location.state.formData);
          generateWeddingTemplates(location.state.formData);
        } else {
          navigate('/');
        }
      }
    };
    
    fetchWeddingDetails();
  }, [user, location, navigate]);
  
  // Extract and set theme color from wedding theme description
  const setThemeColorFromTheme = (theme: string) => {
    if (!theme) return;
    
    const theme_lower = theme.toLowerCase();
    
    // Try to detect color from theme description
    if (theme_lower.includes('blue') || theme_lower.includes('navy') || theme_lower.includes('teal')) {
      setThemeColor('blue');
      document.documentElement.style.setProperty('--wedding-pink', '210 100% 60%');
      document.documentElement.style.setProperty('--wedding-pink-dark', '210 100% 50%');
      document.documentElement.style.setProperty('--wedding-pink-light', '210 100% 90%');
    } 
    else if (theme_lower.includes('green') || theme_lower.includes('sage') || theme_lower.includes('emerald')) {
      setThemeColor('green');
      document.documentElement.style.setProperty('--wedding-pink', '142 76% 36%');
      document.documentElement.style.setProperty('--wedding-pink-dark', '142 76% 30%');
      document.documentElement.style.setProperty('--wedding-pink-light', '142 76% 90%');
    }
    else if (theme_lower.includes('purple') || theme_lower.includes('lavender') || theme_lower.includes('violet')) {
      setThemeColor('purple');
      document.documentElement.style.setProperty('--wedding-pink', '270 76% 60%');
      document.documentElement.style.setProperty('--wedding-pink-dark', '270 76% 50%');
      document.documentElement.style.setProperty('--wedding-pink-light', '270 76% 90%');
    }
    else if (theme_lower.includes('gold') || theme_lower.includes('yellow') || theme_lower.includes('autumn')) {
      setThemeColor('gold');
      document.documentElement.style.setProperty('--wedding-pink', '45 100% 50%');
      document.documentElement.style.setProperty('--wedding-pink-dark', '45 100% 40%');
      document.documentElement.style.setProperty('--wedding-pink-light', '45 100% 90%');
    }
    // Default to pink if no color is detected
    else {
      setThemeColor('pink');
    }
  };
  
  // Generate vendor categories based on user preferences
  const generateVendorCategories = (data: any) => {
    const budget = parseBudget(data.budget);
    const guestCount = parseGuestCount(data.guestCount);
    
    const categories: VendorCategory[] = [
      {
        name: 'Catering',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>,
        options: budget > 15000 ? 
          ['Fine Dining Experience', 'Custom Gourmet Menu', 'Multi-Course Dinner'] : 
          ['Buffet Style Service', 'Family Style Dining', 'Food Truck Experience'],
        selected: null
      },
      {
        name: 'Photography',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
        options: budget > 20000 ? 
          ['Premium Full Day Coverage', 'Drone & Video Package', 'Luxury Album Collection'] : 
          ['6-Hour Coverage', 'Digital Gallery', 'Engagement Session'],
        selected: null
      },
      {
        name: 'Decor',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>,
        options: data.theme ? 
          [`${data.theme} Theme Decor`, 'Custom Floral Arrangements', 'Themed Table Settings'] : 
          ['Elegant Minimalist', 'Rustic Charm', 'Modern Romance'],
        selected: null
      },
      {
        name: 'Entertainment',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>,
        options: guestCount > 100 ? 
          ['Live Band & DJ Combo', 'Interactive Entertainment', 'Dance Floor Package'] : 
          ['Professional DJ', 'Acoustic Performer', 'Curated Playlist'],
        selected: null
      }
    ];
    
    setVendorCategories(categories);
  };
  
  // Generate wedding templates based on user preferences
  const generateWeddingTemplates = (data: any) => {
    const budget = parseBudget(data.budget);
    const guestCount = parseGuestCount(data.guestCount);
    const theme = data.theme || 'Elegant';
    
    // Calculate price tiers based on budget
    const basicPrice = `$${Math.floor(budget * 0.6 / 1000)}k - $${Math.floor(budget * 0.8 / 1000)}k`;
    const standardPrice = `$${Math.floor(budget * 0.8 / 1000)}k - $${Math.floor(budget * 1.0 / 1000)}k`;
    const premiumPrice = `$${Math.floor(budget * 1.0 / 1000)}k - $${Math.floor(budget * 1.2 / 1000)}k`;
    const luxuryPrice = `$${Math.floor(budget * 1.2 / 1000)}k+`;
    
    // Calculate guest tiers based on guest count
    const smallGuests = `${Math.floor(guestCount * 0.7)} - ${guestCount}`;
    const mediumGuests = `${guestCount} - ${Math.floor(guestCount * 1.2)}`;
    const largeGuests = `${Math.floor(guestCount * 1.2)}+`;
    
    const customTemplates: WeddingTemplate[] = [
      {
        title: `${theme} Simplicity`,
        description: "A beautiful, intimate celebration focused on what matters most.",
        price: basicPrice,
        timeline: "6 months",
        guests: smallGuests,
        features: [
          "Intimate ceremony venue",
          "Professional photographer (6 hours)",
          "Dinner for all guests",
          `${theme} inspired decor`,
          "Curated playlist"
        ]
      },
      {
        title: `${theme} Dream`,
        description: "The perfect balance of elegance and value for your special day.",
        price: standardPrice,
        timeline: "8-12 months",
        guests: mediumGuests,
        features: [
          "Premium ceremony & reception venues",
          "Full day photography & video",
          "Catered dinner with appetizers",
          `Custom ${theme} floral design`,
          "DJ & dance floor lighting",
          "Wedding cake & dessert bar"
        ],
        highlight: true
      },
      {
        title: `${theme} Luxury`,
        description: "An unforgettable premium experience with every detail perfected.",
        price: premiumPrice,
        timeline: "12-18 months",
        guests: largeGuests,
        features: [
          "Exclusive venue with full weekend access",
          "Premium photography & cinematography team",
          "Full-service catering with custom menu",
          `Luxury ${theme} installations`,
          "Live band & entertainment",
          "Custom wedding design & styling",
          "Day-of coordination team"
        ]
      },
      {
        title: `${theme} Destination`,
        description: `A magical ${data.honeymoonDestination || 'destination'} wedding combining ceremony and honeymoon.`,
        price: luxuryPrice,
        timeline: "12-18 months",
        guests: smallGuests,
        features: [
          `${data.honeymoonDestination || 'Destination'} venue package`,
          "Travel arrangements for key guests",
          "Local cuisine and cultural experiences",
          "Extended photography coverage",
          "Honeymoon suite included",
          "Local wedding coordinator",
          "Custom welcome gifts for guests"
        ]
      }
    ];
    
    setTemplates(customTemplates);
  };
  
  // Helper function to parse budget from string
  const parseBudget = (budgetStr: string): number => {
    if (!budgetStr) return 20000; // Default budget
    
    // Remove non-numeric characters except periods
    const cleaned = budgetStr.replace(/[^0-9.]/g, '');
    
    // If there's a dash indicating a range, take the average
    if (budgetStr.includes('-')) {
      const parts = cleaned.split('-');
      if (parts.length >= 2) {
        const min = parseFloat(parts[0]) * 1000;
        const max = parseFloat(parts[1]) * 1000;
        return (min + max) / 2;
      }
    }
    
    // Try to parse as a number
    const budget = parseFloat(cleaned) * 1000;
    return isNaN(budget) ? 20000 : budget;
  };
  
  // Helper function to parse guest count from string
  const parseGuestCount = (guestStr: string): number => {
    if (!guestStr) return 100; // Default guest count
    
    // Remove non-numeric characters
    const cleaned = guestStr.replace(/[^0-9]/g, '');
    
    // If there's a plus sign, add 20%
    if (guestStr.includes('+')) {
      return parseInt(cleaned) * 1.2;
    }
    
    // If there's a range, take the average
    if (guestStr.includes('-')) {
      const parts = guestStr.split('-');
      if (parts.length >= 2) {
        const min = parseInt(parts[0].replace(/[^0-9]/g, ''));
        const max = parseInt(parts[1].replace(/[^0-9]/g, ''));
        return (min + max) / 2;
      }
    }
    
    // Try to parse as a number
    const count = parseInt(cleaned);
    return isNaN(count) ? 100 : count;
  };
  
  const selectVendor = (categoryIndex: number, optionIndex: number) => {
    setVendorCategories(prev => {
      const updated = [...prev];
      updated[categoryIndex].selected = updated[categoryIndex].options[optionIndex];
      return updated;
    });
    
    // Update progress
    const completedCategories = vendorCategories.filter(cat => cat.selected !== null).length + 1;
    const totalCategories = vendorCategories.length;
    setProgress(Math.min(100, 10 + Math.round((completedCategories / totalCategories) * 80)));
    
    // Show toast
    toast({
      title: "Vendor Selected!",
      description: `You've chosen ${vendorCategories[categoryIndex].options[optionIndex]} for ${vendorCategories[categoryIndex].name}.`,
      duration: 3000,
    });
  };
  
  const selectTemplate = (index: number) => {
    toast({
      title: "Template Selected!",
      description: `You've chosen the ${templates[index].title} package.`,
      duration: 3000,
    });
    
    // Update progress
    setProgress(prev => Math.min(100, prev + 10));
  };

  if (!formData || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-wedding-pink">Loading your wedding plans...</div>
      </div>
    );
  }

  const weddingDate = new Date(formData.weddingDate);
  const today = new Date();
  const monthsLeft = (weddingDate.getFullYear() - today.getFullYear()) * 12 + 
                     (weddingDate.getMonth() - today.getMonth());
  
  // Generate timeline based on months left
  const generateTimeline = () => {
    const timeline = [];
    
    if (monthsLeft >= 9) {
      timeline.push({
        title: "Start Planning",
        description: "Set your wedding budget and guest list",
        date: "Now",
        completed: true
      });
      timeline.push({
        title: "Venue Hunting",
        description: "Book your ceremony and reception venues",
        date: `${monthsLeft - 8} months before wedding`,
        completed: false
      });
    }
    
    if (monthsLeft >= 6) {
      timeline.push({
        title: "Book Key Vendors",
        description: "Photographer, caterer, DJ/band",
        date: `${monthsLeft - 6} months before wedding`,
        completed: false
      });
    }
    
    if (monthsLeft >= 4) {
      timeline.push({
        title: "Outfits & Attire",
        description: "Shop for wedding attire and schedule fittings",
        date: `${monthsLeft - 4} months before wedding`,
        completed: false
      });
    }
    
    timeline.push({
      title: "Send Invitations",
      description: "Finalize guest list and send out invitations",
      date: "2 months before wedding",
      completed: false
    });
    
    timeline.push({
      title: "Final Details",
      description: "Confirm all arrangements with vendors",
      date: "2 weeks before wedding",
      completed: false
    });
    
    return timeline;
  };

  return (
    <div className="min-h-screen pb-20 relative">
      <FloatingHearts count={10} />
      
      {/* Header */}
      <div className={`bg-wedding-pink/30 backdrop-blur-sm py-6 px-4 mb-8`}>
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-satisfy text-xl">WedPal</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate('/');
              }}
            >
              Sign Out
            </Button>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2 mb-2">
            <span>{formData.partner1Name} & {formData.partner2Name}'s</span>
            <Heart className="w-6 h-6 text-wedding-pink fill-wedding-pink animate-pulse-gentle" />
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formData.weddingDate}</span>
            </div>
            <div>
              {monthsLeft > 0 ? 
                `${monthsLeft} months to go until your special day!` :
                "Your wedding day is here!"
              }
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="container max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Your Wedding Planning Progress</h2>
          <span className="text-sm text-muted-foreground">{progress}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Main content */}
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wedding Templates */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Wedding Templates</h2>
              <Button variant="ghost" className="text-sm flex items-center">
                View all options <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {templates.map((template, index) => (
                <div 
                  key={index} 
                  onClick={() => selectTemplate(index)} 
                  className={`cursor-pointer transition-all duration-200 ${index < 2 ? 'md:col-span-1' : 'md:col-span-1'}`}
                >
                  <WeddingPlanCard
                    title={template.title}
                    description={template.description}
                    price={template.price}
                    timeline={template.timeline}
                    guests={template.guests}
                    features={template.features}
                    highlight={template.highlight}
                  />
                </div>
              ))}
            </div>
            
            {/* Vendor Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Select Your Preferred Vendors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vendorCategories.map((category, catIndex) => (
                  <div key={catIndex} className="wedding-card">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-wedding-pink/20 rounded-full">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-medium">{category.name}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      {category.options.map((option, optIndex) => (
                        <div 
                          key={optIndex}
                          onClick={() => selectVendor(catIndex, optIndex)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            category.selected === option 
                              ? 'bg-wedding-pink/20 border-wedding-pink' 
                              : 'hover:bg-gray-50 border-gray-100'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{option}</span>
                            {category.selected === option && (
                              <Check className="w-4 h-4 text-wedding-pink" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-6">Your Wedding Timeline</h2>
            <div className="bg-white/50 rounded-lg p-4 shadow-sm">
              {generateTimeline().map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  completed={item.completed}
                />
              ))}
            </div>
            
            {/* Quick Stats */}
            <div className="mt-8 bg-white/50 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Wedding Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Theme:</span>
                  <span className="font-medium">{formData.theme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium">{formData.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guest Count:</span>
                  <span className="font-medium">{formData.guestCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Honeymoon:</span>
                  <span className="font-medium">{formData.honeymoonDestination}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="wedding-card text-center">
            <h3 className="text-lg font-medium mb-3">Vendor Marketplace</h3>
            <p className="text-sm text-muted-foreground mb-4">Find and book the perfect vendors for your wedding day.</p>
            <Button className="wedding-button w-full">Explore Vendors</Button>
          </div>
          
          <div className="wedding-card text-center">
            <h3 className="text-lg font-medium mb-3">Wedding Checklist</h3>
            <p className="text-sm text-muted-foreground mb-4">Stay organized with our comprehensive planning tools.</p>
            <Button className="wedding-button w-full">View Checklist</Button>
          </div>
          
          <div className="wedding-card text-center">
            <h3 className="text-lg font-medium mb-3">Guest Management</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your guest list and track RSVPs easily.</p>
            <Button className="wedding-button w-full">Manage Guests</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
