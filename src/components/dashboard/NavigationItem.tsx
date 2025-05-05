
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  name: string;
  icon: LucideIcon;
  path: string;
  isExpanded: boolean;
  onClick: (path: string) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  name, 
  icon: Icon, 
  path, 
  isExpanded, 
  onClick 
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <button
      onClick={() => onClick(path)}
      className={cn(
        "transition-all duration-300 flex items-center gap-2 group",
        "hover:shadow-lg hover:scale-105",
        isExpanded ? "px-2 py-2 rounded-lg w-full justify-start" : "w-10 h-10 rounded-full justify-center",
        isActive 
          ? "bg-pink-500 text-white" 
          : "bg-white text-gray-600 hover:bg-white/90"
      )}
      aria-label={name}
      title={name}
    >
      <Icon className={cn(
        "w-4 h-4 transition-colors",
        isActive ? "text-white" : "text-gray-600 group-hover:text-gray-600"
      )} />
      {isExpanded && <span className="text-sm whitespace-nowrap">{name}</span>}
    </button>
  );
};

export default NavigationItem;
