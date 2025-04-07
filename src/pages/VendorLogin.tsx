
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, Store } from 'lucide-react';
import WedPalLogo from '@/components/WedPalLogo';

const VendorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Check if the user is a vendor
      const { data: vendorData, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', data.user?.id)
        .single();
        
      if (vendorError && vendorError.code !== 'PGRST116') {
        throw vendorError;
      }
      
      if (!vendorData) {
        // Not a vendor, sign them out
        await supabase.auth.signOut();
        throw new Error("This account is not registered as a vendor. Please use the vendor registration page.");
      }
      
      toast({
        title: "Success",
        description: "Login successful!",
        variant: "default",
      });
      
      navigate('/vendor-dashboard');
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

  const handleSignupClick = () => {
    navigate('/vendor-signup');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <WedPalLogo className="text-4xl" />
          </div>
          <h1 className="text-2xl font-bold">Vendor Login</h1>
          <p className="text-gray-600 mt-2">Access your vendor dashboard</p>
        </div>
        
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
                placeholder="business@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <button 
                type="button" 
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </button>
            </div>
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
          
          <Button 
            type="submit" 
            className="w-full py-6 bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have a vendor account yet?
            </p>
            <button 
              type="button"
              onClick={handleSignupClick} 
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Register as a Vendor
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => navigate('/')}
            >
              <Store className="h-5 w-5" />
              <span>Go to WedPal for Couples</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorLogin;
