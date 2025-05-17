
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "WedPal made planning our wedding so much easier. The AI recommendations were spot-on and saved us countless hours of research!",
    author: "Jessica & Mark",
    location: "New York, NY",
    rating: 5,
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
  },
  {
    quote: "The vendor marketplace helped us find our perfect photographer within our budget. We couldn't be happier with how our photos turned out!",
    author: "Michael & Sarah",
    location: "Austin, TX",
    rating: 5,
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    quote: "The guest management system made tracking RSVPs and dietary preferences so simple. Our caterer was impressed with how organized we were!",
    author: "David & Emma",
    location: "Seattle, WA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80"
  },
];

const LandingTestimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Love Stories from Happy Couples
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of couples who planned their perfect day with WedPal
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingTestimonials;
