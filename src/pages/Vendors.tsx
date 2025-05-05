
import React, { useState } from 'react';
import NavigationSidebar from '@/components/dashboard/NavigationSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store } from 'lucide-react';
import { cn } from '@/lib/utils';

const Vendors = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="fixed top-0 left-0 h-full pt-[160px] pl-6 z-50 transition-all duration-300">
        <NavigationSidebar 
          isExpanded={sidebarExpanded}
          setIsExpanded={setSidebarExpanded}
        />
      </div>
      
      <div className={cn(
        "w-full animated-gradient dynamic-gradient relative transition-all duration-300",
        sidebarExpanded ? "ml-[220px]" : "ml-[60px]"
      )}>
        <main className="w-full px-6 md:px-6 py-8">
          <div className="mb-8 text-white max-w-[1600px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 flex items-center gap-2">
              <Store className="w-8 h-8" />
              Wedding Vendors
            </h1>
            <p className="text-white/80">
              Find and manage your wedding vendors in one place
            </p>
          </div>
          
          <div className={cn(
            "grid gap-6 max-w-[1600px] mx-auto",
            sidebarExpanded 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}>
            <Card>
              <CardHeader>
                <CardTitle>Photographers</CardTitle>
                <CardDescription>Find the perfect photographer for your special day</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Explore Photographers</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Venues</CardTitle>
                <CardDescription>Discover beautiful wedding venues</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Explore Venues</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Caterers</CardTitle>
                <CardDescription>Find caterers with delicious menus</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Explore Caterers</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Florists</CardTitle>
                <CardDescription>Beautiful floral arrangements for your wedding</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Explore Florists</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>DJs & Entertainment</CardTitle>
                <CardDescription>Music and entertainment options</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Explore Entertainment</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Wedding Planners</CardTitle>
                <CardDescription>Professional help for your wedding planning</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Explore Planners</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Vendors;
