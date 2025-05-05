
import React from 'react';
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
  user
}) => {
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
