
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Calendar, Users, Sparkles, Check } from 'lucide-react';
import WedPalLogo from '@/components/WedPalLogo';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate('/onboarding');
  };

  const handleVendorSignupClick = () => {
    navigate('/vendor-signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Planning",
      description: "AI-powered recommendations tailored to your unique love story"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Timeline Management",
      description: "Stay organized with intelligent scheduling and milestone tracking"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Guest Coordination",
      description: "Effortlessly manage RSVPs, dietary preferences, and seating arrangements"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Vendor Marketplace",
      description: "Connect with top-rated vendors who understand your vision"
    }
  ];

  const testimonials = [
    {
      quote: "WedPal made planning our dream wedding stress-free and magical!",
      author: "Sarah & Michael",
      location: "San Francisco, CA"
    },
    {
      quote: "The AI recommendations were spot-on. We couldn't be happier!",
      author: "Emma & James",
      location: "Austin, TX"
    },
    {
      quote: "From budget tracking to vendor selection, everything was seamless.",
      author: "Lisa & David",
      location: "New York, NY"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative z-10 w-full py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <WedPalLogo className="text-3xl md:text-4xl text-pink-600 font-bold" linkToHome={true} />
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleLoginClick}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
            >
              Login
            </Button>
            <Button 
              onClick={handleVendorSignupClick}
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              For Vendors
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Plan Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"> Dream Wedding</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              From "yes" to "I do" - let AI guide you through every magical moment of your wedding planning journey
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                onClick={handleStartPlanning}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Planning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 text-lg rounded-full hover:bg-gray-50 transition-all duration-300"
              >
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-100 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-100 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-100 rounded-full opacity-50 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to make your wedding planning experience joyful and stress-free
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Love Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real couples, real results, real happiness
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="w-4 h-4 text-pink-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Planning?
            </h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Join thousands of couples who've planned their perfect wedding with WedPal
            </p>
            
            <Button 
              onClick={handleStartPlanning}
              size="lg"
              className="bg-white text-pink-600 hover:bg-gray-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Planning Today
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-pink-100">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>AI-powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Expert support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <WedPalLogo className="text-2xl text-white mb-4" />
          <p className="text-gray-400">
            Making wedding planning magical, one love story at a time
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
