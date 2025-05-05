
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavigationItem from './NavigationItem';
import SidebarToggle from './SidebarToggle';
import { navigationItems } from './navigationItems';
import { Button } from '../ui/button';
import { useAuth } from '@/components/AuthProvider';

interface NavigationSidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ onExpandChange }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (onExpandChange) {
      onExpandChange(newExpandedState);
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup', { 
      state: { 
        formData: {
          partner1Name: '',
          partner2Name: '',
          weddingDate: ''
        }
      } 
    });
  };

  // Notify parent on mount of initial state
  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(isExpanded);
    }
  }, []);

  return (
    <>
      <div className={cn(
        "fixed left-6 top-1/2 -translate-y-1/2 flex flex-col z-50 transition-all duration-300",
        isExpanded 
          ? "bg-white/10 backdrop-blur-lg p-3 rounded-xl w-[100px]" 
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
      
      {/* Sign Up button positioned beneath the sidebar with some spacing when user is not logged in */}
      {isExpanded && !user && (
        <div className="fixed left-6 bottom-10 z-50 transition-all duration-300">
          <Button 
            onClick={handleSignUpClick}
            className="w-[100px] bg-white text-wedding-pink-dark hover:bg-white/90 flex items-center gap-1 justify-center"
            size="sm"
          >
            <UserRound size={16} />
            <span className="text-xs">Sign up</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default NavigationSidebar;
