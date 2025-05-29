
import { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isVendor?: boolean;
  checkVendorStatus: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signOut: async () => {},
  checkVendorStatus: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVendor, setIsVendor] = useState<boolean | undefined>(undefined);

  const checkVendorStatus = async (): Promise<boolean> => {
    // Mock implementation without Supabase
    return false;
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock sign in without Supabase
      console.log("Mock sign in:", email);
      setUser({ id: '1', email });
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
      setUser(null);
      setIsVendor(undefined);
      console.log("User signed out");
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
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
