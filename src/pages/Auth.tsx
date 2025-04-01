
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import FloatingHearts from '@/components/FloatingHearts';
import { toast } from '@/hooks/use-toast';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast({
          title: "Success",
          description: "Sign up successful! Please check your email for verification.",
          variant: "default",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden animated-gradient">
      <FloatingHearts count={15} />
      
      <div className="wedding-card w-full max-w-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          Forever <span className="text-wedding-pink-dark">Together</span>
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="wedding-input w-full"
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="wedding-input w-full"
            />
          </div>
          
          <Button type="submit" className="wedding-button w-full" disabled={loading}>
            <Heart className="w-5 h-5 mr-2" />
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Log In'}
          </Button>
          
          <div className="text-center mt-4">
            <button 
              type="button" 
              className="text-sm text-muted-foreground hover:text-wedding-pink-dark"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
