
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Users, Calendar, Palette, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleChecklistClick = () => {
    navigate('/checklist');
  };
  
  const handleGuestsClick = () => {
    navigate('/guests');
  };
  
  const handleScheduleClick = () => {
    navigate('/schedule');
  };
  
  const handleThemeClick = () => {
    navigate('/theme');
  };
  
  const handleNotImplemented = (feature: string) => {
    toast({
      title: "Coming Soon!",
      description: `The ${feature} feature is being implemented. Check back soon!`,
      variant: "default",
    });
  };

  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90"
          onClick={() => handleNotImplemented('Checklist')}
        >
          <CheckSquare className="h-6 w-6 mb-1" />
          <span className="text-xs">Checklist</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90"
          onClick={() => handleNotImplemented('Guest List')}
        >
          <Users className="h-6 w-6 mb-1" />
          <span className="text-xs">Guests</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90"
          onClick={() => handleNotImplemented('Schedule')}
        >
          <Calendar className="h-6 w-6 mb-1" />
          <span className="text-xs">Schedule</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90"
          onClick={() => handleNotImplemented('Theme')}
        >
          <Palette className="h-6 w-6 mb-1" />
          <span className="text-xs">Theme</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
