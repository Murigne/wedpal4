
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

const NavigationSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
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
      "fixed left-6 top-1/2 -translate-y-1/2 flex flex-col z-50 transition-all duration-300",
      isExpanded 
        ? "bg-white/10 backdrop-blur-lg p-4 rounded-xl animate-sidebar-expand" 
        : "gap-3 py-4 px-2 bg-white/10 backdrop-blur-lg rounded-full animate-sidebar-collapse",
      "shadow-lg"
    )}>
      {isExpanded && (
        <div className="mb-3 px-2 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <h3 className="text-white/90 font-medium text-sm">Navigation</h3>
        </div>
      )}
      
      <div className={cn("flex", isExpanded ? "flex-col gap-3" : "flex-col gap-3")}>
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
                isExpanded ? "px-3 py-2 rounded-lg w-full justify-start" : "w-10 h-10 rounded-full justify-center",
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
      
      <button
        onClick={toggleSidebar}
        className={cn(
          "mt-4 w-10 h-10 flex items-center justify-center rounded-full",
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
  );
};

export default NavigationSidebar;
