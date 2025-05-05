
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Wallet,
  Users,
  Clock,
  Gift,
  Image,
  Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NavigationSidebar: React.FC = () => {
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
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 py-6 px-2 bg-white/10 backdrop-blur-lg rounded-full shadow-lg z-50 border-2 border-transparent" style={{ backgroundClip: 'padding-box', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #23a6d5, #e73c7e) border-box' }}>
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <button
            key={item.name}
            onClick={() => handleNavigate(item.path)}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300",
              "hover:bg-white/90 hover:shadow-lg hover:scale-110",
              isActive 
                ? "bg-pink-500 text-white" 
                : "bg-white text-gray-600"
            )}
            aria-label={item.name}
            title={item.name}
          >
            <item.icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
};

export default NavigationSidebar;
