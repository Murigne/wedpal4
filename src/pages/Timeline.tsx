
import React, { useState } from 'react';
import { Clock, Plus, Check, Calendar, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format, differenceInDays } from 'date-fns';
import PageLayout from '@/components/dashboard/PageLayout';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  category: 'venue' | 'vendors' | 'attire' | 'planning';
}

const Timeline = () => {
  const [weddingDate, setWeddingDate] = useState('2025-12-15');
  
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    { 
      id: '1', 
      title: 'Set your wedding date', 
      description: 'Choose the perfect day for your ceremony',
      dueDate: '2025-05-15', 
      completed: true,
      category: 'planning'
    },
    { 
      id: '2', 
      title: 'Book venue', 
      description: 'Secure your ceremony and reception locations',
      dueDate: '2025-06-30', 
      completed: false,
      category: 'venue'
    },
    { 
      id: '3', 
      title: 'Choose caterer', 
      description: 'Select menu and catering service',
      dueDate: '2025-07-30', 
      completed: false,
      category: 'vendors'
    },
    { 
      id: '4', 
      title: 'Book photographer', 
      description: 'Find someone to capture your special moments',
      dueDate: '2025-08-15', 
      completed: false,
      category: 'vendors'
    },
    { 
      id: '5', 
      title: 'Select attire', 
      description: 'Choose wedding dress, suits, and accessories',
      dueDate: '2025-09-30', 
      completed: false,
      category: 'attire'
    },
    { 
      id: '6', 
      title: 'Send invitations', 
      description: 'Finalize guest list and send out invites',
      dueDate: '2025-10-15', 
      completed: false,
      category: 'planning'
    },
  ]);

  const sortedItems = [...timelineItems].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const toggleCompleted = (itemId: string) => {
    setTimelineItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const formattedWeddingDate = format(new Date(weddingDate), 'MMMM d, yyyy');
  const daysUntilWedding = differenceInDays(new Date(weddingDate), new Date());

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'venue': return 'bg-blue-100 text-blue-800';
      case 'vendors': return 'bg-purple-100 text-purple-800';
      case 'attire': return 'bg-pink-100 text-pink-800';
      case 'planning': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout 
      title="Wedding Timeline" 
      description="Track your wedding planning progress"
      icon={<Clock className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wedding Countdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="p-6 bg-pink-50 rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-pink-500 mb-2" />
                <h3 className="text-xl font-semibold text-gray-900">{formattedWeddingDate}</h3>
                <div className="text-4xl font-bold text-pink-600 mt-2">{daysUntilWedding}</div>
                <p className="text-gray-600">days until your wedding</p>
              </div>
              
              <Button className="w-full">
                <Edit className="w-4 h-4 mr-2" />
                Edit Wedding Date
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-full border-8 border-pink-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-pink-500">
                    {Math.round((timelineItems.filter(item => item.completed).length / timelineItems.length) * 100)}%
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tasks completed</p>
                  <p className="font-medium">
                    {timelineItems.filter(item => item.completed).length} of {timelineItems.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Wedding Timeline</CardTitle>
                <CardDescription>
                  Your wedding planning schedule
                </CardDescription>
              </div>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 space-y-6">
                {/* Timeline line */}
                <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200" />
                
                {sortedItems.map((item, index) => (
                  <div key={item.id} className="relative">
                    {/* Timeline dot */}
                    <div 
                      className={`absolute -left-5 h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                        item.completed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      onClick={() => toggleCompleted(item.id)}
                    >
                      {item.completed && <Check className="h-3 w-3" />}
                    </div>
                    
                    <div className={`p-4 rounded-lg border ${
                      item.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.title}
                          </h3>
                          <p className={`text-sm ${item.completed ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.description}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(item.category)}`}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Due: {format(new Date(item.dueDate), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Timeline;
