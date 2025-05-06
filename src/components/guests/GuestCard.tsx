
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { Guest } from '@/types/guest';

interface GuestCardProps {
  guest: Guest;
  onEdit: (guest: Guest) => void;
  onDelete: (id: string) => void;
}

export const GuestCard: React.FC<GuestCardProps> = ({ guest, onEdit, onDelete }) => {
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
    <div className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
      <div>
        <h3 className="font-medium">{guest.name}</h3>
        <p className="text-sm text-gray-500">{guest.email} · {guest.phone}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {guest.type.charAt(0).toUpperCase() + guest.type.slice(1)}
        </Badge>
        {getRsvpBadge(guest.rsvp)}
        <Button variant="ghost" size="icon" onClick={() => onEdit(guest)} className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(guest.id)} className="h-8 w-8 text-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
