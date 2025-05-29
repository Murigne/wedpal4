
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah & Michael",
      location: "San Francisco, CA",
      text: "WedPal made planning our dream wedding effortless. The AI recommendations were spot-on, and we stayed within budget!",
      rating: 5
    },
    {
      name: "Emma & James",
      location: "Austin, TX", 
      text: "From vendor selection to timeline management, WedPal handled everything. Our wedding day was absolutely perfect!",
      rating: 5
    },
    {
      name: "Lisa & David",
      location: "Miami, FL",
      text: "The budget tracking feature saved us thousands. WedPal's suggestions helped us prioritize what mattered most.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by Couples
            <br />
            <span className="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              Everywhere
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join thousands of couples who planned their perfect wedding with WedPal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-white/60" />
              </div>

              {/* Stars */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white/90 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-white/20 pt-6">
                <h4 className="text-white font-semibold mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-white/60 text-sm">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
