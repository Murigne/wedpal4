
/// <reference types="vite/client" />

// Re-export the types from @supabase/supabase-js to make them available
declare module '@supabase/supabase-js' {
  export interface Session {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at?: number;
    refresh_token: string;
    user: User;
  }

  export interface User {
    id: string;
    aud: string;
    role?: string;
    email?: string;
    email_confirmed_at?: string;
    phone?: string;
    confirmed_at?: string;
    last_sign_in_at?: string;
    app_metadata: Record<string, any>;
    user_metadata: Record<string, any>;
    identities?: UserIdentity[];
    created_at: string;
    updated_at?: string;
  }

  export interface UserIdentity {
    id: string;
    user_id: string;
    identity_data?: Record<string, any>;
    provider: string;
    created_at?: string;
    updated_at?: string;
    email?: string;
  }

  export function createClient<T = any>(
    supabaseUrl: string,
    supabaseKey: string,
    options?: SupabaseClientOptions<T>
  ): SupabaseClient<T>;

  export interface SupabaseClient<T = any> {
    auth: {
      signInWithPassword(credentials: { email: string; password: string }): Promise<{
        data: { user: User | null; session: Session | null };
        error: any;
      }>;
      signOut(): Promise<{ error: any }>;
      getSession(): Promise<{ data: { session: Session | null }; error: any }>;
      onAuthStateChange(callback: (event: string, session: Session | null) => void): {
        data: { subscription: { unsubscribe: () => void } };
      };
    };
    from(table: string): {
      select(columns?: string): {
        eq(column: string, value: any): {
          single(): Promise<{ data: any; error: any }>;
        };
      };
    };
  }

  export interface SupabaseClientOptions<T = any> {
    auth?: {
      persistSession?: boolean;
      autoRefreshToken?: boolean;
      storage?: Storage;
    };
  }
}

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
