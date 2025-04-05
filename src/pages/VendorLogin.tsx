
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import WedPalLogo from '@/components/WedPalLogo';
import HeartAnimation from '@/components/HeartAnimation';

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
      // Placeholder for Supabase integration
      // const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      // if (error) throw error;
      
      toast({
        title: "Success",
        description: "Login successful!",
        variant: "default",
      });
      
      setTimeout(() => {
        navigate('/vendor-dashboard');
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
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
    <div className="min-h-screen flex flex-col md:flex-row animated-gradient relative overflow-hidden">
      <HeartAnimation avoidTextAreas={true} />
      
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white relative z-10">
        <div className="mb-8">
          <WedPalLogo className="text-4xl md:text-5xl mb-2" linkToHome={true} />
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Vendor Partner Program</h2>
          
          <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed">
            ✨ Join thousands of wedding vendors already using WedPal
            <br /><br />
            ✨ Connect with engaged couples actively planning their weddings
            <br /><br />
            ✨ Manage your bookings, schedule, and client communication all in one place
            <br /><br />
            ✨ Access powerful analytics to grow your wedding business
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-4">Why vendors love WedPal</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-wedding-pink mr-2 flex-shrink-0">•</span>
                <span>Average 30% increase in bookings within first 3 months</span>
              </li>
              <li className="flex items-start">
                <span className="text-wedding-pink mr-2 flex-shrink-0">•</span>
                <span>Dedicated support team for vendors</span>
              </li>
              <li className="flex items-start">
                <span className="text-wedding-pink mr-2 flex-shrink-0">•</span>
                <span>Simple pricing with no hidden fees</span>
              </li>
              <li className="flex items-start">
                <span className="text-wedding-pink mr-2 flex-shrink-0">•</span>
                <span>Tools to showcase your portfolio professionally</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Vendor Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Business Email
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-pink-500 hover:text-pink-700">
                  Forgot password?
                </a>
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
              className="wedding-button w-full py-6"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to Vendor Account"}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Don't have a vendor account yet?{" "}
              <button 
                type="button"
                onClick={handleSignupClick} 
                className="text-pink-500 hover:text-pink-700 font-medium"
              >
                Sign up
              </button>
            </p>
            
            <div className="text-center text-xs text-gray-400 mt-6">
              Need assistance? Contact Vendor Support
            </div>
          </form>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default VendorLogin;
