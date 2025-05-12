
import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GiftItem } from '@/types/gift';

interface RegistrySummaryCardProps {
  giftItems: GiftItem[];
  onAddItem: () => void;
}

const RegistrySummaryCard: React.FC<RegistrySummaryCardProps> = ({
  giftItems,
  onAddItem,
}) => {
  const stats = {
    total: giftItems.length,
    purchased: giftItems.filter(item => item.purchased).length,
    totalValue: giftItems.reduce((sum, item) => sum + item.price, 0),
    purchasedValue: giftItems.filter(item => item.purchased).reduce((sum, item) => sum + item.price, 0),
  };

  return (
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
        
        <Button className="w-full" onClick={onAddItem}>
          <Plus className="w-4 h-4 mr-2" />
          Add Gift Item
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegistrySummaryCard;
