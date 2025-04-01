
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const formData = location.state?.formData;
  
  useEffect(() => {
    // Check if we were directed here from onboarding
    if (location.state?.isSignUp) {
      setIsSignUp(true);
    }
    
    // Redirect authenticated users
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate, location.state]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        // If we have form data, save it when the user signs up
        if (formData && !error) {
          await saveUserData();
        }
        
        toast({
          title: "Success",
          description: "Sign up successful! Please check your email for verification.",
          variant: "default",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
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
  
  const saveUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !formData) return;
    
    try {
      const { error } = await supabase
        .from('wedding_details')
        .upsert({
          user_id: session.user.id,
          partner1_name: formData.partner1Name,
          partner2_name: formData.partner2Name,
          wedding_date: formData.weddingDate,
          budget: formData.budget,
          theme: formData.theme,
          guest_count: formData.guestCount,
          honeymoon_destination: formData.honeymoonDestination,
          need_new_home: formData.needNewHome,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving wedding details:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden animated-gradient">
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
