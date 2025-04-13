
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  useEffect(() => {
    if (location.state?.message) {
      toast({
        title: "Info",
        description: location.state.message,
        variant: "default",
      });
      
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      await signIn(email, password);
      
      toast({
        title: "Success",
        description: "Login successful!",
        variant: "default",
      });
      
      // Check if this is a vendor account
      const isVendorPath = location.pathname.includes('vendor');
      
      if (isVendorPath) {
        // User is logging in from vendor login page, check if they're actually a vendor
        const { data: vendorData, error: vendorError } = await supabase
          .from('vendors')
          .select('*')
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
          .single();
          
        if (vendorError && vendorError.code !== 'PGRST116') {
          console.error('Error checking vendor status:', vendorError);
        }
        
        if (vendorData) {
          navigate('/vendor-dashboard');
        } else {
          // Logged in from vendor page but not a vendor
          toast({
            title: "Not a vendor",
            description: "This account is not registered as a vendor. Redirecting to couple's dashboard.",
            variant: "default",
          });
          navigate('/dashboard');
        }
      } else {
        // Check if user is a vendor when logging in from regular login
        const { data: vendorData, error: vendorError } = await supabase
          .from('vendors')
          .select('*')
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
          .single();
          
        if (vendorError && vendorError.code !== 'PGRST116') {
          console.error('Error checking vendor status:', vendorError);
        }
        
        if (vendorData) {
          // User is a vendor
          navigate('/vendor-dashboard');
        } else {
          // Regular user
          navigate('/dashboard');
        }
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error.message || "Login failed. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    if (location.pathname.includes('vendor')) {
      navigate('/vendor-signup');
    } else {
      navigate('/');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
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
  );
};

export default LoginForm;
