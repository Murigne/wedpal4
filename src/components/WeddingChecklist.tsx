
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Plus, Check, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface WeddingChecklistProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  weddingColors: string[];
}

const WeddingChecklist: React.FC<WeddingChecklistProps> = ({
  tasks,
  setTasks,
  weddingColors
}) => {
  const handleToggleTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    
    const taskTitle = tasks.find(task => task.id === taskId)?.title;
    
    toast({
      title: tasks.find(task => task.id === taskId)?.completed 
        ? "Task Marked Incomplete" 
        : "Task Completed",
      description: taskTitle,
    });
  };
  
  const completedCount = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedCount / tasks.length) * 100;
  
  // Group tasks by completion status
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <CheckSquare className="mr-2 h-5 w-5 text-wedding-pink" />
          Wedding Checklist
        </h2>
        
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{width: `${progressPercentage}%`, backgroundColor: weddingColors[0]}}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{completedCount} completed</span>
          <span>{tasks.length - completedCount} remaining</span>
        </div>
      </div>
      
      {/* Task categories */}
      <div className="mb-4 overflow-x-auto whitespace-nowrap py-1">
        <Badge variant="secondary" className="mr-2 cursor-pointer bg-wedding-pink text-white">All</Badge>
        <Badge variant="outline" className="mr-2 cursor-pointer">Venues</Badge>
        <Badge variant="outline" className="mr-2 cursor-pointer">Vendors</Badge>
        <Badge variant="outline" className="mr-2 cursor-pointer">Attire</Badge>
        <Badge variant="outline" className="mr-2 cursor-pointer">Guests</Badge>
        <Badge variant="outline" className="cursor-pointer">Details</Badge>
      </div>
      
      {/* Tasks list - Pending */}
      <div className="space-y-2 mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Tasks To Complete</h3>
        
        {pendingTasks.map(task => (
          <div 
            key={task.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center">
              <button 
                className="w-5 h-5 border border-gray-300 rounded-full mr-3 flex-shrink-0 hover:bg-gray-100 transition-colors"
                onClick={() => handleToggleTask(task.id)}
                aria-label="Mark task as complete"
              />
              <div>
                <p className="font-medium">{task.title}</p>
                {task.dueDate && <p className="text-xs text-muted-foreground">{task.dueDate}</p>}
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => {
                setTasks(tasks.filter(t => t.id !== task.id));
                toast({
                  title: "Task Removed",
                  description: task.title,
                });
              }}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ))}
        
        {pendingTasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">All tasks completed! 🎉</p>
          </div>
        )}
      </div>
      
      {/* Tasks list - Completed */}
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Completed Tasks</h3>
          
          {completedTasks.map(task => (
            <div 
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="flex items-center">
                <button 
                  className="w-5 h-5 bg-wedding-pink rounded-full mr-3 flex items-center justify-center flex-shrink-0"
                  onClick={() => handleToggleTask(task.id)}
                  aria-label="Mark task as incomplete"
                >
                  <Check className="h-3 w-3 text-white" />
                </button>
                <div>
                  <p className="font-medium line-through text-muted-foreground">{task.title}</p>
                  {task.dueDate && <p className="text-xs text-muted-foreground line-through">{task.dueDate}</p>}
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => {
                  setTasks(tasks.filter(t => t.id !== task.id));
                  toast({
                    title: "Task Removed",
                    description: task.title,
                  });
                }}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default WeddingChecklist;
