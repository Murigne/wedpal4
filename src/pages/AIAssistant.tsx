
import React, { useState } from 'react';
import NavigationSidebar from '@/components/dashboard/NavigationSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Send } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import RecommendedWeddingPlans from '@/components/dashboard/RecommendedWeddingPlans';
import { useDashboardData } from '@/hooks/useDashboardData';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! I\'m Naa, your wedding planning assistant. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const dashboardData = useDashboardData();
  
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
  
  // Sample wedding plans data for the sidebar
  const weddingPlans = [
    {
      title: "Classic Romance",
      description: "A timeless wedding theme",
      price: "$5,000-15,000",
      timeline: "3-6 months",
      guests: "50-100",
      features: ["Indoor ceremony", "Traditional decor", "Sit-down dinner"],
      highlight: true
    },
    {
      title: "Intimate & Cozy",
      description: "Small and meaningful celebration",
      price: "$3,000-8,000",
      timeline: "2-4 months",
      guests: "20-50",
      features: ["Backyard setting", "Family-style dinner", "Personalized vows"],
      highlight: false
    },
    {
      title: "Royal Delight",
      description: "Luxurious and elegant affair",
      price: "$20,000-40,000",
      timeline: "6-12 months",
      guests: "100-200",
      features: ["Grand venue", "Premium catering", "Live orchestra"],
      highlight: false
    }
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
              <RecommendedWeddingPlans 
                weddingPlans={weddingPlans}
                preferredBudget="$5,000-15,000"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIAssistant;
