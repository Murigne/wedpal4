
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  category?: 'venue' | 'vendors' | 'attire' | 'planning';
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
    
  const sortedItems = [...tasks].sort((a, b) => {
    // Sort by completed status first, then by due date if available
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Non-completed tasks first
    }
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    return 0;
  });
  
  const getCategoryColor = (category: string = 'planning') => {
    switch(category) {
      case 'venue': return 'bg-blue-100 text-blue-800';
      case 'vendors': return 'bg-purple-100 text-purple-800';
      case 'attire': return 'bg-pink-100 text-pink-800';
      case 'planning': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        
        {/* Task category breakdown */}
        <div className="pt-2 mb-6">
          <h4 className="text-sm font-medium mb-2">Task Categories</h4>
          <div className="space-y-3">
            {['venue', 'vendors', 'attire', 'planning'].map(category => {
              const categoryItems = tasks.filter(item => item.category === category);
              const categoryCompletedItems = categoryItems.filter(item => item.completed);
              const categoryPercentage = categoryItems.length > 0 
                ? Math.round((categoryCompletedItems.length / categoryItems.length) * 100) 
                : 0;
              
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{category}</span>
                    <span>{categoryCompletedItems.length}/{categoryItems.length}</span>
                  </div>
                  <Progress 
                    value={categoryPercentage} 
                    className="h-2" 
                    indicatorClassName={category === 'venue' ? 'bg-blue-500' : 
                                      category === 'vendors' ? 'bg-purple-500' :
                                      category === 'attire' ? 'bg-pink-500' : 'bg-green-500'}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Upcoming tasks */}
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Next tasks</h4>
          <div className="space-y-2">
            {sortedItems
              .filter(item => !item.completed)
              .slice(0, 3)
              .map(item => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-md text-sm">
                  <span className="truncate flex-1">{item.title}</span>
                  {item.dueDate && (
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {item.dueDate.includes('before') ? item.dueDate : format(new Date(item.dueDate), 'MMM d')}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
        
        <div className="h-[386px] overflow-y-auto pr-2 mt-6">
          {/* Empty space to maintain card height */}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeddingProgressTracker;
