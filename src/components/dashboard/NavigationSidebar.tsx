
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Wallet,
  Users,
  Clock,
  Gift,
  Image,
  Palette,
  Store,
  Bot,
  Plus,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationSidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Budget', icon: Wallet, path: '/budget' },
    { name: 'Guests', icon: Users, path: '/guests' },
    { name: 'Timeline', icon: Clock, path: '/timeline' },
    { name: 'Gifts', icon: Gift, path: '/gifts' },
    { name: 'Mood Board', icon: Image, path: '/mood-board' },
    { name: 'Theme', icon: Palette, path: '/theme' },
    { name: 'Vendors', icon: Store, path: '/vendors' },
    { name: 'Naa AI', icon: Bot, path: '/ai-assistant' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={cn(
      "flex flex-col py-6 h-full transition-all duration-300 ease-out",
      isExpanded 
        ? "w-52 bg-white/10 backdrop-blur-lg rounded-r-xl shadow-lg" 
        : "w-16 bg-white/10 backdrop-blur-lg rounded-r-xl shadow-md",
    )}>
      {isExpanded && (
        <div className="mb-4 px-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <h3 className="text-white/90 font-medium text-sm">Navigation</h3>
        </div>
      )}
      
      <div className={cn("flex flex-col px-3", isExpanded ? "gap-3" : "gap-3")}>
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const animationDelay = isExpanded ? `${150 + index * 50}ms` : '0ms';
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "transition-all duration-300 flex items-center gap-3 group",
                "hover:shadow-lg hover:scale-105",
                isExpanded ? "px-3 py-2 rounded-lg w-full justify-start" : "w-10 h-10 rounded-full justify-center mx-auto",
                isActive 
                  ? "bg-pink-500 text-white" 
                  : "bg-white text-gray-600 hover:bg-white/90",
                isExpanded ? "opacity-0 animate-fade-in" : ""
              )}
              style={{ 
                animationDelay: animationDelay,
                animationFillMode: 'forwards'
              }}
              aria-label={item.name}
              title={item.name}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                isActive ? "text-white" : "text-gray-600 group-hover:text-gray-600"
              )} />
              {isExpanded && <span className="text-sm whitespace-nowrap">{item.name}</span>}
            </button>
          );
        })}
      </div>
      
      <div className="mt-auto px-3">
        <button
          onClick={toggleSidebar}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-full mx-auto",
            "bg-white text-gray-600 hover:bg-white/90 hover:shadow-lg transition-all duration-300",
            "hover:scale-105"
          )}
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
          title={isExpanded ? "Collapse menu" : "Expand menu"}
        >
          {isExpanded ? (
            <X className="w-4 h-4 animate-rotate-180" />
          ) : (
            <Plus className="w-4 h-4 animate-rotate-in" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavigationSidebar;
