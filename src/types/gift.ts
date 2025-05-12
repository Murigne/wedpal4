
export interface GiftItem {
  id: string;
  name: string;
  price: number;
  link: string;
  category: string;
  purchased: boolean;
  priority: 'high' | 'medium' | 'low';
}
