
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Clock } from 'lucide-react';
import WeddingPlanCard from '@/components/WeddingPlanCard';

interface RecommendedWeddingPlansProps {
  preferredBudget: string;
}

const RecommendedWeddingPlans: React.FC<RecommendedWeddingPlansProps> = ({ 
  preferredBudget 
}) => {
  const weddingPlans = [
    {
      title: "Classic Romance",
      description: "A timeless wedding theme",
      price: "$5k-15k",
      timeline: "3-6 months",
      guests: "50-100",
      features: [
        "Indoor ceremony",
        "Traditional decor",
        "Sit-down dinner"
      ],
      highlight: true
    },
    {
      title: "Intimate & Cozy",
      description: "Small and meaningful celebration",
      price: "$3k-8k",
      timeline: "2-4 months",
      guests: "20-50",
      features: [
        "Backyard setting",
        "Family-style dinner",
        "Personalized vows"
      ]
    },
    {
      title: "Royal Delight",
      description: "Luxurious and elegant affair",
      price: "$20k-40k",
      timeline: "6-12 months",
      guests: "100-200",
      features: [
        "Grand venue",
        "Premium catering",
        "Live orchestra"
      ]
    },
    {
      title: "Fairytale",
      description: "Magical and enchanting celebration",
      price: "$15k-30k",
      timeline: "6-9 months",
      guests: "75-150",
      features: [
        "Castle or garden venue",
        "Fairy lights",
        "Horse-drawn carriage",
        "Themed decor"
      ]
    }
  ];

  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          Recommended Wedding Plans
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on your budget range: {preferredBudget}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weddingPlans.map((plan, index) => (
            <WeddingPlanCard
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              timeline={plan.timeline}
              guests={plan.guests}
              features={plan.features}
              highlight={plan.title === "Classic Romance"}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedWeddingPlans;
