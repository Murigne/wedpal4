
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  CalendarCheck, 
  CheckSquare, 
  Store, 
  Palette, 
  Clock, 
  Users,
  HeartHandshake,
  LogOut,
  Settings,
  User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/components/AuthProvider';
import WeddingPlanCard from '@/components/WeddingPlanCard';
import WeddingProgressTracker from '@/components/WeddingProgressTracker';
import WeddingTemplates from '@/components/WeddingTemplates';
import WedPalLogo from '@/components/WedPalLogo';
import HeartAnimation from '@/components/HeartAnimation';
import { format } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [formattedWeddingDate, setFormattedWeddingDate] = useState('');
  const [weddingColors, setWeddingColors] = useState<string[]>(['#FFC0CB', '#FFAFBD', '#E7F0FD']);
  const [preferredBudget, setPreferredBudget] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  
  useEffect(() => {
    if (location.state?.formData) {
      const formData = location.state.formData;
      setUserName(formData.partner1Name || 'User');
      setPartnerName(formData.partner2Name || 'Partner');
      setWeddingDate(formData.weddingDate ? new Date(formData.weddingDate).toLocaleDateString() : '');
      
      if (formData.weddingDate) {
        try {
          const date = new Date(formData.weddingDate);
          setFormattedWeddingDate(format(date, 'dd-MMM-yy'));
        } catch (e) {
          setFormattedWeddingDate('');
        }
      }
      
      // Update the budget format to use GHS instead of $
      const formattedBudget = formData.budget 
        ? formData.budget.replace('$', 'GHS ')
        : 'GHS 15k - 25k';
      setPreferredBudget(formattedBudget);
      
      if (location.state.userColors && location.state.userColors.length) {
        setWeddingColors(location.state.userColors);
      }
    } else {
      setUserName('Alex');
      setPartnerName('Jamie');
      setWeddingDate('June 15, 2025');
      try {
        const date = new Date('June 15, 2025');
        setFormattedWeddingDate(format(date, 'dd-MMM-yy'));
      } catch (e) {
        setFormattedWeddingDate('15-Jun-25');
      }
      setPreferredBudget('GHS 15k - 25k');
    }
  }, [location]);

  useEffect(() => {
    if (weddingColors.length > 0) {
      document.documentElement.style.setProperty('--wedding-color-primary', weddingColors[0]);
      if (weddingColors.length > 1) {
        document.documentElement.style.setProperty('--wedding-color-secondary', weddingColors[1]);
      }
      if (weddingColors.length > 2) {
        document.documentElement.style.setProperty('--wedding-color-tertiary', weddingColors[2]);
      }
      
      const gradientColors = weddingColors.length >= 2 
        ? weddingColors 
        : [...weddingColors, ...(['#FFC0CB', '#E7F0FD'].filter(c => !weddingColors.includes(c)))];
      
      const gradientStyle = `linear-gradient(-45deg, ${gradientColors.join(', ')})`;
      document.documentElement.style.setProperty('--dynamic-gradient', gradientStyle);
    }
  }, [weddingColors]);

  const tasks = [
    { id: '1', title: 'Set your wedding date', completed: true, dueDate: 'Completed' },
    { id: '2', title: 'Create guest list', completed: false, dueDate: '3 months before' },
    { id: '3', title: 'Book venue', completed: false, dueDate: '10 months before' },
    { id: '4', title: 'Book photographer', completed: false, dueDate: '8 months before' },
    { id: '5', title: 'Choose wedding attire', completed: false, dueDate: '6 months before' },
    { id: '6', title: 'Send invitations', completed: false, dueDate: '3 months before' }
  ];

  const weddingPlans = [
    {
      title: 'Intimate & Cozy',
      description: 'Perfect for a cozy celebration with your closest loved ones',
      price: 'GHS 5k - 10k',
      timeline: '3-6 months',
      guests: '30-50 people',
      features: [
        'Intimate venue setting',
        'Simplified catering menu',
        'DJ instead of live band',
        'Digital invitations',
        'Minimal floral arrangements'
      ]
    },
    {
      title: 'Classic Romance',
      description: 'The traditional wedding experience with all the essentials',
      price: 'GHS 15k - 25k',
      timeline: '9-12 months',
      guests: '80-120 people',
      features: [
        'Traditional venue',
        'Full catering service',
        'Professional photography',
        'Floral arrangements',
        'DJ and dance floor'
      ],
      highlight: true
    },
    {
      title: 'Royal Delight',
      description: 'An extraordinary celebration with premium amenities',
      price: 'GHS 30k+',
      timeline: '12-18 months',
      guests: '150-200+ people',
      features: [
        'Premium venue',
        'Gourmet catering',
        'Live band entertainment',
        'Full wedding planner',
        'Video & photography package',
        'Custom decor & lighting'
      ]
    },
    {
      title: 'Fairytale',
      description: 'A magical experience in a breathtaking location',
      price: 'GHS 20k - 35k',
      timeline: '10-14 months',
      guests: '50-80 people',
      features: [
        'Exotic location venue',
        'Travel arrangements',
        'Welcome reception',
        'Multiple day events',
        'Group activities',
        'Local cultural elements'
      ]
    }
  ];

  const userPreferences = {
    indoor: true,
    outdoor: false,
    formal: true,
    seasonal: 'Summer',
  };

  const handleVendorMarketplaceClick = () => {
    navigate('/vendors');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/');
  };

  const handleAccountSettings = () => {
    toast({
      title: "Account Settings",
      description: "This feature is coming soon!",
    });
  };

  return (
    <div className="min-h-screen w-full animated-gradient dynamic-gradient relative">
      <HeartAnimation avoidTextAreas={true} count={10} />
      
      <header className="w-full backdrop-blur-sm bg-white/30 border-b border-white/20 px-4 md:px-6 py-4">
        <div className="container mx-auto max-w-[1600px] flex items-center justify-between">
          <WedPalLogo className="text-white text-2xl drop-shadow-lg ml-2" />
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="bg-white/30 hover:bg-white/40 text-white border-white/30"
              onClick={handleVendorMarketplaceClick}
            >
              <Store className="w-4 h-4 mr-2" />
              Vendor Marketplace
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white">
                  <span className="font-medium text-sm">{userName.charAt(0)}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleEditProfile}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Edit Wedding Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAccountSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="w-full px-6 md:px-6 py-8">
        <div className="mb-8 text-white max-w-[1600px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2 ml-6">
            Welcome back, {userName} & {partnerName}!
          </h1>
          <p className="text-white/80 ml-6">
            Your wedding date: <span className="font-medium">{formattedWeddingDate || weddingDate}</span>
            {weddingDate && <span> · Only {calculateDaysUntil(weddingDate)} days to go!</span>}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <HeartHandshake className="mr-2 h-5 w-5" />
                  Recommended Wedding Plans
                </CardTitle>
                <CardDescription>
                  Based on your budget range: {preferredBudget}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {weddingPlans.map((plan, index) => (
                    <WeddingPlanCard
                      key={index}
                      {...plan}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <WeddingTemplates
              userBudget={preferredBudget}
              userPreferences={userPreferences}
              userColors={weddingColors}
            />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <WeddingProgressTracker tasks={tasks} className="w-full" />
            
            <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90">
                  <CheckSquare className="h-6 w-6 mb-1" />
                  <span className="text-xs">Checklist</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90">
                  <Users className="h-6 w-6 mb-1" />
                  <span className="text-xs">Guests</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90">
                  <Calendar className="h-6 w-6 mb-1" />
                  <span className="text-xs">Schedule</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90">
                  <Palette className="h-6 w-6 mb-1" />
                  <span className="text-xs">Theme</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tasks.filter(task => !task.completed).slice(0, 3).map((task) => (
                    <li key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                      <span>{task.title}</span>
                      <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const calculateDaysUntil = (dateString: string) => {
  try {
    const weddingDate = new Date(dateString);
    const today = new Date();
    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  } catch (e) {
    return 'N/A';
  }
};

export default Dashboard;
