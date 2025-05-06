
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'family' | 'friend' | 'colleague';
  side: 'partner1' | 'partner2' | 'both';
  rsvp: 'pending' | 'confirmed' | 'declined';
}

export interface GuestStats {
  total: number;
  confirmed: number;
  pending: number;
  declined: number;
}

export interface GuestTypeData {
  name: string;
  value: number;
  color: string;
}
