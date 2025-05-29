
import React from 'react';
import { Brain, Calculator, Users, Calendar, Palette, Gift } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Get personalized recommendations based on your style, budget, and preferences."
    },
    {
      icon: Calculator,
      title: "Smart Budget Tracking",
      description: "Keep your wedding costs on track with intelligent budget management tools."
    },
    {
      icon: Users,
      title: "Vendor Marketplace",
      description: "Connect with verified vendors who match your vision and budget perfectly."
    },
    {
      icon: Calendar,
      title: "Timeline Management",
      description: "Never miss a deadline with our comprehensive wedding timeline planner."
    },
    {
      icon: Palette,
      title: "Theme & Styling",
      description: "Create stunning mood boards and discover your perfect wedding aesthetic."
    },
    {
      icon: Gift,
      title: "Guest & Registry",
      description: "Manage your guest list and registry all in one convenient place."
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to Plan
            <br />
            <span className="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              Your Perfect Day
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From the first idea to the last dance, WedPal guides you through every step
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
