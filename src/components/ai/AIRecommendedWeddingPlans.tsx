
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Clock, Users } from 'lucide-react';

interface WeddingPlan {
  title: string;
  description: string;
  budget: string;
  timeframe: string;
  guestCount: string;
  features: string[];
  recommended?: boolean;
  color: string;
  buttonColor: string;
}

interface AIRecommendedWeddingPlansProps {
  budgetRange: string;
}

const AIRecommendedWeddingPlans: React.FC<AIRecommendedWeddingPlansProps> = ({ budgetRange }) => {
  const weddingPlans: WeddingPlan[] = [
    {
      title: "Classic Romance",
      description: "A timeless wedding theme",
      budget: "GHS 5k-15k",
      timeframe: "3-6 months",
      guestCount: "50-100",
      features: [
        "Indoor ceremony",
        "Traditional decor",
        "Sit-down dinner"
      ],
      recommended: true,
      color: "bg-yellow-50",
      buttonColor: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      title: "Intimate & Cozy",
      description: "Small and meaningful celebration",
      budget: "GHS 3k-8k",
      timeframe: "2-4 months",
      guestCount: "20-50",
      features: [
        "Backyard setting",
        "Family-style dinner",
        "Personalized vows"
      ],
      color: "bg-pink-50",
      buttonColor: "bg-pink-500 hover:bg-pink-600"
    },
    {
      title: "Royal Delight",
      description: "Luxurious and elegant affair",
      budget: "GHS 20k-40k",
      timeframe: "6-12 months",
      guestCount: "100-200",
      features: [
        "Grand venue",
        "Premium catering",
        "Live orchestra"
      ],
      color: "bg-purple-50",
      buttonColor: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Fairytale",
      description: "Magical and enchanting celebration",
      budget: "GHS 15k-30k",
      timeframe: "6-9 months",
      guestCount: "75-150",
      features: [
        "Castle or garden venue",
        "Fairy lights",
        "Horse-drawn carriage",
        "Themed decor"
      ],
      color: "bg-blue-50",
      buttonColor: "bg-blue-500 hover:bg-blue-600"
    }
  ];

  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          ❤️ Recommended Wedding Plans
        </CardTitle>
        <p className="text-sm text-gray-500">Based on your budget range: {budgetRange}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {weddingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`${plan.color} rounded-lg p-4 flex flex-col h-full border border-gray-100`}
            >
              <h3 className="text-lg font-semibold mb-1">{plan.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-medium">Budget:</span>
                  <span>{plan.budget}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Timeline:</span>
                  <span>{plan.timeframe}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Guests:</span>
                  <span>{plan.guestCount}</span>
                </div>
              </div>
              
              <div className="mt-2 mb-4 flex-grow">
                <p className="text-sm font-medium mb-2">What's included:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <button 
                className={`text-white py-2 px-4 rounded-md text-sm font-medium mt-auto ${plan.buttonColor}`}
              >
                {plan.recommended ? 'Recommended' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendedWeddingPlans;
