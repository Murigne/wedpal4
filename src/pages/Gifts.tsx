
import React, { useState } from 'react';
import { Gift, Plus, Heart, Link, ExternalLink, Edit, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PageLayout from '@/components/dashboard/PageLayout';

interface GiftItem {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  category: string;
  purchased: boolean;
  priority: 'high' | 'medium' | 'low';
}

const Gifts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [giftItems, setGiftItems] = useState<GiftItem[]>([
    { 
      id: '1', 
      name: 'Stand Mixer', 
      price: 350, 
      image: 'https://placehold.co/300x200', 
      link: 'https://example.com/mixer', 
      category: 'kitchen', 
      purchased: false, 
      priority: 'high' 
    },
    { 
      id: '2', 
      name: 'Luxury Bedding Set', 
      price: 200, 
      image: 'https://placehold.co/300x200', 
      link: 'https://example.com/bedding', 
      category: 'bedroom', 
      purchased: true, 
      priority: 'medium' 
    },
    { 
      id: '3', 
      name: 'Smart TV', 
      price: 800, 
      image: 'https://placehold.co/300x200', 
      link: 'https://example.com/tv', 
      category: 'electronics', 
      purchased: false, 
      priority: 'low' 
    },
    { 
      id: '4', 
      name: 'Honeymoon Fund', 
      price: 1000, 
      image: 'https://placehold.co/300x200', 
      link: 'https://example.com/honeymoon', 
      category: 'experience', 
      purchased: false, 
      priority: 'high' 
    },
  ]);

  const togglePurchased = (itemId: string) => {
    setGiftItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, purchased: !item.purchased } : item
      )
    );
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 space-y-6">
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
              
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Gift Item
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Share Your Registry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input value="https://wedpal.com/registry/smith-johnson" readOnly />
                <Button variant="outline" size="icon">
                  <Link className="h-4 w-4" />
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
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Gift Registry</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <CardDescription>
                Manage your wedding gift wishlist
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="unpurchased">Unpurchased</TabsTrigger>
                  <TabsTrigger value="purchased">Purchased</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {giftItems.map((item) => (
                    <Card key={item.id} className={item.purchased ? "opacity-60" : ""}>
                      <div className="aspect-video w-full overflow-hidden">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
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
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500">
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
                
                <TabsContent value="unpurchased">
                  {/* Content for unpurchased gifts */}
                </TabsContent>
                
                <TabsContent value="purchased">
                  {/* Content for purchased gifts */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Gifts;
