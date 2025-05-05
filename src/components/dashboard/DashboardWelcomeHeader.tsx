
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateDaysUntil } from '@/utils/dateUtils';

interface DashboardWelcomeHeaderProps {
  userName: string;
  partnerName: string;
  weddingDate: string;
  formattedWeddingDate: string;
  weddingHashtag: string;
  user: any;
  onInvitePartner: () => void;
}

const DashboardWelcomeHeader: React.FC<DashboardWelcomeHeaderProps> = ({
  userName,
  partnerName,
  weddingDate,
  formattedWeddingDate,
  weddingHashtag,
  user,
  onInvitePartner
}) => {
  const navigate = useNavigate();

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
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">
        Welcome back, {userName} & {partnerName}!
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-white/80 w-full">
        <p>
          Your wedding date: <span className="font-medium">{formattedWeddingDate || weddingDate}</span>
          {weddingDate && <span> · Only {calculateDaysUntil(weddingDate)} days to go!</span>}
        </p>
        
        {/* Action buttons for non-logged in users */}
        {!user && (
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            <Button 
              onClick={handleSignUpClick}
              className="bg-white text-wedding-pink-dark hover:bg-white/90 flex items-center gap-2"
            >
              <UserRound size={18} />
              Sign up to save your progress
            </Button>
            <Button 
              onClick={onInvitePartner}
              variant="outline" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 flex items-center gap-2"
            >
              <Mail size={18} />
              Invite your partner
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
