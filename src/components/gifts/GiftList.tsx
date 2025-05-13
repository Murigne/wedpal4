
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GiftItemCard from './GiftItemCard';
import { GiftItem } from '@/types/gift';
import { usePagination } from '@/hooks/usePagination';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

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

  const pagination = usePagination(filteredGiftItems.length, 1, 6);
  const paginatedItems = pagination.getCurrentItems(filteredGiftItems);

  const renderPagination = () => {
    if (filteredGiftItems.length <= pagination.pageSize) return null;

    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => pagination.prevPage()} 
              className={pagination.currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {Array.from({ length: pagination.totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                onClick={() => pagination.setPage(i + 1)}
                isActive={pagination.currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => pagination.nextPage()} 
              className={pagination.currentPage === pagination.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={onTabChange} className="flex-1 flex flex-col">
      <div className="mb-4">
        <TabsList className="inline-flex">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="unpurchased">Unpurchased</TabsTrigger>
          <TabsTrigger value="purchased">Purchased</TabsTrigger>
        </TabsList>
      </div>
      
      <div className="flex-1">
        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0">
          {paginatedItems.map((item) => (
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
          {paginatedItems.map((item) => (
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
          {paginatedItems.map((item) => (
            <GiftItemCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePurchased={onTogglePurchased}
            />
          ))}
        </TabsContent>
      </div>
      
      {renderPagination()}
    </Tabs>
  );
};

export default GiftList;
