
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeddingTimelineItemProps {
  title: string;
  description: string;
  date: string;
  completed?: boolean;
  className?: string;
}

const WeddingTimelineItem: React.FC<WeddingTimelineItemProps> = ({
  title,
  description,
  date,
  completed = false,
  className,
}) => {
  return (
    <div className={cn("relative pl-8 pb-6 last:pb-0 group", className)}>
      {/* Timeline line */}
      <div className="absolute left-3 top-1.5 bottom-0 w-0.5 bg-gray-200 group-last:hidden"></div>
      
      {/* Timeline dot */}
      <div className={cn(
        "absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center",
        completed ? "bg-wedding-pink text-white" : "bg-white border border-gray-300"
      )}>
        {completed && <CheckCircle2 className="w-4 h-4" />}
      </div>
      
      <div className={cn(
        "bg-white p-4 rounded-lg shadow-sm border border-gray-100",
        completed ? "border-l-4 border-l-wedding-pink" : ""
      )}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <span className="text-xs text-muted-foreground bg-gray-100 rounded-full px-2 py-0.5 whitespace-nowrap">
            {date}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default WeddingTimelineItem;
