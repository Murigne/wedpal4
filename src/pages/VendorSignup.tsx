
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, Building, Phone } from 'lucide-react';
import WedPalLogo from '@/components/WedPalLogo';
import HeartAnimation from '@/components/HeartAnimation';

const vendorCategories = [
  'Venue',
  'Catering',
  'Photography',
  'Videography',
  'Wedding Planner',
  'Florist',
  'Music & Entertainment',
  'Cake & Desserts',
  'Wedding Attire',
  'Jewelry',
  'Hair & Makeup',
  'Transportation',
  'Invitations & Stationery',
  'Decor & Lighting',
  'Rentals',
  'Favors & Gifts',
  'Other'
];

const VendorSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions to continue",
        variant: "destructive",
      });
      return;
    }
    
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
      // Placeholder for Supabase integration
      // const { error } = await supabase.auth.signUp({ email, password });
      
      // if (error) throw error;
      
      toast({
        title: "Success",
        description: "Sign up successful! Please check your email for verification.",
        variant: "default",
      });
      
      setTimeout(() => {
        navigate('/vendor-login');
      }, 2000);
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

  const handleLoginClick = () => {
    navigate('/vendor-login');
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
            ✨ Join our network of premium wedding vendors and reach thousands of engaged couples!
            <br /><br />
            ✨ Create a beautiful vendor profile to showcase your services and pricing
            <br /><br />
            ✨ Receive leads directly from couples planning their weddings
            <br /><br />
            ✨ Manage bookings, communications, and reviews all in one place
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Increased Visibility</h3>
              <p className="text-sm">Get discovered by couples actively planning their weddings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Booking Management</h3>
              <p className="text-sm">Streamline your booking process with our platform</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Verified Reviews</h3>
              <p className="text-sm">Build your reputation with reviews from real couples</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-sm">Track performance and optimize your business</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Vendor Sign Up</h1>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Business Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Business Category
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {vendorCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
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
            
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <Label 
                htmlFor="terms" 
                className="text-sm text-gray-600 font-normal leading-tight"
              >
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="wedding-button w-full py-6"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Vendor Account"}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Already have a vendor account?{" "}
              <button 
                type="button"
                onClick={handleLoginClick} 
                className="text-pink-500 hover:text-pink-700 font-medium"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default VendorSignup;
