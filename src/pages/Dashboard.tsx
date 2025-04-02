
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Heart } from 'lucide-react';
import WeddingPlanCard from '@/components/WeddingPlanCard';
import TimelineItem from '@/components/TimelineItem';
import FloatingHearts from '@/components/FloatingHearts';
import { toast } from '@/components/ui/use-toast';
import WeddingProgressTracker from '@/components/WeddingProgressTracker';
import WeddingTemplates from '@/components/WeddingTemplates';
import CustomVendorSelector from '@/components/CustomVendorSelector';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Database } from '@/integrations/supabase/types';

type WeddingDetails = Database['public']['Tables']['wedding_details']['Row'];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<any>(null);
  const [weddingDetails, setWeddingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Create wedding account', completed: true },
    { id: '2', title: 'Set wedding date and budget', completed: true },
    { id: '3', title: 'Choose wedding colors & theme', completed: true },
    { id: '4', title: 'Select venue', completed: false, dueDate: '2 months before wedding' },
    { id: '5', title: 'Book photographer', completed: false, dueDate: '6 months before wedding' },
    { id: '6', title: 'Choose catering', completed: false, dueDate: '4 months before wedding' },
    { id: '7', title: 'Send invitations', completed: false, dueDate: '3 months before wedding' },
    { id: '8', title: 'Finalize guest list', completed: false, dueDate: '2 months before wedding' },
    { id: '9', title: 'Book honeymoon', completed: false, dueDate: '3 months before wedding' },
    { id: '10', title: 'Order wedding attire', completed: false, dueDate: '5 months before wedding' }
  ]);
  
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
      toast({
        title: "Wedding Plans Created!",
        description: `We've created some beautiful wedding plans for ${location.state.formData.partner1Name} & ${location.state.formData.partner2Name}.`,
        duration: 5000,
      });
      
      if (user) {
        saveWeddingDetails(location.state.formData);
      }
      
      setLoading(false);
    } else {
      if (user) {
        fetchWeddingDetails();
      } else {
        navigate('/');
      }
    }
  }, [location, navigate, user]);
  
  const fetchWeddingDetails = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('wedding_details')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (error) {
        console.error("Error fetching wedding details:", error);
        navigate('/');
        return;
      }
      
      if (data) {
        setWeddingDetails(data);
        setFormData({
          partner1Name: data.partner1_name,
          partner2Name: data.partner2_name,
          weddingDate: data.wedding_date,
          budget: data.budget,
          guestCount: data.guest_count,
          honeymoonDestination: data.honeymoon_destination,
          theme: data.theme ? JSON.parse(data.theme) : [],
        });
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error in fetchWeddingDetails:", error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };
  
  const saveWeddingDetails = async (data: any) => {
    try {
      const { error } = await supabase
        .from('wedding_details')
        .upsert({
          user_id: user?.id,
          partner1_name: data.partner1Name,
          partner2_name: data.partner2Name,
          wedding_date: data.weddingDate,
          budget: data.budget,
          guest_count: data.guestCount,
          honeymoon_destination: data.honeymoonDestination,
          theme: data.theme ? JSON.stringify(data.theme) : null,
        })
        .select();
      
      if (error) {
        console.error("Error saving wedding details:", error);
      }
    } catch (error) {
      console.error("Error in saveWeddingDetails:", error);
    }
  };

  if (loading || !formData) {
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

  const weddingColors = formData.theme && 
    (typeof formData.theme === 'string' ? 
      (formData.theme.startsWith('[') ? JSON.parse(formData.theme) : [formData.theme, '#F8BBD0', '#fff1e6']) : 
      Array.isArray(formData.theme) ? formData.theme : ['#FAD2E1', '#F8BBD0', '#fff1e6']);

  useEffect(() => {
    if (weddingColors && weddingColors.length > 0) {
      document.documentElement.style.setProperty('--wedding-pink', weddingColors[0] || '#FAD2E1');
      document.documentElement.style.setProperty('--wedding-pink-dark', weddingColors[1] || '#F8BBD0');
      document.documentElement.style.setProperty('--wedding-cream', weddingColors[2] || '#fff1e6');
    }
  }, [weddingColors]);

  return (
    <div className="min-h-screen pb-20 relative">
      <FloatingHearts count={10} />
      
      <div 
        className="py-6 px-4 mb-8"
        style={{
          background: `linear-gradient(to bottom right, ${weddingColors[0] || '#FAD2E1'}40, ${weddingColors[1] || '#F8BBD0'}30)`,
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="container max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          
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
      
      <div className="container max-w-6xl mx-auto px-4 mb-6">
        <div className="flex overflow-x-auto pb-2 no-scrollbar">
          <Button
            variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
            className="mr-2"
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'tasks' ? 'secondary' : 'ghost'}
            className="mr-2"
            onClick={() => setActiveTab('tasks')}
          >
            Planning Tasks
          </Button>
          <Button
            variant={activeTab === 'templates' ? 'secondary' : 'ghost'}
            className="mr-2"
            onClick={() => setActiveTab('templates')}
          >
            Wedding Templates
          </Button>
          <Button
            variant={activeTab === 'customize' ? 'secondary' : 'ghost'}
            className="mr-2"
            onClick={() => setActiveTab('customize')}
          >
            Custom Wedding
          </Button>
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4">
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <WeddingProgressTracker 
                  tasks={tasks} 
                  className="mb-8"
                />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Your Wedding Plans</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <WeddingPlanCard
                      title="Elegant Simplicity"
                      description="A beautiful, intimate celebration focused on what matters most."
                      price={formData.budget.includes('-') ? formData.budget.split('-')[0] : formData.budget}
                      timeline="6 months"
                      guests={formData.guestCount.includes('-') ? formData.guestCount : `Up to ${formData.guestCount}`}
                      features={[
                        "Intimate ceremony venue",
                        "Professional photographer (6 hours)",
                        "Dinner for all guests",
                        "Simple floral arrangements",
                        "Curated playlist"
                      ]}
                    />
                    
                    <WeddingPlanCard
                      title="Dream Celebration"
                      description="The perfect balance of elegance and value for your special day."
                      price={formData.budget}
                      timeline="8-12 months" 
                      guests={formData.guestCount}
                      features={[
                        "Premium ceremony & reception venues",
                        "Full day photography & video",
                        "Catered dinner with appetizers",
                        "Custom floral design",
                        "DJ & dance floor lighting",
                        "Wedding cake & dessert bar"
                      ]}
                      highlight={true}
                    />
                    
                    <WeddingPlanCard
                      title="Luxury Experience"
                      description="An unforgettable premium experience with every detail perfected."
                      price={formData.budget.includes('-') ? formData.budget.split('-')[1] : `Premium`}
                      timeline="12-18 months"
                      guests={`${formData.guestCount}+`}
                      features={[
                        "Exclusive venue with full weekend access",
                        "Premium photography & cinematography team",
                        "Full-service catering with custom menu",
                        "Luxury floral installations",
                        "Live band & entertainment",
                        "Custom wedding design & styling",
                        "Day-of coordination team"
                      ]}
                    />
                  </div>
                </div>
              </div>
              
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
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="wedding-card text-center">
                <h3 className="text-lg font-medium mb-3">Vendor Marketplace</h3>
                <p className="text-sm text-muted-foreground mb-4">Find and book the perfect vendors for your wedding day.</p>
                <Button className="wedding-button-secondary w-full" onClick={() => navigate('/vendors')}>
                  Explore Vendors
                </Button>
              </div>
              
              <div className="wedding-card text-center">
                <h3 className="text-lg font-medium mb-3">Outfit Visualization</h3>
                <p className="text-sm text-muted-foreground mb-4">Try on wedding outfits virtually before making a decision.</p>
                <Button className="wedding-button-secondary w-full">Try Outfits</Button>
              </div>
              
              <div className="wedding-card text-center">
                <h3 className="text-lg font-medium mb-3">Wedding Fund</h3>
                <p className="text-sm text-muted-foreground mb-4">Share your love story and create a fund for your big day.</p>
                <Button className="wedding-button-secondary w-full">Start Fundraising</Button>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'tasks' && (
          <div className="max-w-3xl mx-auto">
            <WeddingProgressTracker tasks={tasks} />
            <div className="mt-8 flex justify-center">
              <Button 
                variant="outline"
                className="mr-4"
                onClick={() => {
                  toast({
                    title: "Tasks Updated",
                    description: "Your task list has been refreshed based on your timeline.",
                  });
                }}
              >
                Refresh Tasks
              </Button>
              <Button 
                className="bg-wedding-pink hover:bg-wedding-pink-dark"
                onClick={() => {
                  const newTasks = [...tasks];
                  const nextIncomplete = newTasks.findIndex(task => !task.completed);
                  if (nextIncomplete >= 0) {
                    newTasks[nextIncomplete].completed = true;
                    setTasks(newTasks);
                    toast({
                      title: "Task Completed",
                      description: `"${newTasks[nextIncomplete].title}" marked as completed!`,
                    });
                  }
                }}
              >
                Complete Next Task
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === 'templates' && (
          <div>
            <WeddingTemplates 
              userBudget={formData.budget || "5000-15000"} 
              userPreferences={{
                venue: formData.venue || "Both",
                style: formData.style || "Modern"
              }}
              userColors={weddingColors}
            />
          </div>
        )}
        
        {activeTab === 'customize' && (
          <div>
            <CustomVendorSelector />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
