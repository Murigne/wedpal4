
import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, DollarSign, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

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
  const handleSelectPlan = () => {
    toast({
      title: "Plan Selected",
      description: `You've selected the ${title} plan.`,
    });
  };

  // Determine card background and accent colors based on the plan type
  const cardColors = {
    "Intimate Celebration": "from-pink-50 to-rose-100",
    "Classic Romance": "from-amber-50 to-yellow-100",
    "Luxury Experience": "from-purple-50 to-violet-100",
    "Destination Wedding": "from-blue-50 to-sky-100"
  };
  
  // Get background gradient based on title or use a default
  const cardGradient = cardColors[title as keyof typeof cardColors] || "from-pink-50 to-rose-100";

  return (
    <div
      className={cn(
        "wedding-card flex flex-col h-full rounded-[1.5rem] shadow-md",
        `bg-gradient-to-b ${cardGradient}`,
        highlight ? "border-wedding-gold border-2 shadow-lg" : "border border-white/60",
        className
      )}
    >
      {highlight && (
        <div className="bg-wedding-gold text-foreground text-xs font-medium py-1.5 px-4 rounded-full mx-auto -mt-3 mb-1 shadow-sm">
          Recommended
        </div>
      )}
      
      <div className="text-center px-4 pt-4 pb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1 mb-4 max-w-[90%] mx-auto">{description}</p>
      </div>
      
      <div className="bg-white/70 backdrop-blur-sm rounded-lg mx-4 p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <DollarSign className="h-4 w-4 text-pink-600" />
            Budget
          </span>
          <span className="font-medium text-sm">{price}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Clock className="h-4 w-4 text-pink-600" />
            Timeline
          </span>
          <span className="font-medium text-sm">{timeline}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Users className="h-4 w-4 text-pink-600" />
            Guests
          </span>
          <span className="font-medium text-sm">{guests}</span>
        </div>
      </div>
      
      <div className="text-center px-4 mb-4 flex-grow">
        <h4 className="text-sm font-medium mb-3">What's included:</h4>
        <ul className="space-y-2 flex flex-col items-center">
          {features.map((feature, index) => (
            <li key={index} className="text-sm flex items-start justify-center max-w-[90%]">
              <span className="text-pink-600 mr-2 flex-shrink-0">•</span>
              <span className="text-center">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto px-4 pb-4">
        <Button 
          className={cn(
            "w-full rounded-full transition-all",
            highlight 
              ? "bg-wedding-gold hover:bg-wedding-gold/90 text-black font-medium" 
              : title === "Intimate Celebration" 
                ? "bg-pink-400 hover:bg-pink-500 text-white"
                : title === "Luxury Experience"
                  ? "bg-purple-400 hover:bg-purple-500 text-white"
                  : title === "Destination Wedding"
                    ? "bg-sky-400 hover:bg-sky-500 text-white"
                    : "bg-pink-500 hover:bg-pink-600 text-white"
          )}
          onClick={handleSelectPlan}
        >
          Select Plan
        </Button>
      </div>
    </div>
  );
};

export default WeddingPlanCard;
