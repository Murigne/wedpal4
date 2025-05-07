
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';

interface LastUpdateProps {
  lastUpdate: {
    user: string;
    action: string;
    timestamp: string;
    screen: string;
  };
}

const LastUpdateBanner: React.FC<LastUpdateProps> = ({ lastUpdate }) => {
  return (
    <Card className="border-wedding-pink/40 bg-wedding-pink/10 backdrop-blur-sm">
      <CardContent className="py-3 px-4">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-wedding-pink shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium">{lastUpdate.user}</span> {lastUpdate.action}
              <span className="text-muted-foreground"> ({lastUpdate.screen})</span>
            </p>
            <p className="text-xs text-muted-foreground">{lastUpdate.timestamp}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LastUpdateBanner;
