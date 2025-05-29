
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Calendar, Users, Sparkles, Star, CheckCircle } from 'lucide-react';
import HeartAnimation from '@/components/HeartAnimation';
import WedPalLogo from '@/components/WedPalLogo';

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
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleStartPlanning = () => {
    navigate('/onboarding');
  };

  const handleVendorSignupClick = () => {
    navigate('/vendor-signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 pt-8 z-10 w-full">
        <div className="w-full flex justify-between items-center px-8 md:px-12">
          <WedPalLogo className="text-4xl md:text-5xl text-white drop-shadow-lg" />
          
          <div className="flex gap-4">
            <Button 
              onClick={handleLoginClick}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Login
            </Button>
            <Button 
              onClick={handleVendorSignupClick}
              className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
            >
              Sign Up as a Vendor
            </Button>
          </div>
        </div>
      </header>
      
      <HeartAnimation avoidTextAreas={true} />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Plan Your Perfect
              <span className="block text-transparent bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text">
                Wedding Day
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-sm">
              AI-powered wedding planning that brings your dream celebration to life. 
              From venues to vendors, we handle every detail.
            </p>
            
            <Button 
              onClick={handleStartPlanning}
              size="lg"
              className="bg-white text-gray-900 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start Planning Your Wedding
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Everything You Need
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our AI assistant helps you plan every aspect of your special day
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "AI-Powered Planning",
                description: "Get personalized recommendations based on your style, budget, and preferences"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Timeline Management",
                description: "Stay organized with automated timelines and milestone tracking"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Vendor Marketplace",
                description: "Connect with verified vendors and manage all your bookings in one place"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-white mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 drop-shadow-lg">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Share Your Vision",
                description: "Tell us about your dream wedding through our simple chat interface"
              },
              {
                step: "2",
                title: "Get AI Recommendations",
                description: "Receive personalized suggestions for venues, vendors, and timeline"
              },
              {
                step: "3",
                title: "Plan & Execute",
                description: "Use our tools to manage your budget, guest list, and wedding day timeline"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 drop-shadow-lg">
            Love Stories
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "WedPal made planning our dream wedding so effortless. The AI recommendations were spot-on!",
                author: "Sarah & Michael",
                rating: 5
              },
              {
                quote: "From budget tracking to vendor management, everything was perfectly organized. Highly recommend!",
                author: "Emma & James",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                  ))}
                </div>
                <p className="text-white/90 mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-white font-semibold">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center relative">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of couples who have planned their perfect wedding with WedPal
          </p>
          
          <Button 
            onClick={handleStartPlanning}
            size="lg"
            className="bg-white text-gray-900 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Your Wedding Journey
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/20 relative">
        <div className="max-w-6xl mx-auto text-center">
          <WedPalLogo className="text-3xl text-white mb-6" />
          <p className="text-white/60 mb-8">
            Making wedding planning magical, one couple at a time.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Vendors</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/60">
              © 2024 WedPal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Index;
