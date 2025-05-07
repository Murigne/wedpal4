
import { 
  LayoutDashboard,
  Wallet,
  Users,
  Clock,
  Gift,
  Image,
  Store,
  Bot,
} from 'lucide-react';

export const navigationItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Budget', icon: Wallet, path: '/budget' },
  { name: 'Guests', icon: Users, path: '/guests' },
  { name: 'Timeline', icon: Clock, path: '/timeline' },
  { name: 'Gifts', icon: Gift, path: '/gifts' },
  { name: 'Mood Board', icon: Image, path: '/mood-board' },
  { name: 'Vendors', icon: Store, path: '/vendor-marketplace' },
  { name: 'Naa AI', icon: Bot, path: '/ai-assistant' },
];

