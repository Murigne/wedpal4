
import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, DollarSign, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeddingPlanProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  timeline: string;
  guests: string;
  highlight?: boolean;
  className?: string;
}

const WeddingPlanCard: React.FC<WeddingPlanProps> = ({
  title,
  description,
  price,
  features,
  timeline,
  guests,
  highlight = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "wedding-card flex flex-col h-full",
        highlight ? "border-wedding-gold border-2 shadow-lg" : "",
        className
      )}
    >
      {highlight && (
        <div className="bg-wedding-gold text-foreground text-sm font-medium py-1 px-4 rounded-full mx-auto -mt-4 mb-2">
          Recommended
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <div className="bg-white/50 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-wedding-pink-dark" />
            Budget
          </span>
          <span className="font-medium">{price}</span>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-wedding-pink-dark" />
            Timeline
          </span>
          <span className="font-medium">{timeline}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4 text-wedding-pink-dark" />
            Guests
          </span>
          <span className="font-medium">{guests}</span>
        </div>
      </div>
      
      <div className="text-left mb-4 flex-grow">
        <h4 className="text-sm font-medium mb-2">What's included:</h4>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="text-wedding-pink mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto">
        <Button className={highlight ? "wedding-button-accent w-full" : "wedding-button w-full"}>
          Select Plan
        </Button>
      </div>
    </div>
  );
};

export default WeddingPlanCard;
