
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WedPalLogo from '@/components/WedPalLogo';
import ProfileMenu from './ProfileMenu';

interface DashboardHeaderProps {
  userName: string;
  partnerName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, partnerName }) => {
  const navigate = useNavigate();

  const handleVendorMarketplaceClick = () => {
    navigate('/vendors');
  };

  return (
    <header className="w-full backdrop-blur-sm bg-white/30 border-b border-white/20 py-4">
      <div className="container mx-auto max-w-[1600px] px-2">
        <div className="flex items-center justify-between">
          <div className="flex justify-start pl-1">
            <WedPalLogo className="text-white text-2xl drop-shadow-lg mr-2" />
          </div>
          
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              className="bg-white/30 hover:bg-white/40 text-white border-white/30"
              onClick={handleVendorMarketplaceClick}
            >
              <Store className="w-4 h-4 mr-2" />
              Vendor Marketplace
            </Button>
            
            <ProfileMenu userName={userName} partnerName={partnerName} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
