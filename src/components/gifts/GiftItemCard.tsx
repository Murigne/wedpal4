
import React from 'react';
import { Edit, Trash, ExternalLink, Check, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GiftItem } from '@/types/gift';

interface GiftItemCardProps {
  item: GiftItem;
  onEdit: (item: GiftItem) => void;
  onDelete: (id: string) => void;
  onTogglePurchased: (id: string) => void;
}

const GiftItemCard: React.FC<GiftItemCardProps> = ({
  item,
  onEdit,
  onDelete,
  onTogglePurchased,
}) => {
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high': 
        return <Badge variant="outline" className="bg-red-50 text-red-500">High</Badge>;
      case 'medium': 
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-500">Medium</Badge>;
      case 'low': 
        return <Badge variant="outline" className="bg-blue-50 text-blue-500">Low</Badge>;
      default: 
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <Card className={item.purchased ? "opacity-60" : ""}>
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
          <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="text-red-500" onClick={() => onDelete(item.id)}>
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
            size="icon"
            variant="outline"
            onClick={() => onTogglePurchased(item.id)}
            className={`w-9 h-9 ${item.purchased ? "bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-600 border-green-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            {item.purchased ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GiftItemCard;
