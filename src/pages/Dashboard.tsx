import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { toast } from '@/components/ui/use-toast';
import {
  ArrowLeft,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Heart,
  CheckSquare,
  Store,
  Clock,
  Users,
  DollarSign,
  Map,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Components
import WeddingPlanCard from '@/components/WeddingPlanCard';
import WeddingTimelineItem from '@/components/WeddingTimelineItem';
import WeddingChecklist from '@/components/WeddingChecklist';

type WeddingDetails = {
  id?: string;
  user_id?: string;
  partner1_name?: string;
  partner2_name?: string;
  wedding_date?: string;
  budget?: string;
  guest_count?: string;
  honeymoon_destination?: string;
  theme?: string;
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const [formData, setFormData] = useState<any>(null);
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [weddingColors, setWeddingColors] = useState<string[]>(['#FAD2E1', '#F8BBD0', '#fff1e6']);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [noDetailsFound, setNoDetailsFound] = useState(false);

  // Tasks for the checklist
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Create wedding account', completed: true },
    { id: '2', title: 'Set wedding date and budget', completed: false },
    { id: '3', title: 'Choose wedding colors & theme', completed: false },
    { id: '4', title: 'Select venue', completed: false, dueDate: '6 months before' },
    { id: '5', title: 'Book photographer', completed: false, dueDate: '6 months before' },
    { id: '6', title: 'Choose catering', completed: false, dueDate: '4 months before' },
    { id: '7', title: 'Send invitations', completed: false, dueDate: '3 months before' },
    { id: '8', title: 'Finalize guest list', completed: false, dueDate: '5 months before' },
    { id: '9', title: 'Book honeymoon', completed: false, dueDate: '3 months before' },
    { id: '10', title: 'Order wedding attire', completed: false, dueDate: '5 months before' }
  ]);

  // Wedding plan templates based on budget
  const weddingPlans = [
    {
      title: "Intimate Celebration",
      description: "A beautiful, intimate celebration focused on what matters most.",
      price: "Budget-Friendly",
      timeline: "3-6 months",
      guests: "Up to 50",
      features: [
        "Intimate venue setting",
        "Professional photographer (4 hours)",
        "Curated dinner experience",
        "Personalized decor elements",
        "Custom digital invitations"
      ]
    },
    {
      title: "Classic Romance",
      description: "A timeless wedding celebration with all the traditional elements.",
      price: "Mid-Range",
      timeline: "6-9 months",
      guests: "50-100",
      features: [
        "Elegant ceremony & reception venues",
        "Full day photography coverage",
        "Catered dining experience",
        "Floral arrangements & decor",
        "DJ & dance floor setup",
        "Wedding cake & dessert options"
      ],
      highlight: true
    },
    {
      title: "Dream Destination",
      description: "An unforgettable destination wedding experience for you and your guests.",
      price: "Premium",
      timeline: "9-12 months",
      guests: "30-80",
      features: [
        "Destination venue coordination",
        "Travel arrangements assistance",
        "Photography & videography package",
        "Welcome party & farewell brunch",
        "On-site coordinator",
        "Custom experiences for guests"
      ]
    },
    {
      title: "Luxury Experience",
      description: "A no-compromise luxury wedding with every detail perfected.",
      price: "Luxury",
      timeline: "12-18 months",
      guests: "100+",
      features: [
        "Premium venue with exclusive access",
        "Complete wedding planning service",
        "Top-tier catering & menu tasting",
        "Luxury floral installations",
        "Live entertainment",
        "Multi-day celebration events",
        "Custom wedding decor & styling"
      ]
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (location.state?.formData) {
      setFormData(location.state.formData);
      toast({
        title: "Wedding Plans Created!",
        description: `We've created personalized wedding plans for ${location.state.formData.partner1Name} & ${location.state.formData.partner2Name}.`,
      });
      
      saveWeddingDetails(location.state.formData);
      setLoading(false);
    } else {
      fetchWeddingDetails();
    }
  }, [location, navigate, user]);

  // Calculate remaining days until wedding
  useEffect(() => {
    if (formData?.weddingDate) {
      const weddingDate = new Date(formData.weddingDate);
      const today = new Date();
      const diffTime = Math.abs(weddingDate.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setRemainingDays(diffDays);
    }
  }, [formData]);

  // Apply wedding colors to CSS variables
  useEffect(() => {
    if (weddingColors && weddingColors.length > 0) {
      document.documentElement.style.setProperty('--wedding-pink', weddingColors[0] || '#FAD2E1');
      document.documentElement.style.setProperty('--wedding-pink-dark', weddingColors[1] || '#F8BBD0');
      document.documentElement.style.setProperty('--wedding-cream', weddingColors[2] || '#fff1e6');
    }
  }, [weddingColors]);

  const fetchWeddingDetails = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('wedding_details')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching wedding details:", error);
        setNoDetailsFound(true);
        setLoading(false);
        return;
      }
      
      if (data) {
        setWeddingDetails(data);
        setFormData({
          partner1Name: data.partner1_name || 'Partner 1',
          partner2Name: data.partner2_name || 'Partner 2',
          weddingDate: data.wedding_date || '',
          budget: data.budget || '',
          guestCount: data.guest_count || '',
          honeymoonDestination: data.honeymoon_destination || '',
          theme: data.theme ? JSON.parse(data.theme) : [],
        });

        // Set wedding colors from theme
        const themeData = data.theme ? JSON.parse(data.theme) : [];
        if (Array.isArray(themeData) && themeData.length > 0) {
          setWeddingColors(themeData);
        }
      } else {
        setNoDetailsFound(true);
        setFormData({
          partner1Name: 'Partner 1',
          partner2Name: 'Partner 2',
          weddingDate: '',
          budget: '',
          guestCount: '',
          honeymoonDestination: '',
          theme: [],
        });
      }
    } catch (error) {
      console.error("Error in fetchWeddingDetails:", error);
      setNoDetailsFound(true);
    } finally {
      setLoading(false);
    }
  };
  
  const saveWeddingDetails = async (data: any) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('wedding_details')
        .upsert({
          user_id: user.id,
          partner1_name: data.partner1Name || 'Partner 1',
          partner2_name: data.partner2Name || 'Partner 2',
          wedding_date: data.weddingDate || null,
          budget: data.budget || null,
          guest_count: data.guestCount || null,
          honeymoon_destination: data.honeymoonDestination || null,
          theme: data.theme ? JSON.stringify(data.theme) : null,
        })
        .select();
      
      if (error) {
        console.error("Error saving wedding details:", error);
        toast({
          title: "Error",
          description: "Failed to save wedding details. Please try again.",
          variant: "destructive",
        });
      } else {
        setNoDetailsFound(false);
        toast({
          title: "Success",
          description: "Wedding details saved successfully!",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error in saveWeddingDetails:", error);
    }
  };

  // Generate timeline based on wedding date
  const generateTimeline = () => {
    if (!formData?.weddingDate) return [];
    
    const weddingDate = new Date(formData.weddingDate);
    const today = new Date();
    const monthsLeft = (weddingDate.getFullYear() - today.getFullYear()) * 12 + 
                      (weddingDate.getMonth() - today.getMonth());
    
    const timeline = [];
    
    // Add timeline items based on months remaining
    if (monthsLeft >= 12) {
      timeline.push({
        title: "Start Planning",
        description: "Set your wedding budget and guest list",
        date: "12+ months before",
        completed: true
      });
    }
    
    if (monthsLeft >= 9) {
      timeline.push({
        title: "Venue Selection",
        description: "Book your ceremony and reception venues",
        date: "9-12 months before",
        completed: monthsLeft < 11
      });
    }
    
    if (monthsLeft >= 6) {
      timeline.push({
        title: "Book Key Vendors",
        description: "Photographer, caterer, DJ/band",
        date: "6-9 months before",
        completed: monthsLeft < 8
      });
    }
    
    if (monthsLeft >= 4) {
      timeline.push({
        title: "Wedding Attire",
        description: "Shop for wedding attire and schedule fittings",
        date: "4-6 months before",
        completed: monthsLeft < 5
      });
    }
    
    timeline.push({
      title: "Invitations",
      description: "Finalize guest list and send out invitations",
      date: "3 months before",
      completed: monthsLeft < 3
    });
    
    timeline.push({
      title: "Final Details",
      description: "Confirm all arrangements with vendors",
      date: "1 month before",
      completed: monthsLeft < 1
    });
    
    return timeline;
  };

  const handleCreateWedding = () => {
    navigate('/', { state: { showOnboarding: true }});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" 
           style={{background: `linear-gradient(135deg, ${weddingColors[0]}40, ${weddingColors[1]}30)`}}>
        <div className="animate-pulse flex flex-col items-center">
          <Heart className="w-12 h-12 text-wedding-pink animate-bounce" />
          <p className="mt-4 text-lg">Loading your wedding plans...</p>
        </div>
      </div>
    );
  }

  if (noDetailsFound) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" 
           style={{background: `linear-gradient(135deg, ${weddingColors[0]}40, ${weddingColors[1]}30)`}}>
        <Card className="max-w-md w-full p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-wedding-pink/20 p-4 rounded-full mb-4">
              <Heart className="w-10 h-10 text-wedding-pink" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to WedPal</h1>
            <p className="text-muted-foreground mb-6">
              It looks like you haven't created your wedding details yet. Let's get you started on your wedding journey!
            </p>
            <Button 
              onClick={handleCreateWedding}
              className="w-full py-6"
              style={{backgroundColor: weddingColors[0]}}
            >
              <Plus className="mr-2 h-4 w-4" /> Create Your Wedding
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-gray-50/80">
      {/* Header */}
      <div 
        className="py-8 px-4 mb-6"
        style={{
          background: `linear-gradient(to bottom right, ${weddingColors[0]}40, ${weddingColors[1]}30)`,
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="container max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold flex items-center gap-2">
                <span>{formData?.partner1Name || 'Partner 1'} & {formData?.partner2Name || 'Partner 2'}</span>
                <Heart className="w-6 h-6 text-wedding-pink fill-wedding-pink animate-pulse-gentle" />
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 text-muted-foreground">
                {formData?.weddingDate && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formData.weddingDate}</span>
                  </div>
                )}
              </div>
            </div>
            
            {remainingDays !== null && (
              <div className="mt-4 md:mt-0 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-sm">
                <p className="text-sm text-muted-foreground">Countdown to your special day</p>
                <p className="text-3xl font-bold text-wedding-pink-dark">{remainingDays} days</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="container max-w-6xl mx-auto px-4 mb-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full mb-4">
            <TabsTrigger value="overview" className="text-sm md:text-base">Overview</TabsTrigger>
            <TabsTrigger value="timeline" className="text-sm md:text-base">Timeline</TabsTrigger>
            <TabsTrigger value="checklist" className="text-sm md:text-base">Checklist</TabsTrigger>
            <TabsTrigger value="vendors" className="text-sm md:text-base">Vendors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 mb-2 text-wedding-pink" />
                <h3 className="text-sm font-medium">Wedding Date</h3>
                <p className="text-lg font-semibold">{formData?.weddingDate?.split('-').slice(1).join('/') || '-'}</p>
              </Card>
              
              <Card className="p-4 flex flex-col items-center text-center">
                <Users className="h-8 w-8 mb-2 text-wedding-pink" />
                <h3 className="text-sm font-medium">Guest Count</h3>
                <p className="text-lg font-semibold">{formData?.guestCount || '-'}</p>
              </Card>
              
              <Card className="p-4 flex flex-col items-center text-center">
                <DollarSign className="h-8 w-8 mb-2 text-wedding-pink" />
                <h3 className="text-sm font-medium">Budget</h3>
                <p className="text-lg font-semibold">{formData?.budget || '-'}</p>
              </Card>
              
              <Card className="p-4 flex flex-col items-center text-center">
                <Map className="h-8 w-8 mb-2 text-wedding-pink" />
                <h3 className="text-sm font-medium">Honeymoon</h3>
                <p className="text-lg font-semibold">{formData?.honeymoonDestination || '-'}</p>
              </Card>
            </div>
            
            {/* Progress Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CheckSquare className="mr-2 h-5 w-5 text-wedding-pink" />
                Planning Progress
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">{Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{
                        width: `${Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%`,
                        backgroundColor: weddingColors[0]
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Venue & Vendors</span>
                      <span className="text-xs">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-wedding-pink" style={{width: '25%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Guest Management</span>
                      <span className="text-xs">50%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-wedding-pink" style={{width: '50%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Decoration & Details</span>
                      <span className="text-xs">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-wedding-pink" style={{width: '10%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => setActiveTab('checklist')}
                  className="text-sm"
                  style={{backgroundColor: weddingColors[0]}}
                >
                  View Detailed Checklist
                </Button>
              </div>
            </Card>
            
            {/* Wedding Plans */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recommended Wedding Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {weddingPlans.map((plan, index) => (
                  <WeddingPlanCard
                    key={index}
                    title={plan.title}
                    description={plan.description}
                    price={plan.price}
                    timeline={plan.timeline}
                    guests={plan.guests}
                    features={plan.features}
                    highlight={plan.highlight}
                  />
                ))}
              </div>
            </div>
            
            {/* Next Steps */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-wedding-pink" />
                Next Steps
              </h2>
              
              <div className="space-y-4">
                {tasks.filter(task => !task.completed).slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center p-3 bg-white rounded-lg border border-gray-100">
                    <div className="h-4 w-4 border border-wedding-pink rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      {task.dueDate && <p className="text-sm text-muted-foreground">{task.dueDate}</p>}
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full text-sm"
                  onClick={() => setActiveTab('checklist')}
                >
                  View All Tasks
                </Button>
              </div>
            </Card>
            
            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="p-6 h-auto flex flex-col items-center gap-2"
                onClick={() => setActiveTab('vendors')}
              >
                <Store className="h-6 w-6 text-wedding-pink" />
                <span>Find Vendors</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="p-6 h-auto flex flex-col items-center gap-2"
                onClick={() => setActiveTab('timeline')}
              >
                <CalendarCheck className="h-6 w-6 text-wedding-pink" />
                <span>View Timeline</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="p-6 h-auto flex flex-col items-center gap-2"
              >
                <Users className="h-6 w-6 text-wedding-pink" />
                <span>Guest List</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="p-6 h-auto flex flex-col items-center gap-2"
              >
                <DollarSign className="h-6 w-6 text-wedding-pink" />
                <span>Budget Tracker</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-wedding-pink" />
                Wedding Timeline
              </h2>
              
              <div className="space-y-6">
                {generateTimeline().map((item, index) => (
                  <WeddingTimelineItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    completed={item.completed}
                  />
                ))}
                
                {generateTimeline().length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Please set your wedding date to see your timeline.</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="checklist" className="space-y-6">
            <WeddingChecklist 
              tasks={tasks}
              setTasks={setTasks}
              weddingColors={weddingColors}
            />
          </TabsContent>
          
          <TabsContent value="vendors" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Store className="mr-2 h-5 w-5 text-wedding-pink" />
                Vendor Marketplace
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <Calendar className="h-10 w-10 text-gray-400" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">Venues</h3>
                    <p className="text-sm text-muted-foreground mb-3">Find the perfect location for your ceremony and reception.</p>
                    <Button variant="outline" size="sm" className="w-full">Browse Venues</Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <Heart className="h-10 w-10 text-gray-400" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">Photographers</h3>
                    <p className="text-sm text-muted-foreground mb-3">Capture your special moments with professional photographers.</p>
                    <Button variant="outline" size="sm" className="w-full">Find Photographers</Button>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-gray-400" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">Catering</h3>
                    <p className="text-sm text-muted-foreground mb-3">Explore menu options for your wedding reception.</p>
                    <Button variant="outline" size="sm" className="w-full">Explore Caterers</Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 text-center">
                <Button onClick={() => navigate('/vendors')} style={{backgroundColor: weddingColors[0]}}>
                  View All Vendors
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Gradient overlay for smooth transition */}
      <div className="fixed bottom-0 left-0 w-full h-40 gradient-overlay pointer-events-none" />
    </div>
  );
};

export default Dashboard;
