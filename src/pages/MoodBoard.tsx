
import React, { useState } from 'react';
import { Image, Upload, Heart, Plus, X, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/dashboard/PageLayout';

interface MoodBoardItem {
  id: string;
  type: 'image' | 'memory' | 'love-note';
  content: string;
  image?: string;
  title?: string;
  date?: string;
}

const MoodBoard = () => {
  const [moodBoardItems, setMoodBoardItems] = useState<MoodBoardItem[]>([
    {
      id: '1',
      type: 'image',
      content: 'Our first vacation together',
      image: 'https://placehold.co/600x400',
    },
    {
      id: '2',
      type: 'memory',
      content: 'I'll never forget our first date at that small café by the beach. The way you laughed when I spilled coffee all over myself, instead of being embarrassed, made me realize how comfortable I felt with you.',
      title: 'Our First Date',
      date: '2023-06-15',
    },
    {
      id: '3',
      type: 'love-note',
      content: 'Your kindness and compassion for others always inspires me to be a better person. I love how you see the best in everyone and everything.',
      title: 'What I Love About You',
    },
    {
      id: '4',
      type: 'image',
      content: 'The day we got engaged',
      image: 'https://placehold.co/600x400',
    },
  ]);

  // This would be implemented with actual file upload in a real app
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Image upload would happen here');
  };

  const [showAddMemoryForm, setShowAddMemoryForm] = useState(false);
  const [newMemory, setNewMemory] = useState({
    title: '',
    date: '',
    content: ''
  });

  const addMemory = () => {
    if (newMemory.title && newMemory.content) {
      setMoodBoardItems([
        ...moodBoardItems,
        {
          id: `memory-${Date.now()}`,
          type: 'memory',
          content: newMemory.content,
          title: newMemory.title,
          date: newMemory.date,
        }
      ]);
      setNewMemory({ title: '', date: '', content: '' });
      setShowAddMemoryForm(false);
    }
  };

  return (
    <PageLayout 
      title="Mood Board" 
      description="Capture your favorite memories and moments together"
      icon={<Image className="w-8 h-8" />}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <Card className="w-full md:w-auto">
            <CardHeader>
              <CardTitle>Add to Your Mood Board</CardTitle>
              <CardDescription>
                Share memories, moments, and what you love about each other
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 flex-wrap">
              <Button className="flex-1" onClick={() => {}}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <Button className="flex-1" variant="outline" onClick={() => setShowAddMemoryForm(true)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Memory
              </Button>
              <Button className="flex-1" variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Love Note
              </Button>
              
              {showAddMemoryForm && (
                <Card className="w-full mt-4">
                  <CardHeader>
                    <CardTitle>Add a Memory</CardTitle>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="absolute top-2 right-2"
                      onClick={() => setShowAddMemoryForm(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <Input 
                        placeholder="Our First Date" 
                        value={newMemory.title}
                        onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date (Optional)</label>
                      <Input 
                        type="date" 
                        value={newMemory.date}
                        onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Memory</label>
                      <Textarea 
                        placeholder="Write your memory here..." 
                        className="min-h-[100px]"
                        value={newMemory.content}
                        onChange={(e) => setNewMemory({...newMemory, content: e.target.value})}
                      />
                    </div>
                    <Button onClick={addMemory}>Add Memory</Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moodBoardItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              {item.type === 'image' && item.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img src={item.image} alt={item.content} className="object-cover w-full h-full" />
                </div>
              )}
              <CardContent className={`p-4 ${item.type !== 'image' ? 'pt-6' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  {item.title && <h3 className="font-medium">{item.title}</h3>}
                  <Badge variant="outline" className={
                    item.type === 'memory' ? 'bg-blue-100 text-blue-800' :
                    item.type === 'love-note' ? 'bg-pink-100 text-pink-800' :
                    'bg-purple-100 text-purple-800'
                  }>
                    {item.type === 'memory' ? 'Memory' : 
                     item.type === 'love-note' ? 'Love Note' : 'Photo'}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mt-2">{item.content}</p>
                
                {item.date && (
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end p-4 pt-0">
                <Button size="sm" variant="ghost">
                  <Heart className="w-4 h-4 mr-2" />
                  Love
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          <Card className="border-dashed flex flex-col items-center justify-center p-8 h-full min-h-[200px]">
            <Plus className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">Add more to your mood board</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">Photo</Button>
              <Button size="sm" variant="outline">Memory</Button>
              <Button size="sm" variant="outline">Love Note</Button>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default MoodBoard;
