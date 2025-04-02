
import { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
};

type Session = {
  user: User;
  access_token: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: false,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mock sign in function - we'll replace this with Supabase later
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simple validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Demo user
      const mockUser = {
        id: '1234',
        email: email,
        name: email.split('@')[0],
      };
      
      const mockSession = {
        user: mockUser,
        access_token: 'mock-token-' + Date.now(),
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('wedpal_user', JSON.stringify(mockUser));
      localStorage.setItem('wedpal_session', JSON.stringify(mockSession));
      
      // Update state
      setUser(mockUser);
      setSession(mockSession);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign out function - we'll replace this with Supabase later
  const signOut = async () => {
    try {
      localStorage.removeItem('wedpal_user');
      localStorage.removeItem('wedpal_session');
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
