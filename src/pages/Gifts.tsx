import React, { useState } from 'react';
import { Gift, Plus, Heart, Link as LinkIcon, ExternalLink, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/dashboard/PageLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface GiftItem {
  id: string;
  name: string;
  price: number;
  link: string;
  category: string;
  purchased: boolean;
  priority: 'high' | 'medium' | 'low';
}

const Gifts = () => {
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
  const [newGift, setNewGift] = useState({
    name: '',
    price: '',
    link: '',
    category: 'kitchen',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

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

  const copyRegistryLink = () => {
    navigator.clipboard.writeText("https://wedpal.com/registry/smith-johnson")
      .then(() => {
        toast({
          title: "Link Copied",
          description: "Registry link has been copied to your clipboard."
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Could not copy the link. Please try again."
        });
      });
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setNewGift({
      name: '',
      price: '',
      link: '',
      category: 'kitchen',
      priority: 'medium'
    });
    setIsAddEditDialogOpen(true);
  };

  const openEditDialog = (item: GiftItem) => {
    setEditingItem(item);
    setNewGift({
      name: item.name,
      price: item.price.toString(),
      link: item.link,
      category: item.category,
      priority: item.priority
    });
    setIsAddEditDialogOpen(true);
  };

  const handleAddEditGift = () => {
    if (newGift.name.trim() === '' || newGift.price.trim() === '') {
      toast({
        title: "Missing Information",
        description: "Please fill in the name and price of the gift."
      });
      return;
    }

    const giftData = {
      name: newGift.name,
      price: parseFloat(newGift.price),
      link: newGift.link,
      category: newGift.category,
      priority: newGift.priority,
      purchased: false
    };

    if (editingItem) {
      // Edit existing gift
      setGiftItems(items =>
        items.map(item =>
          item.id === editingItem.id ? { ...giftData, id: item.id, purchased: item.purchased } : item
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

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high': 
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium': 
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low': 
        return <Badge className="bg-blue-500">Low</Badge>;
      default: 
        return <Badge>Normal</Badge>;
    }
  };

  const filteredGiftItems = giftItems.filter(item => {
    if (currentTab === 'all') return true;
    if (currentTab === 'purchased') return item.purchased;
    if (currentTab === 'unpurchased') return !item.purchased;
    return true;
  });

  const stats = {
    total: giftItems.length,
    purchased: giftItems.filter(item => item.purchased).length,
    totalValue: giftItems.reduce((sum, item) => sum + item.price, 0),
    purchasedValue: giftItems.filter(item => item.purchased).reduce((sum, item) => sum + item.price, 0),
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
          <Card>
            <CardHeader>
              <CardTitle>Registry Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pink-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-pink-600">{stats.total}</p>
                  <p className="text-sm text-pink-700">Total Items</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">{stats.purchased}</p>
                  <p className="text-sm text-green-700">Purchased</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700 mb-1">Registry Value</p>
                <p className="text-2xl font-bold text-purple-600">GHS {stats.totalValue.toLocaleString()}</p>
                <p className="text-sm text-purple-700 mt-2">Purchased Value</p>
                <p className="text-xl font-medium text-purple-600">GHS {stats.purchasedValue.toLocaleString()}</p>
              </div>
              
              <Button className="w-full" onClick={openAddDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Gift Item
              </Button>
            </CardContent>
          </Card>
          
          {/* Share Registry Card */}
          <Card>
            <CardHeader>
              <CardTitle>Share Your Registry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input value="https://wedpal.com/registry/smith-johnson" readOnly />
                <Button variant="outline" size="icon" onClick={copyRegistryLink}>
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
              <Button className="w-full" variant="outline">
                <Heart className="w-4 h-4 mr-2 text-pink-500" />
                View Public Registry
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card className="h-full flex flex-col md:max-h-[695px]">
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
              <Tabs defaultValue="all" onValueChange={setCurrentTab} className="flex-1 flex flex-col">
                <div className="mb-4">
                  <TabsList className="inline-flex">
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="unpurchased">Unpurchased</TabsTrigger>
                    <TabsTrigger value="purchased">Purchased</TabsTrigger>
                  </TabsList>
                </div>
                
                <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
                  <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0">
                    {filteredGiftItems.map((item) => (
                      <Card key={item.id} className={item.purchased ? "opacity-60" : ""}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-medium ${item.purchased ? "line-through" : ""}`}>{item.name}</h3>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <p className="text-lg font-bold">GHS {item.price.toLocaleString()}</p>
                          <Badge variant="outline" className="mt-2">
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </Badge>
                        </CardContent>
                        <CardFooter className="flex justify-between p-4 pt-0">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleDeleteGift(item.id)}>
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button 
                              size="sm" 
                              variant={item.purchased ? "outline" : "default"}
                              onClick={() => togglePurchased(item.id)}
                            >
                              {item.purchased ? "Mark Unpurchased" : "Mark Purchased"}
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="unpurchased" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0">
                    {filteredGiftItems.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{item.name}</h3>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <p className="text-lg font-bold">GHS {item.price.toLocaleString()}</p>
                          <Badge variant="outline" className="mt-2">
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </Badge>
                        </CardContent>
                        <CardFooter className="flex justify-between p-4 pt-0">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleDeleteGift(item.id)}>
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => togglePurchased(item.id)}
                            >
                              Mark Purchased
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="purchased" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0">
                    {filteredGiftItems.map((item) => (
                      <Card key={item.id} className="opacity-60">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium line-through">{item.name}</h3>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <p className="text-lg font-bold">GHS {item.price.toLocaleString()}</p>
                          <Badge variant="outline" className="mt-2">
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </Badge>
                        </CardContent>
                        <CardFooter className="flex justify-between p-4 pt-0">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleDeleteGift(item.id)}>
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => togglePurchased(item.id)}
                            >
                              Mark Unpurchased
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Gift Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Gift" : "Add New Gift"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Gift Name</label>
              <Input 
                placeholder="Enter gift name" 
                value={newGift.name}
                onChange={e => setNewGift({...newGift, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Price (GHS)</label>
              <Input 
                type="number" 
                placeholder="Enter price" 
                value={newGift.price}
                onChange={e => setNewGift({...newGift, price: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Product Link</label>
              <Input 
                placeholder="https://example.com/product" 
                value={newGift.link}
                onChange={e => setNewGift({...newGift, link: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select 
                  value={newGift.category} 
                  onValueChange={(value) => setNewGift({...newGift, category: value})}
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
                  value={newGift.priority} 
                  onValueChange={(value: 'high' | 'medium' | 'low') => setNewGift({...newGift, priority: value})}
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
              onClick={() => setIsAddEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAddEditGift}>
              {editingItem ? "Update Gift" : "Add Gift"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Gifts;
