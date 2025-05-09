
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface UpcomingTasksProps {
  tasks: Task[];
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks }) => {
  // Filter incomplete tasks and take the first 3
  const upcomingTasks = tasks.filter(task => !task.completed).slice(0, 3);

  return (
    <Card className="border-wedding-pink/20 backdrop-blur-sm bg-white/90">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarCheck className="mr-2 h-5 w-5" />
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {upcomingTasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
              <span>{task.title}</span>
              <span className="text-sm text-muted-foreground">{task.dueDate}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
