
import React, { useState } from 'react';
import NavigationSidebar from '@/components/dashboard/NavigationSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Send } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSummary from '@/components/dashboard/RecommendedWeddingPlans';
import { useDashboardData } from '@/hooks/useDashboardData';
import { GuestStats } from '@/types/guest';
import { useAuth } from '@/components/AuthProvider';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! I\'m Naa, your wedding planning assistant. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const dashboardData = useDashboardData();
  const { user } = useAuth();
  
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', message }]);
    setMessage('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { sender: 'bot', message: 'I\'m here to help with your wedding planning! Ask me about venues, budgets, timelines, or any other aspect of your wedding planning journey.' }
      ]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Guest statistics data for the sidebar
  const guestStats: GuestStats = {
    total: 120,
    confirmed: 45,
    pending: 65,
    declined: 10
  };
  
  // Budget summary data
  const budgetSummary = {
    total: 25000,
    spent: 9500,
    remaining: 15500
  };
  
  // Recent user activities
  const recentActivities = [
    { action: "Added 3 new guests", date: "Today, 2:30 PM", userName: dashboardData.userName || "You" },
    { action: "Updated venue budget", date: "Yesterday, 4:15 PM", userName: dashboardData.userName || "You" },
    { action: "Confirmed photographer booking", date: "May 8, 2025", userName: dashboardData.partnerName || "Partner" },
    { action: "Created new guest list", date: "May 5, 2025", userName: dashboardData.userName || "You" },
  ];
  
  return (
    <div className="min-h-screen">
      <NavigationSidebar />
      
      <div className="w-full animated-gradient dynamic-gradient relative flex flex-col h-screen overflow-hidden">
        <DashboardHeader 
          userName={dashboardData.userName}
          partnerName={dashboardData.partnerName}
        />
        
        <main className={`w-full px-6 md:px-6 py-8 flex-grow overflow-auto ml-[60px]`}>
          <div className="mb-8 text-white max-w-[1600px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 flex items-center gap-2">
              <Bot className="w-8 h-8" />
              Naa AI Assistant
            </h1>
            <p className="text-white/80">
              Your personal wedding planning assistant
            </p>
          </div>
          
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-4">
              <Card className="overflow-hidden min-h-[70vh] flex flex-col">
                <div className="flex-grow p-4 overflow-y-auto">
                  <div className="flex flex-col gap-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`max-w-[75%] p-3 rounded-xl ${
                            chat.sender === 'user' 
                              ? 'chat-bubble-user' 
                              : 'chat-bubble-ai'
                          }`}
                        >
                          {chat.message}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="typing-indicator chat-bubble-ai">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..." 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-grow"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-8">
              <DashboardSummary 
                preferredBudget="$5,000-15,000"
                guestStats={guestStats}
                recentActivities={recentActivities}
                budgetSummary={budgetSummary}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIAssistant;
