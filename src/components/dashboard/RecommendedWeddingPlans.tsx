
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';
import WeddingPlanCard from '@/components/WeddingPlanCard';

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
}

const RecommendedWeddingPlans: React.FC<RecommendedWeddingPlansProps> = ({ 
  weddingPlans, 
  preferredBudget 
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
