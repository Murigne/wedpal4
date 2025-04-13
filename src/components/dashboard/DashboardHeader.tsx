
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WedPalLogo from '@/components/WedPalLogo';
import ProfileMenu from './ProfileMenu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardHeaderProps {
  userName: string;
  partnerName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, partnerName }) => {
  const navigate = useNavigate();

  const handleVendorMarketplaceClick = () => {
    navigate('/vendors');
  };

  // Get initials for avatar
  const getInitials = () => {
    const firstInitial = userName ? userName.charAt(0).toUpperCase() : '';
    const secondInitial = partnerName ? partnerName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${secondInitial}`;
  };

  return (
    <header className="w-full backdrop-blur-sm bg-white/30 border-b border-white/20 px-4 md:px-6 py-4">
      <div className="container mx-auto max-w-[1600px] flex items-center justify-between">
        <WedPalLogo className="text-white text-2xl drop-shadow-lg" />
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="bg-white/30 hover:bg-white/40 text-white border-white/30"
            onClick={handleVendorMarketplaceClick}
          >
            <Store className="w-4 h-4 mr-2" />
            Vendor Marketplace
          </Button>
          
          <ProfileMenu userName={userName} partnerName={partnerName}>
            <Avatar className="h-8 w-8 bg-white/90 hover:bg-white">
              <AvatarFallback className="text-sm font-medium">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </ProfileMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
