import React, { useState, useRef, useEffect } from 'react';
import { Image, Upload, Heart, Plus, X, MessageSquare, Edit, Trash2, StickyNote, RotateCcw } from 'lucide-react';
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
  scale?: number;
}

interface EditingItem extends Omit<MoodBoardItem, 'id'> {
  id?: string;
}

// Resize handle positions
const RESIZE_HANDLES = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right'
};

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
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [resizeStartScale, setResizeStartScale] = useState(1);
  const [resizingItemId, setResizingItemId] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotatingItemId, setRotatingItemId] = useState<string | null>(null);

  const [moodBoardItems, setMoodBoardItems] = useState<MoodBoardItem[]>([
    {
      id: '1',
      type: 'image',
      content: 'Our first vacation together',
      image: 'https://placehold.co/600x400',
      position: { x: 0, y: 0 },
      rotation: 0,
      scale: 1
    },
    {
      id: '2',
      type: 'memory',
      content: "I'll never forget our first date at that small café by the beach. The way you laughed when I spilled coffee all over myself, instead of being embarrassed, made me realize how comfortable I felt with you.",
      title: 'Our First Date',
      date: '2023-06-15',
      color: 'yellow',
      position: { x: 350, y: 50 },
      rotation: -3,
      scale: 1
    },
    {
      id: '3',
      type: 'love-note',
      content: "Your kindness and compassion for others always inspires me to be a better person. I love how you see the best in everyone and everything.",
      title: 'What I Love About You',
      color: 'pink',
      position: { x: 700, y: 100 },
      rotation: 2,
      scale: 1
    },
    {
      id: '4',
      type: 'image',
      content: 'The day we got engaged',
      image: 'https://placehold.co/600x400',
      position: { x: 0, y: 450 },
      rotation: -2,
      scale: 1
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

  // Expanded board size - much larger for infinite scrolling
  const boardSize = {
    width: 20000,
    height: 20000
  };

  // Initially center the view
  useEffect(() => {
    if (dragAreaRef.current) {
      // Center the scroll area
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

  // Rotation handling - completely revised
  const startRotate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    const item = moodBoardItems.find(item => item.id === id);
    if (!item || !item.position) return;
    
    // Find the element and get its center point
    const itemElement = document.getElementById(`item-${id}`);
    if (!itemElement) return;
    
    const rect = itemElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate the starting angle
    const startAngle = Math.atan2(
      e.clientY - centerY,
      e.clientX - centerX
    );
    
    // Store the current rotation
    const currentRotation = item.rotation || 0;
    
    setIsRotating(true);
    setRotatingItemId(id);
    
    // Handle mouse move for rotation
    const handleRotateMove = (moveEvent: MouseEvent) => {
      // Calculate the new angle
      const newAngle = Math.atan2(
        moveEvent.clientY - centerY,
        moveEvent.clientX - centerX
      );
      
      // Calculate the angle difference in radians, then convert to degrees
      let angleDiff = (newAngle - startAngle) * (180 / Math.PI);
      
      // Update the item's rotation
      setMoodBoardItems(prevItems => 
        prevItems.map(item => 
          item.id === id 
            ? { ...item, rotation: currentRotation + angleDiff } 
            : item
        )
      );
    };
    
    // Handle mouse up for rotation
    const handleRotateUp = () => {
      setIsRotating(false);
      setRotatingItemId(null);
      document.removeEventListener('mousemove', handleRotateMove);
      document.removeEventListener('mouseup', handleRotateUp);
    };
    
    document.addEventListener('mousemove', handleRotateMove);
    document.addEventListener('mouseup', handleRotateUp);
  };

  // New resize handler
  const startResize = (e: React.MouseEvent, id: string, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    const item = moodBoardItems.find(item => item.id === id);
    if (!item) return;
    
    setIsResizing(true);
    setResizingItemId(id);
    setResizeHandle(handle);
    setResizeStartPos({ x: e.clientX, y: e.clientY });
    setResizeStartScale(item.scale || 1);
    
    const handleResizeMove = (moveEvent: MouseEvent) => {
      // Calculate the distance moved
      const dx = moveEvent.clientX - resizeStartPos.x;
      const dy = moveEvent.clientY - resizeStartPos.y;
      
      // Calculate direction based on which handle was grabbed
      let direction = 1;
      if (handle === RESIZE_HANDLES.TOP_LEFT || handle === RESIZE_HANDLES.BOTTOM_LEFT) {
        direction = -1;
      }
      
      // Determine the distance moved diagonally (positive or negative based on handle)
      const distance = direction * Math.max(Math.abs(dx), Math.abs(dy));
      
      // Scale factor - adjust the sensitivity as needed
      const scalingFactor = 0.003;
      const scaleChange = 1 + (distance * scalingFactor);
      
      // Calculate the new scale with bounds
      const newScale = Math.max(0.5, Math.min(3.0, resizeStartScale * scaleChange));
      
      // Update the item's scale
      setMoodBoardItems(prevItems => 
        prevItems.map(item => 
          item.id === id 
            ? { ...item, scale: newScale } 
            : item
        )
      );
    };
    
    const handleResizeUp = () => {
      setIsResizing(false);
      setResizingItemId(null);
      setResizeHandle(null);
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeUp);
    };
    
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeUp);
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
            rotation: Math.random() * 6 - 3,
            scale: 1
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
            rotation: Math.random() * 6 - 3,
            scale: 1
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
            rotation: Math.random() * 6 - 3,
            scale: 1
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

  // Get resize handle cursor styles based on handle position
  const getResizeHandleCursor = (handle: string) => {
    switch (handle) {
      case RESIZE_HANDLES.TOP_LEFT:
        return 'cursor-nwse-resize';
      case RESIZE_HANDLES.TOP_RIGHT:
        return 'cursor-nesw-resize';
      case RESIZE_HANDLES.BOTTOM_LEFT:
        return 'cursor-nesw-resize';
      case RESIZE_HANDLES.BOTTOM_RIGHT:
        return 'cursor-nwse-resize';
      default:
        return 'cursor-nwse-resize';
    }
  };

  return (
    <PageLayout 
      title="Mood Board" 
      description="Capture your favorite memories and moments together"
      icon={<Image className="w-8 h-8" />}
    >
      <div 
        ref={moodBoardRef}
        className="h-[calc(100vh-180px)] md:max-h-[695px] relative bg-gray-50/50 rounded-lg border border-dashed border-gray-300 overflow-hidden" 
        style={{ minHeight: '500px', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          ref={dragAreaRef}
          className="h-full w-full overflow-auto no-scrollbar"
        >
          <div 
            className="relative"
            style={{
              width: `${boardSize.width}px`,
              height: `${boardSize.height}px`
            }}
          >
            {/* Draggable Items */}
            {moodBoardItems.map((item) => (
              <motion.div
                key={item.id}
                id={`item-${item.id}`}
                className="absolute mood-board-item"
                initial={{ 
                  x: item.position?.x || 0, 
                  y: item.position?.y || 0,
                  rotate: item.rotation || 0,
                  scale: item.scale || 1
                }}
                animate={{
                  rotate: item.rotation || 0,
                  scale: item.scale || 1
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
                style={{ 
                  transformOrigin: 'center', 
                  rotate: item.rotation || 0, 
                  scale: item.scale || 1,
                  zIndex: (rotatingItemId === item.id || resizingItemId === item.id) ? 10 : 1
                }}
              >
                {item.type === 'image' ? (
                  <Card 
                    className="overflow-hidden shadow-lg relative group"
                    style={{ width: `${256}px` }} // Base width
                  >
                    <div 
                      className="overflow-hidden" 
                      style={{ height: `${160}px` }} // Base height for image container
                    >
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
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500" onClick={() => deleteItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                    
                    {/* Rotation handle */}
                    <div 
                      className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-90 cursor-alias transition-opacity"
                      onMouseDown={(e) => startRotate(e, item.id)}
                      title="Rotate"
                    >
                      <RotateCcw className="w-3 h-3 text-gray-600" />
                    </div>
                    
                    {/* Resize handles - all four corners */}
                    <div 
                      className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-90 ${getResizeHandleCursor(RESIZE_HANDLES.TOP_LEFT)} transition-opacity`}
                      onMouseDown={(e) => startResize(e, item.id, RESIZE_HANDLES.TOP_LEFT)}
                      title="Resize"
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </div>
                    <div 
                      className={`absolute top-0 right-0 w-6 h-6 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-90 ${getResizeHandleCursor(RESIZE_HANDLES.TOP_RIGHT)} transition-opacity`}
                      onMouseDown={(e) => startResize(e, item.id, RESIZE_HANDLES.TOP_RIGHT)}
                      title="Resize"
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </div>
                    <div 
                      className={`absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-90 ${getResizeHandleCursor(RESIZE_HANDLES.BOTTOM_RIGHT)} transition-opacity`}
                      onMouseDown={(e) => startResize(e, item.id, RESIZE_HANDLES.BOTTOM_RIGHT)}
                      title="Resize"
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </div>
                  </Card>
                ) : (
                  <div 
                    className={`p-4 rounded-sm ${getStickyNoteClass(item.color)} relative group`}
                    style={{ width: `${256}px`, height: `${256}px` }} // Base dimensions
                  >
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                        onClick={() => editItem(item)}>
                        <Edit className="w-3 h-3" />
                      </Button>
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
                    
                    <Badge className="
"
