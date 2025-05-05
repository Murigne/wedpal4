
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WedPalLogo from '@/components/WedPalLogo';
import ProfileMenu from './ProfileMenu';
import { useAuth } from '@/components/AuthProvider';

interface DashboardHeaderProps {
  userName: string;
  partnerName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, partnerName }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleInvitePartner = () => {
    // This should open the invite partner dialog
    // We'll need to lift this state up to the Dashboard component
    const event = new CustomEvent('open-invite-partner-dialog');
    document.dispatchEvent(event);
  };

  return (
    <header className="w-full backdrop-blur-sm bg-white/30 border-b border-white/20 py-4">
      <div className="container mx-auto max-w-[1600px] px-2">
        <div className="flex items-center justify-between">
          <div className="flex justify-start pl-1">
            <WedPalLogo className="text-white text-2xl drop-shadow-lg mr-2" />
          </div>
          
          <div className="flex items-center gap-6">
            {!user && (
              <Button 
                variant="outline" 
                className="bg-white/30 hover:bg-white/40 text-white border-white/30"
                onClick={handleInvitePartner}
              >
                <Mail className="w-4 h-4 mr-2" />
                Invite your partner
              </Button>
            )}
            
            <ProfileMenu userName={userName} partnerName={partnerName} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
