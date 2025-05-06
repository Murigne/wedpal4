
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NavigationItem from './NavigationItem';
import SidebarToggle from './SidebarToggle';
import { navigationItems } from './navigationItems';

interface NavigationSidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ onExpandChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (onExpandChange) {
      onExpandChange(newExpandedState);
    }
  };

  // Notify parent on mount of initial state
  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(isExpanded);
    }
  }, []);

  return (
    <div className={cn(
      "fixed left-5 top-1/2 -translate-y-1/2 flex flex-col z-50 transition-all duration-300",
      isExpanded 
        ? "bg-white/10 backdrop-blur-lg p-3 rounded-xl w-[180px]" 
        : "gap-3 py-4 px-3 bg-white/10 backdrop-blur-lg rounded-full",
      "shadow-lg"
    )}>
      {isExpanded && (
        <div className="mb-3 px-2">
          <h3 className="text-white/90 font-medium text-sm">Navigation</h3>
        </div>
      )}
      
      <div className={cn("flex", isExpanded ? "flex-col gap-3" : "flex-col gap-3")}>
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            path={item.path}
            isExpanded={isExpanded}
            onClick={handleNavigate}
          />
        ))}
      </div>
      
      <SidebarToggle 
        isExpanded={isExpanded}
        onClick={toggleSidebar}
      />
    </div>
  );
};

export default NavigationSidebar;
