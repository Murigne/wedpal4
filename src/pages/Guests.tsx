
import React, { useState } from 'react';
import { Users, Plus, Search, Check, X, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PageLayout from '@/components/dashboard/PageLayout';
import { useToast } from '@/hooks/use-toast';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'family' | 'friend' | 'colleague';
  side: 'partner1' | 'partner2' | 'both';
  rsvp: 'pending' | 'confirmed' | 'declined';
}

// Form schema for guest validation
const guestFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters" }),
  type: z.enum(['family', 'friend', 'colleague']),
  side: z.enum(['partner1', 'partner2', 'both']),
  rsvp: z.enum(['pending', 'confirmed', 'declined']),
});

type GuestFormValues = z.infer<typeof guestFormSchema>;

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

  const form = useForm<GuestFormValues>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'friend',
      side: 'partner1',
      rsvp: 'pending',
    }
  });

  const openAddDialog = () => {
    form.reset({
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
    form.reset(guest);
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

  // Filter guests based on current tab and search term
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentTab === 'all') return matchesSearch;
    return matchesSearch && guest.rsvp === currentTab;
  });

  const guestStats = {
    total: guests.length,
    confirmed: guests.filter(g => g.rsvp === 'confirmed').length,
    pending: guests.filter(g => g.rsvp === 'pending').length,
    declined: guests.filter(g => g.rsvp === 'declined').length,
  };
  
  // Guest type distribution for donut chart with count for each type
  const guestTypeData = [
    { name: 'Family', value: guests.filter(g => g.type === 'family').length, color: '#4ade80' },
    { name: 'Friends', value: guests.filter(g => g.type === 'friend').length, color: '#60a5fa' },
    { name: 'Colleagues', value: guests.filter(g => g.type === 'colleague').length, color: '#f472b6' },
  ];

  const getRsvpBadge = (rsvp: string) => {
    switch(rsvp) {
      case 'confirmed': 
        return <Badge className="bg-green-500 hover:bg-green-500"><Check className="w-3 h-3 mr-1" /> Confirmed</Badge>;
      case 'declined': 
        return <Badge className="bg-red-500 hover:bg-red-500"><X className="w-3 h-3 mr-1" /> Declined</Badge>;
      default: 
        return <Badge variant="outline" className="hover:bg-transparent">Pending</Badge>;
    }
  };

  return (
    <PageLayout 
      title="Guest List" 
      description="Manage and track your wedding guests"
      icon={<Users className="w-8 h-8" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
        <div className="md:col-span-4 space-y-6 flex flex-col">
          <Card className="flex-shrink-0">
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
              
              <Button className="w-full" onClick={openAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Guest
              </Button>
            </CardContent>
          </Card>
          
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Guest Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full">
              <div className="h-[220px] w-full flex items-center">
                <div className="w-1/2">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={guestTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        strokeWidth={3}
                        stroke="#ffffff"
                      >
                        {guestTypeData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' }}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="w-1/2 pl-4 flex flex-col justify-center">
                  {guestTypeData.map((entry, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                      <div className="text-sm font-medium">{entry.name}</div>
                      <div className="ml-auto font-bold">{entry.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card className="h-full flex flex-col">
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
            <CardContent className="flex-1 overflow-hidden flex flex-col">
              <Tabs defaultValue="all" className="flex-1 flex flex-col" onValueChange={setCurrentTab}>
                <div className="mb-4">
                  <TabsList className="w-auto inline-flex">
                    <TabsTrigger value="all">All Guests</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="declined">Declined</TabsTrigger>
                  </TabsList>
                </div>
                
                <ScrollArea className="flex-1 h-[calc(100vh-350px)]">
                  <TabsContent value="all" className="space-y-4 m-0">
                    {filteredGuests.length > 0 ? (
                      filteredGuests.map((guest) => (
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
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(guest)} className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteGuest(guest.id)} className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-8 text-gray-500">
                        No guests found matching your search.
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="confirmed" className="space-y-4 m-0">
                    {filteredGuests.length > 0 ? (
                      filteredGuests.map((guest) => (
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
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(guest)} className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteGuest(guest.id)} className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-8 text-gray-500">
                        No confirmed guests found matching your search.
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="pending" className="space-y-4 m-0">
                    {filteredGuests.length > 0 ? (
                      filteredGuests.map((guest) => (
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
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(guest)} className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteGuest(guest.id)} className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-8 text-gray-500">
                        No pending guests found matching your search.
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="declined" className="space-y-4 m-0">
                    {filteredGuests.length > 0 ? (
                      filteredGuests.map((guest) => (
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
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(guest)} className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteGuest(guest.id)} className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-8 text-gray-500">
                        No declined guests found matching your search.
                      </div>
                    )}
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Guest Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Guest" : "Add New Guest"}</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email address" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="colleague">Colleague</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="side"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Side</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select side" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="partner1">Partner 1</SelectItem>
                          <SelectItem value="partner2">Partner 2</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rsvp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RSVP Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="declined">Declined</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editMode ? "Update Guest" : "Add Guest"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Guests;
