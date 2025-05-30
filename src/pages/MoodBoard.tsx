
import React, { useState, useRef } from 'react';
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
  rotation?: number;
}

interface EditingItem extends Omit<MoodBoardItem, 'id'> {
  id?: string;
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
  const moodBoardRef = useRef<HTMLDivElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  // Expanded board size for infinite scrolling
  const boardSize = {
    width: 10000,
    height: 10000
  };

  const [moodBoardItems, setMoodBoardItems] = useState<MoodBoardItem[]>([
    {
      id: '1',
      type: 'image',
      content: 'Our first vacation together',
      image: 'https://placehold.co/600x400',
      position: { x: boardSize.width/2 - 500, y: boardSize.height/2 - 300 },
      rotation: 0
    },
    {
      id: '2',
      type: 'memory',
      content: "I'll never forget our first date at that small café by the beach. The way you laughed when I spilled coffee all over myself, instead of being embarrassed, made me realize how comfortable I felt with you.",
      title: 'Our First Date',
      date: '2023-06-15',
      color: 'yellow',
      position: { x: boardSize.width/2 - 150, y: boardSize.height/2 - 250 },
      rotation: -3
    },
    {
      id: '3',
      type: 'love-note',
      content: "Your kindness and compassion for others always inspires me to be a better person. I love how you see the best in everyone and everything.",
      title: 'What I Love About You',
      color: 'pink',
      position: { x: boardSize.width/2 + 200, y: boardSize.height/2 - 200 },
      rotation: 2
    },
    {
      id: '4',
      type: 'image',
      content: 'The day we got engaged',
      image: 'https://placehold.co/600x400',
      position: { x: boardSize.width/2 - 500, y: boardSize.height/2 + 150 },
      rotation: -2
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Center the view on initial load
  React.useEffect(() => {
    if (dragAreaRef.current) {
      // Center the scroll area to the middle of the board
      dragAreaRef.current.scrollLeft = boardSize.width / 2 - window.innerWidth / 2;
      dragAreaRef.current.scrollTop = boardSize.height / 2 - window.innerHeight / 2;
    }
  }, []);

  // Drag to scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start drag if not on a card
    if ((e.target as HTMLElement).closest('.mood-board-item')) return;
    
    setIsDragging(true);
    setStartDragPos({ x: e.clientX, y: e.clientY });
    setScrollPos({ 
      x: dragAreaRef.current?.scrollLeft || 0, 
      y: dragAreaRef.current?.scrollTop || 0 
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragAreaRef.current) return;
    
    const dx = e.clientX - startDragPos.x;
    const dy = e.clientY - startDragPos.y;
    
    dragAreaRef.current.scrollLeft = scrollPos.x - dx;
    dragAreaRef.current.scrollTop = scrollPos.y - dy;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a FileReader to read the file
      const reader = new FileReader();
      
      reader.onload = (event) => {
        // Create an Image object to get the dimensions
        const img = new window.Image();
        img.onload = () => {
          const aspectRatio = 600 / 400; // Target aspect ratio (600x400)
          
          // Create a canvas to resize and maintain aspect ratio
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions to maintain aspect ratio
          if (width / height > aspectRatio) {
            // Image is wider than target ratio
            height = width / aspectRatio;
          } else {
            // Image is taller than target ratio
            width = height * aspectRatio;
          }
          
          // Set canvas dimensions
          canvas.width = 600;
          canvas.height = 400;
          
          // Draw image on canvas with proper centering
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Calculate centering
            const offsetX = (img.width - width) / 2;
            const offsetY = (img.height - height) / 2;
            
            // Draw image with proper centering and scaling
            ctx.drawImage(img, offsetX, offsetY, width, height, 0, 0, 600, 400);
            
            // Get resized image as data URL
            const resizedImageUrl = canvas.toDataURL('image/jpeg', 0.9);
            
            if (editingItem && editingItem.type === 'image') {
              setEditingItem({...editingItem, image: resizedImageUrl});
            } else {
              setNewPhoto({ ...newPhoto, image: resizedImageUrl });
            }
          }
        };
        
        img.src = event.target?.result as string;
      };
      
      reader.readAsDataURL(file);
    }
  };

  const editItem = (item: MoodBoardItem) => {
    setEditingItem(item);
    setIsEditingItem(true);
    
    if (item.type === 'memory') {
      setShowAddMemoryForm(true);
      setNewMemory({
        title: item.title || '',
        date: item.date || '',
        content: item.content,
        color: item.color || 'yellow'
      });
    } else if (item.type === 'love-note') {
      setShowAddLoveNoteForm(true);
      setNewLoveNote({
        title: item.title || '',
        content: item.content,
        color: item.color || 'pink'
      });
    } else if (item.type === 'image') {
      setShowAddPhotoForm(true);
      setNewPhoto({
        content: item.content,
        image: item.image || ''
      });
    }
  };

  const addOrUpdateMemory = () => {
    if (newMemory.title && newMemory.content) {
      if (isEditingItem && editingItem && editingItem.id) {
        // Update existing item
        setMoodBoardItems(items => 
          items.map(item => 
            item.id === editingItem.id ? {
              ...item,
              title: newMemory.title,
              content: newMemory.content,
              date: newMemory.date,
              color: newMemory.color
            } : item
          )
        );
        toast({
          title: "Memory updated",
          description: "Your memory has been updated on the mood board"
        });
      } else {
        // Add new item - place near the center of current view
        const centerX = dragAreaRef.current ? dragAreaRef.current.scrollLeft + dragAreaRef.current.clientWidth / 2 : boardSize.width / 2;
        const centerY = dragAreaRef.current ? dragAreaRef.current.scrollTop + dragAreaRef.current.clientHeight / 2 : boardSize.height / 2;
        
        setMoodBoardItems([
          ...moodBoardItems,
          {
            id: `memory-${Date.now()}`,
            type: 'memory',
            content: newMemory.content,
            title: newMemory.title,
            date: newMemory.date,
            color: newMemory.color,
            position: { 
              x: centerX - 150 + Math.random() * 300,
              y: centerY - 150 + Math.random() * 300
            },
            rotation: Math.random() * 6 - 3
          }
        ]);
        toast({
          title: "Memory added",
          description: "Your memory has been added to the mood board"
        });
      }
      
      setNewMemory({ title: '', date: '', content: '', color: 'yellow' });
      setShowAddMemoryForm(false);
      setIsEditingItem(false);
      setEditingItem(null);
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in the title and content"
      });
    }
  };

  const addOrUpdateLoveNote = () => {
    if (newLoveNote.title && newLoveNote.content) {
      if (isEditingItem && editingItem && editingItem.id) {
        // Update existing item
        setMoodBoardItems(items => 
          items.map(item => 
            item.id === editingItem.id ? {
              ...item,
              title: newLoveNote.title,
              content: newLoveNote.content,
              color: newLoveNote.color
            } : item
          )
        );
        toast({
          title: "Love note updated",
          description: "Your love note has been updated on the mood board"
        });
      } else {
        // Add new item - place near the center of current view
        const centerX = dragAreaRef.current ? dragAreaRef.current.scrollLeft + dragAreaRef.current.clientWidth / 2 : boardSize.width / 2;
        const centerY = dragAreaRef.current ? dragAreaRef.current.scrollTop + dragAreaRef.current.clientHeight / 2 : boardSize.height / 2;
        
        setMoodBoardItems([
          ...moodBoardItems,
          {
            id: `love-note-${Date.now()}`,
            type: 'love-note',
            content: newLoveNote.content,
            title: newLoveNote.title,
            color: newLoveNote.color,
            position: { 
              x: centerX - 150 + Math.random() * 300,
              y: centerY - 150 + Math.random() * 300
            },
            rotation: Math.random() * 6 - 3
          }
        ]);
        toast({
          title: "Love note added",
          description: "Your love note has been added to the mood board"
        });
      }
      
      setNewLoveNote({ title: '', content: '', color: 'pink' });
      setShowAddLoveNoteForm(false);
      setIsEditingItem(false);
      setEditingItem(null);
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in the title and content"
      });
    }
  };

  const addOrUpdatePhoto = () => {
    if (newPhoto.image && newPhoto.content) {
      if (isEditingItem && editingItem && editingItem.id) {
        // Update existing item
        setMoodBoardItems(items => 
          items.map(item => 
            item.id === editingItem.id ? {
              ...item,
              content: newPhoto.content,
              image: newPhoto.image
            } : item
          )
        );
        toast({
          title: "Photo updated",
          description: "Your photo has been updated on the mood board"
        });
      } else {
        // Add new item - place near the center of current view
        const centerX = dragAreaRef.current ? dragAreaRef.current.scrollLeft + dragAreaRef.current.clientWidth / 2 : boardSize.width / 2;
        const centerY = dragAreaRef.current ? dragAreaRef.current.scrollTop + dragAreaRef.current.clientHeight / 2 : boardSize.height / 2;
        
        setMoodBoardItems([
          ...moodBoardItems,
          {
            id: `image-${Date.now()}`,
            type: 'image',
            content: newPhoto.content,
            image: newPhoto.image,
            position: { 
              x: centerX - 150 + Math.random() * 300,
              y: centerY - 150 + Math.random() * 300
            },
            rotation: Math.random() * 6 - 3
          }
        ]);
        toast({
          title: "Photo added",
          description: "Your photo has been added to the mood board"
        });
      }
      
      setNewPhoto({ content: '', image: '' });
      setShowAddPhotoForm(false);
      setIsEditingItem(false);
      setEditingItem(null);
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
    // Ensure position is within the bounds of the mood board
    setMoodBoardItems(
      moodBoardItems.map(item => 
        item.id === id ? { ...item, position } : item
      )
    );
  };

  const getStickyNoteClass = (color: string = 'yellow') => {
    const colorClass = stickyNoteColors.find(c => c.value === color)?.class || 'bg-yellow-100';
    return `${colorClass} shadow-md`;
  };

  const handleDialogClose = () => {
    setIsEditingItem(false);
    setEditingItem(null);
  };

  return (
    <PageLayout 
      title="Mood Board" 
      description="Capture your favorite memories and moments together"
      icon={<Image className="w-8 h-8" />}
    >
      <div 
        ref={moodBoardRef}
        className="h-[calc(100vh-180px)] md:max-h-[695px] relative bg-gray-50/50 rounded-lg border border-dashed border-gray-300 overflow-hidden cursor-grab" 
        style={{ minHeight: '500px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          ref={dragAreaRef}
          className="h-full w-full overflow-auto no-scrollbar"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="relative" style={{ width: `${boardSize.width}px`, height: `${boardSize.height}px` }}>
            {/* Draggable Items */}
            {moodBoardItems.map((item) => (
              <motion.div
                key={item.id}
                className="absolute mood-board-item"
                initial={{ 
                  x: item.position?.x || 0, 
                  y: item.position?.y || 0,
                  rotate: item.rotation || 0
                }}
                drag
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  const position = {
                    x: (item.position?.x || 0) + info.offset.x,
                    y: (item.position?.y || 0) + info.offset.y
                  };
                  handleDragEnd(item.id, position);
                }}
                style={{ rotate: item.rotation || 0 }}
              >
                {item.type === 'image' ? (
                  <Card className="w-64 overflow-hidden shadow-lg relative group">
                    <div className="h-40 overflow-hidden drag-handle" style={{ cursor: 'grab' }}>
                      <img src={item.image} alt={item.content} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm">{item.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end p-2 gap-1">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                        onClick={() => editItem(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" 
                        onClick={() => deleteItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className={`w-64 h-64 p-4 rounded-sm ${getStickyNoteClass(item.color)} relative group`}>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                        onClick={() => editItem(item)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" 
                        onClick={() => deleteItem(item.id)}>
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
          </div>
        </div>

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
                    setIsEditingItem(false);
                    setEditingItem(null);
                    setNewPhoto({ content: '', image: '' });
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
                    setIsEditingItem(false);
                    setEditingItem(null);
                    setNewMemory({ title: '', date: '', content: '', color: 'yellow' });
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
                    setIsEditingItem(false);
                    setEditingItem(null);
                    setNewLoveNote({ title: '', content: '', color: 'pink' });
                  }}
                >
                  <StickyNote className="h-5 w-5 text-pink-800" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Add/Edit Memory Form Dialog */}
      <Dialog open={showAddMemoryForm} onOpenChange={(open) => {
        setShowAddMemoryForm(open);
        if (!open) handleDialogClose();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditingItem ? "Edit Memory" : "Add a Memory"}</DialogTitle>
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
            <Button onClick={addOrUpdateMemory}>{isEditingItem ? "Update Memory" : "Add Memory"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Love Note Form Dialog */}
      <Dialog open={showAddLoveNoteForm} onOpenChange={(open) => {
        setShowAddLoveNoteForm(open);
        if (!open) handleDialogClose();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditingItem ? "Edit Love Note" : "Add a Love Note"}</DialogTitle>
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
            <Button onClick={addOrUpdateLoveNote}>{isEditingItem ? "Update Love Note" : "Add Love Note"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Photo Form Dialog */}
      <Dialog open={showAddPhotoForm} onOpenChange={(open) => {
        setShowAddPhotoForm(open);
        if (!open) handleDialogClose();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditingItem ? "Edit Photo" : "Add a Photo"}</DialogTitle>
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
                {(isEditingItem ? editingItem?.image : newPhoto.image) && (
                  <div className="relative h-40 mt-2 rounded-md overflow-hidden">
                    <img 
                      src={isEditingItem && editingItem?.image ? editingItem.image : newPhoto.image} 
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
                value={isEditingItem && editingItem?.content ? editingItem.content : newPhoto.content}
                onChange={(e) => isEditingItem && editingItem 
                  ? setEditingItem({...editingItem, content: e.target.value})
                  : setNewPhoto({...newPhoto, content: e.target.value})
                }
              />
            </div>
            <Button 
              onClick={addOrUpdatePhoto} 
              disabled={(isEditingItem ? !(editingItem?.image && editingItem?.content) : !(newPhoto.image && newPhoto.content))}
            >
              {isEditingItem ? "Update Photo" : "Add Photo"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default MoodBoard;
