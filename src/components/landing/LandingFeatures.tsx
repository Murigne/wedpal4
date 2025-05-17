
import React from 'react';
import { Calendar, Heart, Users, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Calendar className="h-10 w-10 text-pink-500" />,
    title: "Smart Timeline",
    description: "AI-generated wedding timelines based on your date and preferences, with task reminders and customizable schedules."
  },
  {
    icon: <Heart className="h-10 w-10 text-pink-500" />,
    title: "Personalized Themes",
    description: "Discover your perfect wedding style with AI-powered theme suggestions and customizable color palettes."
  },
  {
    icon: <Users className="h-10 w-10 text-pink-500" />,
    title: "Guest Management",
    description: "Easily organize guest lists, track RSVPs, and manage seating arrangements all in one place."
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-pink-500" />,
    title: "Budget Tracker",
    description: "Keep your wedding finances on track with smart budget allocation and real-time expense tracking."
  }
];

const LandingFeatures: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white/90 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Your Perfect Day
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            WedPal combines AI technology with wedding expertise to simplify your planning process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden">
              <CardContent className="pt-6">
                <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
