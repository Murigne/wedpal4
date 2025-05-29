
import React from 'react';
import { ArrowRight, Heart, Wand2, CheckCircle } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: Heart,
      number: "01",
      title: "Share Your Vision",
      description: "Tell us about your dream wedding - style, budget, guest count, and preferences."
    },
    {
      icon: Wand2,
      number: "02", 
      title: "Get AI Recommendations",
      description: "Our AI creates a personalized plan with vendor suggestions and timeline."
    },
    {
      icon: CheckCircle,
      number: "03",
      title: "Plan & Execute",
      description: "Use our tools to manage everything from budget to guest list to final details."
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple Steps to
            <br />
            <span className="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              Wedding Bliss
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Planning your wedding has never been this easy and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Arrow (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-white/40" />
                </div>
              )}
              
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center group-hover:scale-105">
                {/* Step Number */}
                <div className="text-6xl font-bold text-white/20 mb-4">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <step.icon className="w-10 h-10 text-white" fill="currentColor" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-white/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
