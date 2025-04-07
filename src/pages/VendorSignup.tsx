
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Check, Mail, Lock, Eye, EyeOff, Store, MapPin, Phone } from 'lucide-react';
import WedPalLogo from '@/components/WedPalLogo';

const VendorSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            user_type: 'vendor'
          }
        }
      });
      
      if (error) throw error;
      
      if (user) {
        await saveVendorData(user.id);
      }
      
      toast({
        title: "Success",
        description: "Vendor registration successful! Please check your email for verification.",
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
  
  const saveVendorData = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .upsert({
          user_id: userId,
          business_name: businessName,
          location: location,
          phone_number: phoneNumber,
          vendor_type: vendorType,
          approved: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving vendor details:', error);
      throw error;
    }
  };

  const handleLoginClick = () => {
    navigate('/vendor-login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white">
        <div className="mb-8">
          <WedPalLogo className="text-4xl md:text-5xl mb-2" />
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Partner With Us</h2>
          
          <p className="text-base md:text-lg mb-8 opacity-90 leading-relaxed">
            ✨ Join our platform to showcase your services to couples planning their weddings
            <br /><br />
            ✨ Get more bookings and expand your business with minimal effort
            <br /><br />
            ✨ Connect with couples who are specifically looking for your services
            <br /><br />
            ✨ Easy-to-use dashboard to manage your offerings and bookings
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-3">
                <Check className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">Increased Visibility</span>
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-3">
                <Check className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">More Bookings</span>
            </li>
            <li className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-3">
                <Check className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg">Easy Management</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Vendor Registration</h1>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Store className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Your Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="vendorType" className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Type
              </label>
              <select
                id="vendorType"
                value={vendorType}
                onChange={(e) => setVendorType(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Vendor Type</option>
                <option value="venue">Venue</option>
                <option value="catering">Catering</option>
                <option value="photography">Photography</option>
                <option value="videography">Videography</option>
                <option value="decor">Decoration</option>
                <option value="music">Music & Entertainment</option>
                <option value="florist">Florist</option>
                <option value="cake">Cake & Desserts</option>
                <option value="transportation">Transportation</option>
                <option value="attire">Wedding Attire</option>
                <option value="makeup">Hair & Makeup</option>
                <option value="planning">Wedding Planning</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="location"
                  type="text"
                  placeholder="City, Region"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register as Vendor"}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Already have a vendor account?{" "}
              <button 
                type="button"
                onClick={handleLoginClick} 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
