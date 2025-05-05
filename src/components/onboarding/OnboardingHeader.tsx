
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingHeaderProps {
  user: any;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-center text-foreground">
        Forever <span className="text-wedding-pink-dark">Together</span>
      </h1>
      
      {!user && (
        <Button onClick={handleLoginClick} variant="outline" size="sm" className="flex items-center gap-1">
          <User size={16} />
          Login
        </Button>
      )}
    </div>
  );
};

export default OnboardingHeader;
