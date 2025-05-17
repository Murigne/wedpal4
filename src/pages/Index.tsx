
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingSearchBox from '@/components/LandingSearchBox';
import HeartAnimation from '@/components/HeartAnimation';
import WedPalLogo from '@/components/WedPalLogo';
import { ChevronRight, Heart, Calendar, UserRound, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .dynamic-gradient {
        background: var(--dynamic-gradient, linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab));
        background-size: 400% 400%;
      }
      
      .gradient-overlay {
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        pointer-events: none;
      }
      
      .feature-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  const handleVendorSignupClick = () => {
    navigate('/vendor-signup');
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex flex-col relative overflow-x-hidden">
      {/* Background animation */}
      <HeartAnimation avoidTextAreas={true} count={15} />
      
      {/* Navigation Header */}
      <header className="w-full flex justify-between items-center px-6 md:px-12 py-6 z-10 relative">
        <WedPalLogo className="text-4xl md:text-5xl text-white drop-shadow-lg" />
        
        <div className="flex items-center gap-3 md:gap-6">
          <Button 
            variant="ghost" 
            onClick={handleLoginClick}
            className="text-white hover:bg-white/20"
          >
            Log in
          </Button>
          
          <Button 
            onClick={handleVendorSignupClick}
            variant="outline"
            className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
          >
            Become a Vendor
          </Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 md:px-12 py-12 md:py-24 text-center z-10">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            Your Dream Wedding, Planned with <span className="font-satisfy">Love</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Plan your perfect wedding day with WedPal's AI-powered platform. 
            From venues to vendors, budgets to guest lists, we make wedding planning easy and enjoyable.
          </p>
          
          <Button 
            onClick={handleGetStartedClick}
            size="lg" 
            className="px-8 py-6 bg-white text-pink-600 hover:bg-white/90 rounded-full text-lg font-medium"
          >
            Get Started <ChevronRight className="ml-2" />
          </Button>
        </motion.div>
      </section>
      
      {/* Search Box Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-0 z-10 mb-12">
        <LandingSearchBox />
      </section>
      
      {/* Features Section */}
      <section className="bg-white/90 backdrop-blur-md py-16 md:py-24 px-6 md:px-12 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need For Your Special Day
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              WedPal combines intelligent tools with beautiful design to make wedding planning a delightful experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Feature 1 */}
            <motion.div variants={fadeIn}>
              <Card className="feature-card h-full border-none shadow-md bg-gradient-to-br from-pink-50 to-white">
                <CardContent className="pt-6 flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-6">
                    <Heart className="text-pink-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI Wedding Planning</h3>
                  <p className="text-gray-600">
                    Our intelligent assistant helps create personalized wedding plans based on your preferences and budget.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={fadeIn}>
              <Card className="feature-card h-full border-none shadow-md bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="pt-6 flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                    <UserRound className="text-blue-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Guest Management</h3>
                  <p className="text-gray-600">
                    Easily manage your guest list, track RSVPs, and organize seating arrangements all in one place.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={fadeIn}>
              <Card className="feature-card h-full border-none shadow-md bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="pt-6 flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                    <Calendar className="text-purple-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Vendor Marketplace</h3>
                  <p className="text-gray-600">
                    Find and book trusted vendors that match your style and budget with our curated marketplace.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How WedPal Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plan your wedding in three simple steps
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Step 1 */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Share your preferences, budget, and wedding details to get personalized recommendations.
              </p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Explore & Plan</h3>
              <p className="text-gray-600">
                Use our tools to manage guests, find vendors, create timelines, and track your budget.
              </p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Celebrate Your Day</h3>
              <p className="text-gray-600">
                Enjoy a stress-free wedding day with everything perfectly organized and planned.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Love Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from couples who planned their perfect day with WedPal
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Testimonial 1 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-md">
                <CardContent className="pt-6 p-8">
                  <div className="mb-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Heart key={star} fill="#e73c7e" className="w-4 h-4 mr-1" />
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-6">
                    "WedPal made planning our destination wedding so much easier. The AI suggestions saved us countless hours of research!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-pink-500">J&amp;M</span>
                    </div>
                    <div>
                      <p className="font-medium">Jessica &amp; Michael</p>
                      <p className="text-sm text-gray-500">Married May 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-md">
                <CardContent className="pt-6 p-8">
                  <div className="mb-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Heart key={star} fill="#e73c7e" className="w-4 h-4 mr-1" />
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-6">
                    "The guest management feature was a lifesaver! We could track RSVPs, dietary requirements, and send updates all in one place."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-pink-500">R&amp;J</span>
                    </div>
                    <div>
                      <p className="font-medium">Robert &amp; Julia</p>
                      <p className="text-sm text-gray-500">Married January 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-none shadow-md">
                <CardContent className="pt-6 p-8">
                  <div className="mb-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Heart key={star} fill="#e73c7e" className="w-4 h-4 mr-1" />
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-6">
                    "I loved how WedPal helped us stay on budget. The expense tracking and vendor comparison tools saved us thousands!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-pink-500">S&amp;T</span>
                    </div>
                    <div>
                      <p className="font-medium">Sarah &amp; Thomas</p>
                      <p className="text-sm text-gray-500">Married March 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="animated-gradient py-16 md:py-24 px-6 md:px-12 text-center z-10 relative">
        <HeartAnimation avoidTextAreas={true} count={8} />
        <motion.div
          className="max-w-3xl mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-md">
            Start Planning Your Perfect Wedding Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy couples who planned their dream wedding with WedPal
          </p>
          <Button 
            onClick={handleGetStartedClick}
            size="lg" 
            className="px-8 py-6 bg-white text-pink-600 hover:bg-white/90 rounded-full text-lg font-medium"
          >
            Get Started Free <ChevronRight className="ml-2" />
          </Button>
          <p className="text-white/80 text-sm mt-4">No credit card required</p>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6 md:px-12 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <WedPalLogo className="text-3xl mb-4" />
            <p className="text-gray-400">
              Your AI-powered wedding planning companion
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Planning</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guest Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Vendor Marketplace</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Budget Tracking</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} WedPal. All rights reserved.</p>
        </div>
      </footer>
      
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Index;
