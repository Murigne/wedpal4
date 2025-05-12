
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import GiftItemCard from './GiftItemCard';
import { GiftItem } from '@/types/gift';

interface GiftListProps {
  giftItems: GiftItem[];
  currentTab: string;
  onTabChange: (value: string) => void;
  onEdit: (item: GiftItem) => void;
  onDelete: (id: string) => void;
  onTogglePurchased: (id: string) => void;
}

const GiftList: React.FC<GiftListProps> = ({
  giftItems,
  currentTab,
  onTabChange,
  onEdit,
  onDelete,
  onTogglePurchased,
}) => {
  const filteredGiftItems = giftItems.filter(item => {
    if (currentTab === 'all') return true;
    if (currentTab === 'purchased') return item.purchased;
    if (currentTab === 'unpurchased') return !item.purchased;
    return true;
  });

  return (
    <Tabs defaultValue={currentTab} onValueChange={onTabChange} className="flex-1 flex flex-col">
      <div className="mb-4">
        <TabsList className="inline-flex">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="unpurchased">Unpurchased</TabsTrigger>
          <TabsTrigger value="purchased">Purchased</TabsTrigger>
        </TabsList>
      </div>
      
      <ScrollArea className="flex-1 h-[calc(100vh-320px)]">
        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0">
          {filteredGiftItems.map((item) => (
            <GiftItemCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePurchased={onTogglePurchased}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="unpurchased" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0">
          {filteredGiftItems.map((item) => (
            <GiftItemCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePurchased={onTogglePurchased}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="purchased" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0">
          {filteredGiftItems.map((item) => (
            <GiftItemCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePurchased={onTogglePurchased}
            />
          ))}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

export default GiftList;
