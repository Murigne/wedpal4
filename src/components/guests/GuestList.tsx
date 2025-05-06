import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { GuestCard } from './GuestCard';
import { Guest } from '@/types/guest';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/usePagination';

interface GuestListProps {
  guests: Guest[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEditGuest: (guest: Guest) => void;
  onDeleteGuest: (id: string) => void;
  currentTab: string;
  onTabChange: (value: string) => void;
}

export const GuestList: React.FC<GuestListProps> = ({
  guests,
  searchTerm,
  onSearchChange,
  onEditGuest,
  onDeleteGuest,
  currentTab,
  onTabChange
}) => {
  // Filter guests based on current tab and search term
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentTab === 'all') return matchesSearch;
    return matchesSearch && guest.rsvp === currentTab;
  });

  // Implement pagination
  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    nextPage, 
    prevPage, 
    setPage,
    getCurrentItems 
  } = usePagination(filteredGuests.length, 1, 5);

  const paginatedGuests = getCurrentItems(filteredGuests);

  // Generate page numbers for pagination links
  const generatePaginationLinks = () => {
    let pages = [];
    
    // Always include first page
    pages.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          onClick={() => setPage(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add intermediate pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= 1 || i >= totalPages) continue;
      
      pages.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink 
            onClick={() => setPage(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 3) {
      pages.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always include last page if there is more than one page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            onClick={() => setPage(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold leading-none tracking-tight">Guest List</div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="text-sm text-muted-foreground mb-4">
        Manage your wedding guests and their RSVP status
      </div>
      <Tabs defaultValue={currentTab} className="flex-1 flex flex-col" onValueChange={onTabChange}>
        <div className="mb-4">
          <TabsList className="w-auto inline-flex">
            <TabsTrigger value="all">All Guests</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="declined">Declined</TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1 h-[117px]">
          <TabsContent value="all" className="space-y-4 m-0">
            {paginatedGuests.length > 0 ? (
              paginatedGuests.map((guest) => (
                <GuestCard 
                  key={guest.id} 
                  guest={guest} 
                  onEdit={onEditGuest} 
                  onDelete={onDeleteGuest} 
                />
              ))
            ) : (
              <div className="text-center p-8 text-gray-500">
                No guests found matching your search.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="confirmed" className="space-y-4 m-0">
            {paginatedGuests.length > 0 ? (
              paginatedGuests.map((guest) => (
                <GuestCard 
                  key={guest.id} 
                  guest={guest} 
                  onEdit={onEditGuest} 
                  onDelete={onDeleteGuest} 
                />
              ))
            ) : (
              <div className="text-center p-8 text-gray-500">
                No confirmed guests found matching your search.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4 m-0">
            {paginatedGuests.length > 0 ? (
              paginatedGuests.map((guest) => (
                <GuestCard 
                  key={guest.id} 
                  guest={guest} 
                  onEdit={onEditGuest} 
                  onDelete={onDeleteGuest} 
                />
              ))
            ) : (
              <div className="text-center p-8 text-gray-500">
                No pending guests found matching your search.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="declined" className="space-y-4 m-0">
            {paginatedGuests.length > 0 ? (
              paginatedGuests.map((guest) => (
                <GuestCard 
                  key={guest.id} 
                  guest={guest} 
                  onEdit={onEditGuest} 
                  onDelete={onDeleteGuest} 
                />
              ))
            ) : (
              <div className="text-center p-8 text-gray-500">
                No declined guests found matching your search.
              </div>
            )}
          </TabsContent>
        </ScrollArea>

        {totalPages > 1 && (
          <Pagination className="mt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={prevPage} />
              </PaginationItem>
              
              {generatePaginationLinks()}
              
              <PaginationItem>
                <PaginationNext onClick={nextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </Tabs>
    </>
  );
};
