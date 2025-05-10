
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface WeddingProgressTrackerProps {
  tasks: Task[];
  className?: string;
}

const WeddingProgressTracker: React.FC<WeddingProgressTrackerProps> = ({
  tasks,
  className
}) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = tasks.length > 0 
    ? Math.round((completedTasks / tasks.length) * 100) 
    : 0;

  return (
    <Card className={cn("border-wedding-pink/20 min-h-[713px]", className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <CardTitle>Your Wedding Planning Progress</CardTitle>
            <CardDescription>Track your planning milestones</CardDescription>
          </div>
          <div className="text-right mt-2 sm:mt-0">
            <span className="text-2xl font-bold text-wedding-pink">{progressPercentage}%</span>
            <CardDescription>{completedTasks} of {tasks.length} tasks completed</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress 
          value={progressPercentage} 
          className="h-3 mb-6 bg-wedding-pink/20"
        />
        
        <div className="space-y-4 h-[536px] overflow-y-auto pr-2">
          {tasks.map(task => (
            <div 
              key={task.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg transition-colors",
                task.completed 
                  ? "bg-wedding-pink/10" 
                  : "bg-white/50 hover:bg-wedding-pink/5"
              )}
            >
              <div className="flex items-center gap-3 max-w-[75%]">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-wedding-pink flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className={cn(
                  "line-clamp-2 text-base",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </span>
              </div>
              {task.dueDate && (
                <span className="text-sm text-muted-foreground ml-2 flex-shrink-0">
                  {task.dueDate}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeddingProgressTracker;
