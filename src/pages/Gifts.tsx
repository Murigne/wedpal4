
import React, { useState } from 'react';
import { Gift, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/dashboard/PageLayout';
import { useToast } from '@/hooks/use-toast';

import { GiftItem } from '@/types/gift';
import RegistrySummaryCard from '@/components/gifts/RegistrySummaryCard';
import ShareRegistryCard from '@/components/gifts/ShareRegistryCard';
import GiftList from '@/components/gifts/GiftList';
import GiftFormDialog from '@/components/gifts/GiftFormDialog';

const Gifts: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [giftItems, setGiftItems] = useState<GiftItem[]>([
    { 
      id: '1', 
      name: 'Stand Mixer', 
      price: 350, 
      link: 'https://example.com/mixer', 
      category: 'kitchen', 
      purchased: false, 
      priority: 'high' 
    },
    { 
      id: '2', 
      name: 'Luxury Bedding Set', 
      price: 200, 
      link: 'https://example.com/bedding', 
      category: 'bedroom', 
      purchased: true, 
      priority: 'medium' 
    },
    { 
      id: '3', 
      name: 'Smart TV', 
      price: 800, 
      link: 'https://example.com/tv', 
      category: 'electronics', 
      purchased: false, 
      priority: 'low' 
    },
    { 
      id: '4', 
      name: 'Honeymoon Fund', 
      price: 1000, 
      link: 'https://example.com/honeymoon', 
      category: 'experience', 
      purchased: false, 
      priority: 'high' 
    },
    { 
      id: '5', 
      name: 'Dining Set', 
      price: 450, 
      link: 'https://example.com/dining', 
      category: 'kitchen', 
      purchased: false, 
      priority: 'medium' 
    },
    { 
      id: '6', 
      name: 'Coffee Machine', 
      price: 250, 
      link: 'https://example.com/coffee', 
      category: 'kitchen', 
      purchased: false, 
      priority: 'low' 
    },
  ]);
  const [currentTab, setCurrentTab] = useState('all');
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GiftItem | null>(null);

  const togglePurchased = (itemId: string) => {
    setGiftItems(items => {
      const updatedItems = items.map(item => 
        item.id === itemId ? { ...item, purchased: !item.purchased } : item
      );
      const item = items.find(i => i.id === itemId);
      if (item) {
        toast({
          title: item.purchased ? "Item Unpurchased" : "Item Purchased",
          description: `${item.name} has been marked as ${item.purchased ? "not purchased" : "purchased"}.`
        });
      }
      return updatedItems;
    });
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setIsAddEditDialogOpen(true);
  };

  const openEditDialog = (item: GiftItem) => {
    setEditingItem(item);
    setIsAddEditDialogOpen(true);
  };

  const handleAddEditGift = (giftData: Omit<GiftItem, 'id'>) => {
    if (editingItem) {
      // Edit existing gift
      setGiftItems(items =>
        items.map(item =>
          item.id === editingItem.id ? { ...giftData, id: item.id } : item
        )
      );
      toast({
        title: "Gift Updated",
        description: `${giftData.name} has been updated in your registry.`
      });
    } else {
      // Add new gift
      const newId = Date.now().toString();
      setGiftItems([...giftItems, { ...giftData, id: newId }]);
      toast({
        title: "Gift Added",
        description: `${giftData.name} has been added to your registry.`
      });
    }

    setIsAddEditDialogOpen(false);
  };

  const handleDeleteGift = (id: string) => {
    const item = giftItems.find(g => g.id === id);
    if (item) {
      setGiftItems(giftItems.filter(g => g.id !== id));
      toast({
        title: "Gift Removed",
        description: `${item.name} has been removed from your registry.`
      });
    }
  };

  return (
    <PageLayout 
      title="Gift Registry" 
      description="Manage your wedding gift wishlist"
      icon={<Gift className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
        <div className="md:col-span-4 space-y-6">
          {/* Registry Summary Card */}
          <RegistrySummaryCard 
            giftItems={giftItems} 
            onAddItem={openAddDialog} 
          />
          
          {/* Share Registry Card */}
          <ShareRegistryCard 
            registryUrl="https://wedpal.com/registry/smith-johnson" 
          />
        </div>
        
        <div className="md:col-span-8">
          <Card className="h-full flex flex-col md:max-h-[617px]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Gift Registry</CardTitle>
                <Button size="sm" onClick={openAddDialog}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <CardDescription>
                Manage your wedding gift wishlist
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden flex flex-col">
              <GiftList 
                giftItems={giftItems}
                currentTab={currentTab}
                onTabChange={setCurrentTab}
                onEdit={openEditDialog}
                onDelete={handleDeleteGift}
                onTogglePurchased={togglePurchased}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Gift Dialog */}
      <GiftFormDialog 
        open={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        editingItem={editingItem}
        onSave={handleAddEditGift}
      />
    </PageLayout>
  );
};

export default Gifts;
