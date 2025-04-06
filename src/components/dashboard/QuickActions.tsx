
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Users, Calendar, Palette } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90">
          <CheckSquare className="h-6 w-6 mb-1" />
          <span className="text-xs">Checklist</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90">
          <Users className="h-6 w-6 mb-1" />
          <span className="text-xs">Guests</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90">
          <Calendar className="h-6 w-6 mb-1" />
          <span className="text-xs">Schedule</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center justify-center h-20 bg-white/70 hover:bg-white/90">
          <Palette className="h-6 w-6 mb-1" />
          <span className="text-xs">Theme</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
