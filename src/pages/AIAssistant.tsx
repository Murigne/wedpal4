
import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import NavigationSidebar from '@/components/dashboard/NavigationSidebar';
import { cn } from '@/lib/utils';

const AIAssistant = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="fixed top-0 left-0 h-full pt-[160px] pl-6 z-50 transition-all duration-300">
        <NavigationSidebar 
          isExpanded={sidebarExpanded}
          setIsExpanded={setSidebarExpanded}
        />
      </div>
      
      <div className={cn(
        "w-full animated-gradient dynamic-gradient relative transition-all duration-300",
        sidebarExpanded ? "ml-[220px]" : "ml-[60px]"
      )}>
        <main className="w-full px-6 md:px-6 py-8">
          <div className="mb-8 text-white max-w-[1600px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 flex items-center gap-2">
              <Bot className="w-8 h-8" />
              Naa AI Assistant
            </h1>
            <p className="text-white/80">
              Your personal wedding planning assistant
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 max-w-[1600px] mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl">
              <h2 className="text-xl font-medium mb-4">Ask Naa anything about your wedding</h2>
              <p>This section is under development. Soon you'll be able to chat with our AI assistant for all your wedding planning needs.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIAssistant;
