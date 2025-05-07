
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateDaysUntil } from '@/utils/dateUtils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DashboardWelcomeHeaderProps {
  userName: string;
  partnerName: string;
  weddingDate: string;
  formattedWeddingDate: string;
  weddingHashtag: string;
  user: any;
  onInvitePartner: () => void;
  partnerActiveScreen?: string;
}

const DashboardWelcomeHeader: React.FC<DashboardWelcomeHeaderProps> = ({
  userName,
  partnerName,
  weddingDate,
  formattedWeddingDate,
  weddingHashtag,
  user,
  onInvitePartner,
  partnerActiveScreen
}) => {
  const navigate = useNavigate();
  const isPartnerConnected = !!partnerName && partnerName !== "Partner";

  const handleSignUpClick = () => {
    navigate('/signup', { 
      state: { 
        formData: {
          partner1Name: userName,
          partner2Name: partnerName,
          weddingDate: weddingDate
        }
      } 
    });
  };

  return (
    <div className="mb-8 text-white max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          Welcome back, {userName} & {partnerName}!
        </h1>
        
        {partnerActiveScreen && isPartnerConnected && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                  <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-wedding-pink text-white text-xs">
                      {partnerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{partnerName} is viewing {partnerActiveScreen}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your partner is currently active</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white/80 w-full">
        <p>
          Your wedding date: <span className="font-medium">{formattedWeddingDate || weddingDate}</span>
          {weddingDate && <span> · Only {calculateDaysUntil(weddingDate)} days to go!</span>}
        </p>
        
        {/* Action button for non-logged in users - remove duplicate button */}
        {!user && (
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            <Button 
              onClick={handleSignUpClick}
              variant="outline" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 flex items-center gap-2"
            >
              <UserRound size={18} />
              Sign up to save your progress
            </Button>
          </div>
        )}
      </div>
      
      {weddingHashtag && (
        <p className="sm:ml-4 mt-3">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white font-medium">
            {weddingHashtag}
          </span>
        </p>
      )}
    </div>
  );
};

export default DashboardWelcomeHeader;
