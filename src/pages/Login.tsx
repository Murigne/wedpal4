
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Check, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import WedPalLogo from '@/components/WedPalLogo';
import HeartAnimation from '@/components/HeartAnimation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "You've successfully logged in!",
      });
      
      // Explicitly navigate to dashboard after successful login
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row animated-gradient relative overflow-hidden">
      <HeartAnimation avoidTextAreas={true} />
      
      {/* Left side - Branding and features */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white relative z-10">
        <div className="mb-8">
          <WedPalLogo className="text-4xl md:text-5xl mb-2" />
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Where Love Brews</h2>
          
          <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed">
            ✨ WedPal takes the stress out of wedding planning, no matter your budget!
            <br /><br />
            ✨ From personalized plans to budget friendly vendors, we simplify every step of the wedding planning journey
            <br /><br />
            ✨ Our AI-powered platform ensures a seamless, beautiful, and memorable wedding experience.
            <br /><br />
            ✨ Weddings are fun - planning them should be equally fun and stress-free don't you think? 😊
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-3">
                <Check className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">Stress Free</span>
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-3">
                <Check className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">Budget Friendly & Personalized</span>
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-3">
                <Check className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">Memorable & Seamless Experience</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center h-5">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 cursor-pointer">Remember me</label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="wedding-button w-full py-6"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
              <LogIn className="w-4 h-4 ml-2" />
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={handleSignUpClick} 
                className="text-pink-500 hover:text-pink-700 font-medium"
              >
                Sign up
              </button>
            </p>
            
            <div className="text-center text-xs text-gray-400 mt-6">
              Need assistance? Contact Support
            </div>
          </form>
        </div>
      </div>
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Login;
