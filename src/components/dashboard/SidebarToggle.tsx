
import React from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarToggleProps {
  isExpanded: boolean;
  onClick: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isExpanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "mt-4 w-10 h-10 flex items-center justify-center rounded-full",
        "bg-white text-gray-600 hover:bg-white/90 hover:shadow-lg transition-all duration-300",
        "hover:scale-105"
      )}
      aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
      title={isExpanded ? "Collapse menu" : "Expand menu"}
    >
      {isExpanded ? (
        <X className="w-4 h-4" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
    </button>
  );
};

export default SidebarToggle;
