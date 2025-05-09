
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatOnboardingHeaderProps {
  handleLoginClick: () => void;
}

const ChatOnboardingHeader: React.FC<ChatOnboardingHeaderProps> = ({ handleLoginClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-center text-foreground">
        Forever <span className="text-wedding-pink-dark">Together</span>
      </h1>
      
      <Button onClick={handleLoginClick} variant="outline" size="sm" className="flex items-center gap-1">
        <User size={16} />
        Login
      </Button>
    </div>
  );
};

export default ChatOnboardingHeader;
