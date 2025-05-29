
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isVendor?: boolean;
  checkVendorStatus: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: false,
  signIn: async () => {},
  signOut: async () => {},
  checkVendorStatus: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVendor, setIsVendor] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event);
        
        // Update session and user state
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Check vendor status on login
        if (event === 'SIGNED_IN' && newSession?.user) {
          console.log("User signed in successfully:", newSession.user.id);
          await checkVendorStatus();
        } else if (event === 'SIGNED_OUT') {
          setIsVendor(undefined);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession ? "Session found" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await checkVendorStatus();
      }
      
      setIsLoading(false);
    });

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkVendorStatus = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      console.log("Checking vendor status for user ID:", user.id);
      
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking vendor status:', error);
      }
      
      const vendorStatus = !!data;
      console.log("Vendor status result:", vendorStatus ? "Is vendor" : "Not a vendor");
      
      setIsVendor(vendorStatus);
      return vendorStatus;
    } catch (error) {
      console.error('Error checking vendor status:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log("Attempting to sign in:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      console.log("Sign in successful:", data.user?.id);
      
      // Check vendor status after login
      if (data.user) {
        await checkVendorStatus();
      }
      
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      console.log("User signed out");
      setIsVendor(undefined);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signIn, 
      signOut,
      isVendor,
      checkVendorStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
