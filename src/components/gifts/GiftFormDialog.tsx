
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GiftItem } from '@/types/gift';
import { useToast } from '@/hooks/use-toast';

interface GiftFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: GiftItem | null;
  onSave: (giftData: Omit<GiftItem, 'id'>) => void;
}

const GiftFormDialog: React.FC<GiftFormDialogProps> = ({
  open,
  onOpenChange,
  editingItem,
  onSave,
}) => {
  const { toast } = useToast();
  const [giftFormData, setGiftFormData] = useState({
    name: '',
    price: '',
    link: '',
    category: 'kitchen',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  useEffect(() => {
    if (editingItem) {
      setGiftFormData({
        name: editingItem.name,
        price: editingItem.price.toString(),
        link: editingItem.link,
        category: editingItem.category,
        priority: editingItem.priority
      });
    } else {
      // Reset form when adding new item
      setGiftFormData({
        name: '',
        price: '',
        link: '',
        category: 'kitchen',
        priority: 'medium'
      });
    }
  }, [editingItem, open]);

  const handleSubmit = () => {
    if (giftFormData.name.trim() === '' || giftFormData.price.trim() === '') {
      toast({
        title: "Missing Information",
        description: "Please fill in the name and price of the gift."
      });
      return;
    }

    const giftData = {
      name: giftFormData.name,
      price: parseFloat(giftFormData.price),
      link: giftFormData.link,
      category: giftFormData.category,
      priority: giftFormData.priority,
      purchased: editingItem ? editingItem.purchased : false
    };

    onSave(giftData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingItem ? "Edit Gift" : "Add New Gift"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Gift Name</label>
            <Input 
              placeholder="Enter gift name" 
              value={giftFormData.name}
              onChange={e => setGiftFormData({...giftFormData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Price (GHS)</label>
            <Input 
              type="number" 
              placeholder="Enter price" 
              value={giftFormData.price}
              onChange={e => setGiftFormData({...giftFormData, price: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Product Link</label>
            <Input 
              placeholder="https://example.com/product" 
              value={giftFormData.link}
              onChange={e => setGiftFormData({...giftFormData, link: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select 
                value={giftFormData.category} 
                onValueChange={(value) => setGiftFormData({...giftFormData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="bedroom">Bedroom</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="decor">Decor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <Select 
                value={giftFormData.priority} 
                onValueChange={(value: 'high' | 'medium' | 'low') => setGiftFormData({...giftFormData, priority: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {editingItem ? "Update Gift" : "Add Gift"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GiftFormDialog;
