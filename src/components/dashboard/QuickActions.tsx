
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Users, DollarSign } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import ThemeColorSelector from './ThemeColorSelector';

interface QuickActionsProps {
  weddingColors?: string[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ weddingColors }) => {
  const navigate = useNavigate();
  const { setThemeColors } = useTheme();
  
  const handleChecklistClick = () => {
    navigate('/timeline');
  };
  
  const handleGuestsClick = () => {
    navigate('/guests');
  };
  
  const handleBudgetClick = () => {
    navigate('/budget');
  };
  
  const handleThemeColorChange = (colors: [string, string]) => {
    setThemeColors(colors);
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
          onClick={handleChecklistClick}
        >
          <CheckSquare className="h-6 w-6 mb-1" />
          <span className="text-xs">Checklist</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90"
          onClick={handleGuestsClick}
        >
          <Users className="h-6 w-6 mb-1" />
          <span className="text-xs">Guests</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90"
          onClick={handleBudgetClick}
        >
          <DollarSign className="h-6 w-6 mb-1" />
          <span className="text-xs">Budget</span>
        </Button>
        
        <ThemeColorSelector 
          weddingColors={weddingColors} 
          onColorChange={handleThemeColorChange} 
        />
      </CardContent>
    </Card>
  );
};

export default QuickActions;
