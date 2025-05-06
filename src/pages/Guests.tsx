
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/dashboard/PageLayout';
import { Guest } from '@/types/guest';
import { GuestList } from '@/components/guests/GuestList';
import { GuestSummary } from '@/components/guests/GuestSummary';
import { GuestForm, GuestFormValues } from '@/components/guests/GuestForm';

const Guests = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [guests, setGuests] = useState<Guest[]>([
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '233-550-1234', type: 'family', side: 'partner1', rsvp: 'confirmed' },
    { id: '2', name: 'Mary Johnson', email: 'mary@example.com', phone: '233-551-5678', type: 'family', side: 'partner2', rsvp: 'confirmed' },
    { id: '3', name: 'David Williams', email: 'david@example.com', phone: '233-552-9012', type: 'friend', side: 'partner1', rsvp: 'pending' },
    { id: '4', name: 'Sarah Brown', email: 'sarah@example.com', phone: '233-553-3456', type: 'friend', side: 'partner2', rsvp: 'pending' },
    { id: '5', name: 'Michael Davis', email: 'michael@example.com', phone: '233-554-7890', type: 'colleague', side: 'partner1', rsvp: 'declined' },
    { id: '6', name: 'Emma Wilson', email: 'emma@example.com', phone: '233-555-1234', type: 'friend', side: 'both', rsvp: 'confirmed' },
    { id: '7', name: 'Robert Taylor', email: 'robert@example.com', phone: '233-556-5678', type: 'colleague', side: 'partner2', rsvp: 'pending' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<GuestFormValues>({
    name: '',
    email: '',
    phone: '',
    type: 'friend',
    side: 'partner1',
    rsvp: 'pending',
  });

  const openAddDialog = () => {
    setCurrentGuest({
      name: '',
      email: '',
      phone: '',
      type: 'friend',
      side: 'partner1',
      rsvp: 'pending',
    });
    setEditMode(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (guest: Guest) => {
    setCurrentGuest(guest);
    setEditMode(true);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: GuestFormValues) => {
    if (editMode) {
      // Update existing guest
      setGuests(guests.map(guest => guest.id === values.id ? { ...values } as Guest : guest));
      toast({
        title: "Guest Updated",
        description: `${values.name}'s information has been updated.`
      });
    } else {
      // Add new guest with unique ID
      const newGuest = {
        ...values,
        id: Date.now().toString(),
      } as Guest;
      setGuests([...guests, newGuest]);
      toast({
        title: "Guest Added",
        description: `${values.name} has been added to your guest list.`
      });
    }
    setIsDialogOpen(false);
  };

  const deleteGuest = (id: string) => {
    const guestName = guests.find(g => g.id === id)?.name;
    setGuests(guests.filter(guest => guest.id !== id));
    toast({
      title: "Guest Removed",
      description: `${guestName} has been removed from your guest list.`
    });
  };

  // Calculate guest statistics
  const guestStats = {
    total: guests.length,
    confirmed: guests.filter(g => g.rsvp === 'confirmed').length,
    pending: guests.filter(g => g.rsvp === 'pending').length,
    declined: guests.filter(g => g.rsvp === 'declined').length,
  };
  
  // Guest type distribution for donut chart with count for each type
  const guestTypeData = [
    { name: 'Family', value: guests.filter(g => g.type === 'family').length, color: '#4d79ff' },
    { name: 'Friends', value: guests.filter(g => g.type === 'friend').length, color: '#00cccc' },
    { name: 'Colleagues', value: guests.filter(g => g.type === 'colleague').length, color: '#e066ff' },
  ];

  return (
    <PageLayout 
      title="Guest List" 
      description="Manage and track your wedding guests"
      icon={<Users className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-170px)]">
        <div className="md:col-span-4">
          <GuestSummary 
            stats={guestStats} 
            typeData={guestTypeData}
            onAddGuest={openAddDialog}
          />
        </div>
        
        <div className="md:col-span-8">
          <Card className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden flex flex-col p-6">
              <GuestList 
                guests={guests}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onEditGuest={openEditDialog}
                onDeleteGuest={deleteGuest}
                currentTab={currentTab}
                onTabChange={setCurrentTab}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Add/Edit Guest Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Guest" : "Add New Guest"}</DialogTitle>
          </DialogHeader>
          
          <GuestForm 
            defaultValues={currentGuest}
            onSubmit={onSubmit}
            onCancel={() => setIsDialogOpen(false)}
            editMode={editMode}
          />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Guests;
