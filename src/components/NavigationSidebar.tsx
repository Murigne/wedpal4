
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  Image, 
  Gift, 
  Palette, 
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const NavigationSidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigationItems: NavigationItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Wallet, label: "Budget", path: "/budget" },
    { icon: Users, label: "Guests", path: "/guests" },
    { icon: Image, label: "Mood Board", path: "/mood-board" },
    { icon: Gift, label: "Gifts", path: "/gifts" },
    { icon: Palette, label: "Theme", path: "/theme" },
    { icon: Clock, label: "Timeline", path: "/timeline" }
  ];

  return (
    <div className="flex h-screen">
      <div 
        className={cn(
          "flex flex-col h-full transition-all duration-300 ease-in-out bg-gray-50 shadow-lg relative",
          isCollapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(prev => !prev)}
          className="absolute -right-3 top-12 bg-white rounded-full p-1 shadow-md z-10 hover:bg-gray-50 transition-colors"
        >
          {isCollapsed ? 
            <ChevronRight size={16} className="text-gray-600" /> : 
            <ChevronLeft size={16} className="text-gray-600" />
          }
        </button>
        
        {/* Logo or app name */}
        <div className={cn(
          "flex items-center px-5 h-16 border-b border-gray-100",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          {!isCollapsed && <span className="text-lg font-medium">WedPal</span>}
        </div>
        
        {/* Navigation Items */}
        <div className="flex flex-col space-y-1 px-3 py-5">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 group transition-all duration-200 relative",
                  isActive 
                    ? "bg-gradient-to-r from-red-400 to-orange-500 text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-100 hover:shadow-sm"
                )}
              >
                <div className={cn(
                  "flex items-center",
                  isCollapsed ? "justify-center w-full" : "justify-start"
                )}>
                  <item.icon 
                    size={20} 
                    className={cn(
                      "transition-transform duration-200",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700",
                      !isCollapsed && "mr-3"
                    )} 
                  />
                  
                  {!isCollapsed && (
                    <span className={cn(
                      "font-medium transition-opacity duration-200",
                      isActive ? "text-white" : "text-gray-700"
                    )}>
                      {item.label}
                    </span>
                  )}
                </div>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
