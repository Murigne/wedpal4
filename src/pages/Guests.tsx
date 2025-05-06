
import React, { useState } from 'react';
import { Users, Plus, Search, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/dashboard/PageLayout';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'family' | 'friend' | 'colleague';
  side: 'partner1' | 'partner2' | 'both';
  rsvp: 'pending' | 'confirmed' | 'declined';
}

const Guests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [guests, setGuests] = useState<Guest[]>([
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '233-550-1234', type: 'family', side: 'partner1', rsvp: 'confirmed' },
    { id: '2', name: 'Mary Johnson', email: 'mary@example.com', phone: '233-551-5678', type: 'family', side: 'partner2', rsvp: 'confirmed' },
    { id: '3', name: 'David Williams', email: 'david@example.com', phone: '233-552-9012', type: 'friend', side: 'partner1', rsvp: 'pending' },
    { id: '4', name: 'Sarah Brown', email: 'sarah@example.com', phone: '233-553-3456', type: 'friend', side: 'partner2', rsvp: 'pending' },
    { id: '5', name: 'Michael Davis', email: 'michael@example.com', phone: '233-554-7890', type: 'colleague', side: 'partner1', rsvp: 'declined' },
  ]);

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const guestStats = {
    total: guests.length,
    confirmed: guests.filter(g => g.rsvp === 'confirmed').length,
    pending: guests.filter(g => g.rsvp === 'pending').length,
    declined: guests.filter(g => g.rsvp === 'declined').length,
  };

  const getRsvpBadge = (rsvp: string) => {
    switch(rsvp) {
      case 'confirmed': 
        return <Badge className="bg-green-500"><Check className="w-3 h-3 mr-1" /> Confirmed</Badge>;
      case 'declined': 
        return <Badge className="bg-red-500"><X className="w-3 h-3 mr-1" /> Declined</Badge>;
      default: 
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <PageLayout 
      title="Guest List" 
      description="Manage and track your wedding guests"
      icon={<Users className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">{guestStats.total}</p>
                  <p className="text-sm text-blue-700">Total Guests</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">{guestStats.confirmed}</p>
                  <p className="text-sm text-green-700">Confirmed</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-yellow-600">{guestStats.pending}</p>
                  <p className="text-sm text-yellow-700">Pending</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-red-600">{guestStats.declined}</p>
                  <p className="text-sm text-red-700">Declined</p>
                </div>
              </div>
              
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add New Guest
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Guest List</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search guests..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>
                Manage your wedding guests and their RSVP status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Guests</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="declined">Declined</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {filteredGuests.map((guest) => (
                    <div key={guest.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                      <div>
                        <h3 className="font-medium">{guest.name}</h3>
                        <p className="text-sm text-gray-500">{guest.email} · {guest.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {guest.type.charAt(0).toUpperCase() + guest.type.slice(1)}
                        </Badge>
                        {getRsvpBadge(guest.rsvp)}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="confirmed">
                  {/* Content for confirmed guests */}
                </TabsContent>
                
                <TabsContent value="pending">
                  {/* Content for pending guests */}
                </TabsContent>
                
                <TabsContent value="declined">
                  {/* Content for declined guests */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Guests;
