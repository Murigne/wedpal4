
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface TimelineItemProps {
  title: string;
  description: string;
  date: string;
  completed?: boolean;
  className?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  date,
  completed = false,
  className,
}) => {
  return (
    <div className={cn("relative pl-8 pb-8 group", className)}>
      {/* Timeline line */}
      <div className="absolute left-2 top-1 bottom-0 w-0.5 bg-wedding-pink/30 group-last:hidden"></div>
      
      {/* Timeline dot */}
      <div className={cn(
        "absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-wedding-pink",
        completed ? "bg-wedding-pink" : "bg-white"
      )}>
        {completed && <CheckCircle className="w-3 h-3 text-white absolute -top-1.5 -left-1.5" />}
      </div>
      
      <div className="wedding-card">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-foreground">{title}</h4>
          <span className="text-xs text-muted-foreground bg-wedding-lavender/30 rounded-full px-2 py-0.5">
            {date}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
