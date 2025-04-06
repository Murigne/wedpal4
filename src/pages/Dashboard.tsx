
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import HeartAnimation from '@/components/HeartAnimation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WeddingProgressTracker from '@/components/WeddingProgressTracker';
import WeddingTemplates from '@/components/WeddingTemplates';
import QuickActions from '@/components/dashboard/QuickActions';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import RecommendedWeddingPlans from '@/components/dashboard/RecommendedWeddingPlans';
import { calculateDaysUntil } from '@/utils/dateUtils';

const Dashboard = () => {
  const location = useLocation();
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

  return (
    <div className="min-h-screen w-full animated-gradient dynamic-gradient relative">
      <HeartAnimation avoidTextAreas={true} count={10} />
      
      <DashboardHeader userName={userName} />
      
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
            <RecommendedWeddingPlans 
              weddingPlans={weddingPlans}
              preferredBudget={preferredBudget}
            />
            
            <WeddingTemplates
              userBudget={preferredBudget}
              userPreferences={userPreferences}
              userColors={weddingColors}
            />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <WeddingProgressTracker tasks={tasks} className="w-full" />
            
            <QuickActions />
            
            <UpcomingTasks tasks={tasks} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
