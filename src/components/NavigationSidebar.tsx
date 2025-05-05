
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  Users, 
  Palette, 
  Gift, 
  PaintBucket, 
  Calendar 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const NavigationSidebar: React.FC = () => {
  const location = useLocation();
  
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
    <Sidebar>
      <SidebarContent className="py-6">
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.label}
                isActive={location.pathname === item.path}
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavigationSidebar;
