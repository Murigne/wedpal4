
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import WedPalLogo from '@/components/WedPalLogo';
import HeartAnimation from '@/components/HeartAnimation';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
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

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden animated-gradient">
      {/* WedPal Logo */}
      <div className="absolute top-6 left-8 z-10">
        <WedPalLogo className="drop-shadow-lg" />
      </div>
      
      <HeartAnimation />
      
      <div className="wedding-card w-full max-w-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          Welcome <span className="text-wedding-pink-dark">Back</span>
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-wedding-pink-dark" />
            </div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="wedding-input pl-10 w-full"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-wedding-pink-dark" />
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="wedding-input pl-10 w-full"
            />
          </div>
          
          <Button type="submit" className="wedding-button w-full" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          
          <div className="text-center mt-4">
            <button 
              type="button" 
              className="text-sm text-muted-foreground hover:text-wedding-pink-dark"
              onClick={handleSignUpClick}
            >
              Need an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
