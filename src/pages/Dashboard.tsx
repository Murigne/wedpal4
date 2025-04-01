
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, ArrowLeft, ChevronRight } from 'lucide-react';
import WeddingPlanCard from '@/components/WeddingPlanCard';
import TimelineItem from '@/components/TimelineItem';
import FloatingHearts from '@/components/FloatingHearts';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  
  useEffect(() => {
    // Check if formData exists in location state
    if (location.state?.formData) {
      setFormData(location.state.formData);
      // Welcome toast
      toast({
        title: "Wedding Plans Created!",
        description: `We've created some beautiful wedding plans for ${location.state.formData.partner1Name} & ${location.state.formData.partner2Name}.`,
        duration: 5000,
      });
    } else {
      // Redirect to homepage if no data
      navigate('/');
    }
  }, [location, navigate]);

  if (!formData) {
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
      <div className="bg-wedding-pink/30 backdrop-blur-sm py-6 px-4 mb-8">
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
      
      {/* Main content */}
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wedding Plans */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Wedding Plans</h2>
              <Button variant="ghost" className="text-sm flex items-center">
                View all options <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          </div>
        </div>
        
        {/* Quick links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="wedding-card text-center">
            <h3 className="text-lg font-medium mb-3">Vendor Marketplace</h3>
            <p className="text-sm text-muted-foreground mb-4">Find and book the perfect vendors for your wedding day.</p>
            <Button className="wedding-button-secondary w-full">Explore Vendors</Button>
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
      </div>
    </div>
  );
};

export default Dashboard;
