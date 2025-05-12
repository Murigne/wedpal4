import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Users, DollarSign } from 'lucide-react';

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
  
  // Card and button styling for each plan
  const getCardStyling = (index: number) => {
    const styles = [
      {
        bg: 'bg-gradient-to-b from-amber-50 to-yellow-100 border-yellow-200 border-2',
        button: 'bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-semibold',
        text: 'Recommended'
      },
      {
        bg: 'bg-gradient-to-b from-pink-50 to-rose-100 border-pink-200',
        button: 'bg-pink-400 hover:bg-pink-500 text-white rounded-full',
        text: 'Select Plan'
      },
      {
        bg: 'bg-gradient-to-b from-purple-50 to-violet-100 border-purple-200',
        button: 'bg-purple-400 hover:bg-purple-500 text-white rounded-full',
        text: 'Select Plan'
      },
      {
        bg: 'bg-gradient-to-b from-blue-50 to-sky-100 border-blue-200',
        button: 'bg-sky-400 hover:bg-sky-500 text-white rounded-full',
        text: 'Select Plan'
      }
    ];
    return styles[index % styles.length];
  };
  
  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          <CardTitle>Recommended Wedding Plans</CardTitle>
        </div>
        <CardDescription>
          Based on your budget range: {budgetRange}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {plans.map((plan, index) => {
            const styling = getCardStyling(index);
            return (
              <div
                key={index}
                className={`wedding-card flex flex-col h-full rounded-[1.5rem] shadow-md ${styling.bg}`}
              >
                {/* Header */}
                <div className="text-center px-4 pt-4 pb-2">
                  <h3 className="text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                    {plan.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 mb-4 max-w-[90%] mx-auto">
                    {plan.description}
                  </p>
                </div>
                
                {/* Stats Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-lg mx-auto px-4 p-4 mb-4 shadow-sm w-[90%]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs whitespace-nowrap font-medium">
                      <DollarSign className="h-4 w-4 text-pink-600" />
                      <span>Budget</span>
                    </div>
                    <span className="font-medium text-xs">{plan.price}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 my-3">
                    <div className="flex items-center gap-1.5 text-xs whitespace-nowrap font-medium">
                      <Clock className="h-4 w-4 text-pink-600" />
                      <span>Timeline</span>
                    </div>
                    <span className="font-medium text-xs">{plan.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs whitespace-nowrap font-medium">
                      <Users className="h-4 w-4 text-pink-600" />
                      <span>Guests</span>
                    </div>
                    <span className="font-medium text-xs">{plan.guests}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="text-left px-4 mb-4 flex-grow">
                  <h4 className="text-sm font-medium mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm flex items-start">
                        <span className="text-pink-600 mr-2 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Button */}
                <div className="mt-auto px-4 pb-4">
                  <Button className={`w-full ${styling.button} transition-all`}>
                    {styling.text}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendedWeddingPlans;