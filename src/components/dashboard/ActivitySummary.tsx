
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, ClipboardList } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

// Sample user activities data - in a real app, this would come from a database
const sampleActivities = [
  {
    id: 1,
    user: "Alex",
    action: "Added new guest 'Jamie Smith' to guest list",
    timestamp: "Today, 3:45 PM",
    screen: "Guests"
  },
  {
    id: 2,
    user: "Taylor",
    action: "Updated budget for catering from $5,000 to $6,500",
    timestamp: "Today, 11:23 AM",
    screen: "Budget"
  },
  {
    id: 3,
    user: "Alex",
    action: "Created timeline event 'Venue Walkthrough'",
    timestamp: "Yesterday, 5:12 PM",
    screen: "Timeline"
  },
  {
    id: 4,
    user: "Taylor",
    action: "Added 'Kitchen Appliances' to gift registry",
    timestamp: "Yesterday, 2:30 PM",
    screen: "Gifts"
  },
  {
    id: 5,
    user: "Alex",
    action: "Asked Naa AI about 'floral arrangements'",
    timestamp: "3 days ago",
    screen: "AI Assistant"
  },
  {
    id: 6,
    user: "Taylor",
    action: "Added 'Elegant Gardens' to vendor shortlist",
    timestamp: "4 days ago",
    screen: "Vendors"
  }
];

interface ActivitySummaryProps {
  weddingPlans: any[];
  preferredBudget: string;
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ 
  weddingPlans,
  preferredBudget
}) => {
  const { user } = useAuth();
  
  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Wedding Planning Activities
        </CardTitle>
        <CardDescription>
          Recent activities by you and your partner
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sampleActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-sm">{activity.user}</span>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
              <p className="text-sm">{activity.action}</p>
              <div className="flex items-center mt-2">
                <ClipboardList className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{activity.screen}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySummary;
