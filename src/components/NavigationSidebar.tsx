
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  Users, 
  Palette, 
  Gift, 
  PaintBucket, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const NavigationSidebar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  
  const navigationItems: NavigationItem[] = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: DollarSign, label: "Budget", path: "/budget" },
    { icon: Users, label: "Guests", path: "/guests" },
    { icon: Palette, label: "Mood Board", path: "/mood-board" },
    { icon: Gift, label: "Gifts", path: "/gifts" },
    { icon: PaintBucket, label: "Theme", path: "/theme" },
    { icon: Calendar, label: "Timeline", path: "/timeline" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <SidebarContent className="py-6">
          <div className="flex justify-end mb-4 px-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCollapsed(prev => !prev)}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={isCollapsed ? item.label : undefined}
                  isActive={location.pathname === item.path}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <item.icon size={20} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default NavigationSidebar;
