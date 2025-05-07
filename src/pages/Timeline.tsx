import React, { useState } from 'react';
import { Clock, Plus, Check, Calendar, Edit, Trash2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format, differenceInDays, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/dashboard/PageLayout';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  category: 'venue' | 'vendors' | 'attire' | 'planning';
}

const Timeline = () => {
  const { toast } = useToast();
  const [weddingDate, setWeddingDate] = useState('2025-12-15');
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempWeddingDate, setTempWeddingDate] = useState(weddingDate);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(weddingDate));
  
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

  const [newTask, setNewTask] = useState<Omit<TimelineItem, 'id' | 'completed'>>({
    title: '',
    description: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    category: 'planning'
  });

  const sortedItems = [...timelineItems].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const toggleCompleted = (itemId: string) => {
    setTimelineItems(items => {
      const updatedItems = items.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      
      const task = items.find(item => item.id === itemId);
      if (task) {
        toast({
          title: task.completed ? "Task unmarked" : "Task completed",
          description: task.completed 
            ? `"${task.title}" has been marked as incomplete.` 
            : `"${task.title}" has been marked as completed!`
        });
      }
      
      return updatedItems;
    });
  };

  const handleEditWeddingDate = () => {
    if (isEditingDate) {
      try {
        if (selectedDate) {
          const formattedDate = format(selectedDate, 'yyyy-MM-dd');
          setWeddingDate(formattedDate);
          setTempWeddingDate(formattedDate);
          setIsEditingDate(false);
          toast({
            title: "Wedding date updated",
            description: `Your wedding date has been set to ${format(selectedDate, 'MMMM d, yyyy')}`
          });
        } else {
          toast({
            title: "Invalid date",
            description: "Please select a valid date"
          });
        }
      } catch (error) {
        toast({
          title: "Invalid date",
          description: "Please select a valid date"
        });
      }
    } else {
      setIsEditingDate(true);
    }
  };

  const handleAddTask = () => {
    if (newTask.title.trim() === '') {
      toast({
        title: "Task title required",
        description: "Please enter a title for the task"
      });
      return;
    }
    
    const newTaskItem: TimelineItem = {
      ...newTask,
      id: Date.now().toString(),
      completed: false
    };
    
    setTimelineItems([...timelineItems, newTaskItem]);
    setIsAddTaskDialogOpen(false);
    
    // Reset form fields
    setNewTask({
      title: '',
      description: '',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      category: 'planning'
    });
    
    toast({
      title: "Task added",
      description: `"${newTask.title}" has been added to your timeline`
    });
  };

  const deleteTask = (id: string) => {
    const task = timelineItems.find(item => item.id === id);
    if (task) {
      setTimelineItems(timelineItems.filter(item => item.id !== id));
      toast({
        title: "Task deleted",
        description: `"${task.title}" has been removed from your timeline`
      });
    }
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

  const completedPercentage = Math.round((timelineItems.filter(item => item.completed).length / timelineItems.length) * 100);

  return (
    <PageLayout 
      title="Wedding Timeline" 
      description="Track your wedding planning progress"
      icon={<Clock className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
        <div className="md:col-span-4 space-y-6 flex flex-col h-full">
          <Card>
            <CardHeader>
              <CardTitle>Wedding Countdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="p-6 bg-pink-50 rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-pink-500 mb-2" />
                {isEditingDate ? (
                  <div className="space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto" align="center">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900">{formattedWeddingDate}</h3>
                    <div className="text-4xl font-bold text-pink-600 mt-2">{daysUntilWedding}</div>
                    <p className="text-gray-600">days until your wedding</p>
                  </>
                )}
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleEditWeddingDate}
              >
                {isEditingDate ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Wedding Date
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Wedding Date
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card className="h-[calc(100vh-430px)]">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100vh-400px)]">
              <div className="flex flex-col items-center h-full">
                <div className="h-56 w-56 rounded-full border-16 border-pink-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="h-48 w-48 rounded-full bg-white"
                      style={{
                        background: `conic-gradient(#ec4899 ${completedPercentage}%, #f3f4f6 0)`
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-36 w-36 rounded-full bg-white flex items-center justify-center">
                        <span className="text-4xl font-bold text-pink-500">
                          {completedPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">Tasks completed</p>
                  <p className="font-medium text-lg">
                    {timelineItems.filter(item => item.completed).length} of {timelineItems.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card className="h-[calc(100vh-180px)] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Wedding Timeline</CardTitle>
                <CardDescription>
                  Your wedding planning schedule
                </CardDescription>
              </div>
              <Button size="sm" onClick={() => setIsAddTaskDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-320px)]">
                <div className="relative pl-8 space-y-6">
                  {/* Timeline line */}
                  <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200" />
                  
                  {sortedItems.map((item) => (
                    <div key={item.id} className="relative">
                      {/* Timeline dot */}
                      <div 
                        className={`absolute -left-5 h-6 w-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
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
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(item.category)}`}>
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                            <Button variant="ghost" size="icon" onClick={() => deleteTask(item.id)} className="h-6 w-6 text-red-500">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Due: {format(new Date(item.dueDate), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Task Title</label>
              <Input 
                placeholder="Enter task title" 
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                placeholder="Enter task description" 
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <Input 
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select 
                  value={newTask.category} 
                  onValueChange={(value: 'venue' | 'vendors' | 'attire' | 'planning') => 
                    setNewTask({...newTask, category: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="venue">Venue</SelectItem>
                    <SelectItem value="vendors">Vendors</SelectItem>
                    <SelectItem value="attire">Attire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddTask}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Timeline;
