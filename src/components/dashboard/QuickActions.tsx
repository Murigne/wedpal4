
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Users, Bot, DollarSign } from 'lucide-react';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  const handleChecklistClick = () => {
    navigate('/timeline');
  };
  
  const handleGuestsClick = () => {
    navigate('/guests');
  };
  
  const handleBudgetClick = () => {
    navigate('/budget');
  };
  
  const handleAIAssistantClick = () => {
    navigate('/ai-assistant');
  };

  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-28 bg-white/70 hover:bg-white/90"
          onClick={handleChecklistClick}
        >
          <CheckSquare className="h-7 w-7 mb-2" />
          <span className="text-sm">Checklist</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-28 bg-white/70 hover:bg-white/90"
          onClick={handleGuestsClick}
        >
          <Users className="h-7 w-7 mb-2" />
          <span className="text-sm">Guests</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-28 bg-white/70 hover:bg-white/90"
          onClick={handleBudgetClick}
        >
          <DollarSign className="h-7 w-7 mb-2" />
          <span className="text-sm">Budget</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-28 bg-white/70 hover:bg-white/90"
          onClick={handleAIAssistantClick}
        >
          <Bot className="h-7 w-7 mb-2" />
          <span className="text-sm">AI Naa</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
