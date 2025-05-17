
import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Answer a Few Questions",
    description: "Tell us about your wedding vision, date, and partner details to get started.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    number: "02",
    title: "Get Personalized Recommendations",
    description: "Our AI creates custom themes, timelines, and budgets based on your preferences.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
  },
  {
    number: "03",
    title: "Connect with Vendors",
    description: "Browse and book pre-vetted local vendors that match your style and budget.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
  },
  {
    number: "04",
    title: "Enjoy Your Perfect Day",
    description: "Relax knowing every detail has been planned and organized through WedPal.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80"
  }
];

const LandingHowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white/90 to-pink-50/90 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How WedPal Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to a stress-free wedding planning experience in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex-shrink-0 w-full md:w-48 h-48 relative">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul>
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600 mb-1">
                      <Check size={16} className="text-pink-500" />
                      <span>Feature benefit {item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingHowItWorks;
