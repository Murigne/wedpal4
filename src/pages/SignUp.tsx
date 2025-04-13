
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Check, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import WedPalLogo from '@/components/WedPalLogo';
import HeartAnimation from '@/components/HeartAnimation';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const userColors = location.state?.userColors;
  
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
      console.log("Attempting to sign up with email:", email);
      const { data: { user }, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      console.log("User created successfully:", user?.id);
      console.log("Form data to save:", formData);
      
      if (user && formData) {
        try {
          console.log("Saving wedding details for user:", user.id);
          const { error: detailsError } = await supabase
            .from('wedding_details')
            .upsert({
              user_id: user.id,
              partner1_name: formData.partner1Name || '',
              partner2_name: formData.partner2Name || '',
              wedding_date: formData.weddingDate || '',
              hashtag: formData.hashtag || '',
              budget: formData.budget?.toString() || '',
              theme: formData.theme || '',
              guest_count: formData.guestCount?.toString() || '',
              honeymoon_destination: formData.honeymoonDestination || '',
              need_new_home: formData.needNewHome || 'No',
              colors: userColors ? JSON.stringify(userColors) : null,
              updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
          
          if (detailsError) {
            console.error('Error saving wedding details:', detailsError);
            toast({
              title: "Warning",
              description: "Account created but failed to save wedding details. Please update your profile later.",
              variant: "default",
            });
          } else {
            console.log("Wedding details saved successfully");
          }
        } catch (detailsError) {
          console.error('Exception saving wedding details:', detailsError);
        }
      } else {
        console.log("No user or form data available to save details");
      }
      
      toast({
        title: "Success",
        description: "Sign up successful! Please check your email for verification.",
        variant: "default",
      });
      
      // Force a session refresh
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        navigate('/dashboard', { 
          state: { 
            formData: formData,
            userColors: userColors
          } 
        });
      } else {
        // If no session (email confirmation required), go to login
        navigate('/login');
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
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
    navigate('/login');
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
      
      {/* Right side - Sign up form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          
          <form onSubmit={handleSignUp} className="space-y-6">
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
            
            <Button 
              type="submit" 
              className="wedding-button w-full py-6"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => navigate('/login')} 
                className="text-pink-500 hover:text-pink-700 font-medium"
              >
                Log in
              </button>
            </p>
            
            <div className="text-center text-xs text-gray-400 mt-6">
              Need assistance? Contact Support
            </div>
          </form>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default SignUp;
