
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';
import WeddingPlanCard from '@/components/WeddingPlanCard';
import { cn } from '@/lib/utils';

interface WeddingPlan {
  title: string;
  description: string;
  price: string;
  timeline: string;
  guests: string;
  features: string[];
  highlight?: boolean;
}

interface RecommendedWeddingPlansProps {
  weddingPlans: WeddingPlan[];
  preferredBudget: string;
  sidebarExpanded?: boolean;
}

const RecommendedWeddingPlans: React.FC<RecommendedWeddingPlansProps> = ({ 
  weddingPlans, 
  preferredBudget,
  sidebarExpanded = false
}) => {
  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <HeartHandshake className="mr-2 h-5 w-5" />
          Recommended Wedding Plans
        </CardTitle>
        <CardDescription>
          Based on your budget range: {preferredBudget}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "grid gap-6",
          sidebarExpanded 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {weddingPlans.map((plan, index) => (
            <WeddingPlanCard
              key={index}
              {...plan}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedWeddingPlans;
