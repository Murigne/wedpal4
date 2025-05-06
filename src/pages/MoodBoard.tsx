
import React, { useState } from 'react';
import { Image, Upload, Heart, Plus, X, MessageSquare, Edit, Trash2, StickyNote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/dashboard/PageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface MoodBoardItem {
  id: string;
  type: 'image' | 'memory' | 'love-note';
  content: string;
  image?: string;
  title?: string;
  date?: string;
  color?: string;
  position?: { x: number; y: number };
}

const stickyNoteColors = [
  { value: 'yellow', class: 'bg-yellow-100' },
  { value: 'green', class: 'bg-green-100' },
  { value: 'blue', class: 'bg-blue-100' },
  { value: 'pink', class: 'bg-pink-100' },
  { value: 'purple', class: 'bg-purple-100' },
];

const MoodBoard = () => {
  const { toast } = useToast();
  const [moodBoardItems, setMoodBoardItems] = useState<MoodBoardItem[]>([
    {
      id: '1',
      type: 'image',
      content: 'Our first vacation together',
      image: 'https://placehold.co/600x400',
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      type: 'memory',
      content: "I'll never forget our first date at that small café by the beach. The way you laughed when I spilled coffee all over myself, instead of being embarrassed, made me realize how comfortable I felt with you.",
      title: 'Our First Date',
      date: '2023-06-15',
      color: 'yellow',
      position: { x: 350, y: 50 }
    },
    {
      id: '3',
      type: 'love-note',
      content: "Your kindness and compassion for others always inspires me to be a better person. I love how you see the best in everyone and everything.",
      title: 'What I Love About You',
      color: 'pink',
      position: { x: 700, y: 100 }
    },
    {
      id: '4',
      type: 'image',
      content: 'The day we got engaged',
      image: 'https://placehold.co/600x400',
      position: { x: 0, y: 450 }
    },
  ]);

  // Dialog states
  const [showAddMemoryForm, setShowAddMemoryForm] = useState(false);
  const [showAddLoveNoteForm, setShowAddLoveNoteForm] = useState(false);
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  
  // Form states
  const [newMemory, setNewMemory] = useState({
    title: '',
    date: '',
    content: '',
    color: 'yellow'
  });
  
  const [newLoveNote, setNewLoveNote] = useState({
    title: '',
    content: '',
    color: 'pink'
  });
  
  const [newPhoto, setNewPhoto] = useState({
    content: '',
    image: ''
  });

  // FAB state
  const [isFabOpen, setIsFabOpen] = useState(false);

  // File input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
          color: newMemory.color,
          position: { x: Math.random() * 300, y: Math.random() * 300 }
        }
      ]);
      setNewMemory({ title: '', date: '', content: '', color: 'yellow' });
      setShowAddMemoryForm(false);
      toast({
        title: "Memory added",
        description: "Your memory has been added to the mood board"
      });
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in the title and content"
      });
    }
  };

  const addLoveNote = () => {
    if (newLoveNote.title && newLoveNote.content) {
      setMoodBoardItems([
        ...moodBoardItems,
        {
          id: `love-note-${Date.now()}`,
          type: 'love-note',
          content: newLoveNote.content,
          title: newLoveNote.title,
          color: newLoveNote.color,
          position: { x: Math.random() * 300, y: Math.random() * 300 }
        }
      ]);
      setNewLoveNote({ title: '', content: '', color: 'pink' });
      setShowAddLoveNoteForm(false);
      toast({
        title: "Love note added",
        description: "Your love note has been added to the mood board"
      });
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in the title and content"
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this file to a server
      // Here we'll just create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setNewPhoto({ ...newPhoto, image: imageUrl });
    }
  };

  const addPhoto = () => {
    if (newPhoto.image && newPhoto.content) {
      setMoodBoardItems([
        ...moodBoardItems,
        {
          id: `image-${Date.now()}`,
          type: 'image',
          content: newPhoto.content,
          image: newPhoto.image,
          position: { x: Math.random() * 300, y: Math.random() * 300 }
        }
      ]);
      setNewPhoto({ content: '', image: '' });
      setShowAddPhotoForm(false);
      toast({
        title: "Photo added",
        description: "Your photo has been added to the mood board"
      });
    } else {
      toast({
        title: "Missing information",
        description: "Please select an image and add a caption"
      });
    }
  };

  const deleteItem = (id: string) => {
    setMoodBoardItems(moodBoardItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your mood board"
    });
  };

  const handleDragEnd = (id: string, position: { x: number, y: number }) => {
    setMoodBoardItems(
      moodBoardItems.map(item => 
        item.id === id ? { ...item, position } : item
      )
    );
  };

  const getStickyNoteClass = (color: string = 'yellow') => {
    const colorClass = stickyNoteColors.find(c => c.value === color)?.class || 'bg-yellow-100';
    return `${colorClass} shadow-md transform rotate-[1deg]`;
  };

  return (
    <PageLayout 
      title="Mood Board" 
      description="Capture your favorite memories and moments together"
      icon={<Image className="w-8 h-8" />}
    >
      <div className="h-[calc(100vh-180px)] relative bg-gray-50/50 rounded-lg border border-dashed border-gray-300 overflow-hidden" style={{ minHeight: '500px' }}>
        {/* Draggable Items */}
        {moodBoardItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute"
            initial={{ x: item.position?.x || 0, y: item.position?.y || 0 }}
            drag
            dragMomentum={false}
            onDragEnd={(_, info) => {
              const position = {
                x: item.position?.x + info.offset.x || 0,
                y: item.position?.y + info.offset.y || 0
              };
              handleDragEnd(item.id, position);
            }}
          >
            {item.type === 'image' ? (
              <Card className="w-64 overflow-hidden shadow-lg">
                <div className="h-40 overflow-hidden">
                  <img src={item.image} alt={item.content} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-3">
                  <p className="text-sm">{item.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end p-2 gap-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className={`w-64 h-64 p-4 rounded-sm ${getStickyNoteClass(item.color)} relative`}>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500" onClick={() => deleteItem(item.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm overflow-auto max-h-[180px]">{item.content}</p>
                
                {item.date && (
                  <p className="text-xs text-gray-600 mt-2 italic">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                
                <Badge className="absolute bottom-2 right-2" variant="outline">
                  {item.type === 'memory' ? 'Memory' : 'Love Note'}
                </Badge>
              </div>
            )}
          </motion.div>
        ))}

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6 z-50">
          <Popover open={isFabOpen} onOpenChange={setIsFabOpen}>
            <PopoverTrigger asChild>
              <Button 
                size="icon" 
                className="h-14 w-14 rounded-full shadow-lg bg-pink-500 hover:bg-pink-600 text-white"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-auto p-1">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-blue-100 hover:bg-blue-200 border-blue-300" 
                  title="Add Photo"
                  onClick={() => {
                    setIsFabOpen(false);
                    setShowAddPhotoForm(true);
                  }}
                >
                  <Upload className="h-5 w-5 text-blue-800" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-green-100 hover:bg-green-200 border-green-300" 
                  title="Add Memory"
                  onClick={() => {
                    setIsFabOpen(false);
                    setShowAddMemoryForm(true);
                  }}
                >
                  <MessageSquare className="h-5 w-5 text-green-800" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-pink-100 hover:bg-pink-200 border-pink-300" 
                  title="Add Love Note"
                  onClick={() => {
                    setIsFabOpen(false);
                    setShowAddLoveNoteForm(true);
                  }}
                >
                  <StickyNote className="h-5 w-5 text-pink-800" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Add Memory Form Dialog */}
      <Dialog open={showAddMemoryForm} onOpenChange={setShowAddMemoryForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a Memory</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1">Title</Label>
              <Input 
                placeholder="Our First Date" 
                value={newMemory.title}
                onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Date (Optional)</Label>
              <Input 
                type="date" 
                value={newMemory.date}
                onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Memory</Label>
              <Textarea 
                placeholder="Write your memory here..." 
                className="min-h-[100px]"
                value={newMemory.content}
                onChange={(e) => setNewMemory({...newMemory, content: e.target.value})}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Sticky Note Color</Label>
              <RadioGroup 
                value={newMemory.color} 
                onValueChange={(value) => setNewMemory({...newMemory, color: value})}
                className="flex gap-3"
              >
                {stickyNoteColors.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={color.value} 
                      id={`color-${color.value}-memory`} 
                      className={color.class}
                    />
                    <Label htmlFor={`color-${color.value}-memory`} className="capitalize">{color.value}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button onClick={addMemory}>Add Memory</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Love Note Form Dialog */}
      <Dialog open={showAddLoveNoteForm} onOpenChange={setShowAddLoveNoteForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a Love Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1">Title</Label>
              <Input 
                placeholder="What I Love About You" 
                value={newLoveNote.title}
                onChange={(e) => setNewLoveNote({...newLoveNote, title: e.target.value})}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Note</Label>
              <Textarea 
                placeholder="Write your love note here..." 
                className="min-h-[100px]"
                value={newLoveNote.content}
                onChange={(e) => setNewLoveNote({...newLoveNote, content: e.target.value})}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Sticky Note Color</Label>
              <RadioGroup 
                value={newLoveNote.color} 
                onValueChange={(value) => setNewLoveNote({...newLoveNote, color: value})}
                className="flex gap-3"
              >
                {stickyNoteColors.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={color.value} 
                      id={`color-${color.value}-note`} 
                      className={color.class}
                    />
                    <Label htmlFor={`color-${color.value}-note`} className="capitalize">{color.value}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button onClick={addLoveNote}>Add Love Note</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Photo Form Dialog */}
      <Dialog open={showAddPhotoForm} onOpenChange={setShowAddPhotoForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1">Upload Photo</Label>
              <div className="grid gap-2">
                <Input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                {newPhoto.image && (
                  <div className="relative h-40 mt-2 rounded-md overflow-hidden">
                    <img 
                      src={newPhoto.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Caption</Label>
              <Input 
                placeholder="Add a caption for your photo" 
                value={newPhoto.content}
                onChange={(e) => setNewPhoto({...newPhoto, content: e.target.value})}
              />
            </div>
            <Button onClick={addPhoto} disabled={!newPhoto.image || !newPhoto.content}>Add Photo</Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default MoodBoard;
