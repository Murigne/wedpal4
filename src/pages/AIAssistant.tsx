import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Users, DollarSign, CheckCircle } from 'lucide-react';

interface WeddingPlan {
  title: string;
  description: string;
  price: string;
  timeline: string;
  guests: string;
  features: string[];
  highlight?: boolean;
}

interface AIRecommendedWeddingPlansProps {
  budgetRange: string;
  weddingPlans?: WeddingPlan[];
}

const AIRecommendedWeddingPlans: React.FC<AIRecommendedWeddingPlansProps> = ({ 
  budgetRange, 
  weddingPlans = [] 
}) => {
  // Default plans if none provided
  const defaultPlans: WeddingPlan[] = [
    {
      title: "Classic Romance",
      description: "A timeless wedding theme",
      price: "GHS 5k-15k",
      timeline: "3-6 months",
      guests: "50-100",
      features: ["Indoor ceremony", "Traditional decor", "Sit-down dinner"],
      highlight: true
    },
    {
      title: "Intimate & Cozy",
      description: "Small and meaningful celebration",
      price: "GHS 3k-8k",
      timeline: "2-4 months",
      guests: "20-50",
      features: ["Backyard setting", "Family-style dinner", "Personalized vows"],
    },
    {
      title: "Royal Delight",
      description: "Luxurious and elegant affair",
      price: "GHS 20k-40k",
      timeline: "6-12 months",
      guests: "100-200",
      features: ["Grand venue", "Premium catering", "Live orchestra"],
    },
    {
      title: "Fairytale",
      description: "Magical and enchanting celebration",
      price: "GHS 15k-30k",
      timeline: "6-9 months",
      guests: "75-150",
      features: ["Castle or garden venue", "Fairy lights", "Horse-drawn carriage", "Themed decor"],
    }
  ];
  
  const plans = weddingPlans.length > 0 ? weddingPlans : defaultPlans;
  
  const getButtonColor = (index: number) => {
    const colors = [
      'bg-yellow-500 hover:bg-yellow-600 text-black',
      'bg-pink-500 hover:bg-pink-600 text-white',
      'bg-purple-500 hover:bg-purple-600 text-white',
      'bg-blue-500 hover:bg-blue-600 text-white'
    ];
    return colors[index % colors.length];
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          <CardTitle>Recommended Wedding Plans</CardTitle>
        </div>
        <CardDescription>
          Based on your budget range: {budgetRange}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.highlight ? 'ring-2 ring-yellow-400' : ''}`}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{plan.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Budget:</span>
                    <span>{plan.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Timeline:</span>
                    <span>{plan.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Guests:</span>
                    <span>{plan.guests}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">What's included:</h4>
                  <ul className="space-y-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className={`w-full ${getButtonColor(index)} ${plan.highlight ? 'font-semibold' : ''}`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.highlight ? 'Recommended' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendedWeddingPlans;