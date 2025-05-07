
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WedPalLogo from '@/components/WedPalLogo';
import ProfileMenu from './ProfileMenu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardHeaderProps {
  userName: string;
  partnerName: string;
  onInvitePartner?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  partnerName,
  onInvitePartner
}) => {
  const navigate = useNavigate();
  const isPartnerConnected = !!partnerName && partnerName !== "Partner";

  const handleInvitePartnerClick = () => {
    if (onInvitePartner) {
      onInvitePartner();
    }
  };

  return (
    <header className="w-full backdrop-blur-sm bg-white/30 border-b border-white/20 py-4 sticky top-0 z-40">
      <div className="container mx-auto max-w-[1600px] px-2">
        <div className="flex items-center justify-between">
          <div className="flex justify-start pl-1">
            <WedPalLogo className="text-white text-2xl drop-shadow-lg mr-2" />
          </div>
          
          <div className="flex items-center gap-6">
            {isPartnerConnected ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9 border-2 border-white/50">
                        <AvatarFallback className="bg-wedding-pink text-white">
                          {partnerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">{partnerName}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your partner is connected</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button 
                variant="outline" 
                className="bg-white/30 hover:bg-white/40 text-white border-white/30"
                onClick={handleInvitePartnerClick}
              >
                <UserPlus className="w-4 h-4 mr-2" />
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
