
/// <reference types="vite/client" />

// Define the Supabase database schema types manually since we can't modify the types.ts file
interface WeddingDetail {
  id: string;
  user_id: string;
  partner1_name: string | null;
  partner2_name: string | null;
  wedding_date: string | null;
  budget: string | null;
  theme: string | null;
  guest_count: string | null;
  hashtag: string | null;
  honeymoon_destination: string | null;
  need_new_home: string | null;
  colors: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  vendor_type: string;
  location: string | null;
  phone_number: string | null;
  approved: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

// Extend the Database type to include our tables
declare module '@supabase/supabase-js' {
  interface Database {
    public: {
      Tables: {
        wedding_details: {
          Row: WeddingDetail;
          Insert: Omit<WeddingDetail, 'id' | 'created_at' | 'updated_at'> & { 
            id?: string;
            created_at?: string;
            updated_at?: string;
          };
          Update: Partial<Omit<WeddingDetail, 'id'>> & { id?: string };
        };
        vendors: {
          Row: Vendor;
          Insert: Omit<Vendor, 'id' | 'created_at' | 'updated_at'> & { 
            id?: string;
            created_at?: string;
            updated_at?: string;
          };
          Update: Partial<Omit<Vendor, 'id'>> & { id?: string };
        };
      };
    };
  }
}
