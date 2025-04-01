
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

// Define the questions for our form
const questions = [
  { id: 'name', question: "What's your name?" },
  { id: 'partnerName', question: "What's your partner's name?" },
  { id: 'date', question: "When are you planning to get married?" },
  { id: 'location', question: "Do you have a location in mind?" },
  { id: 'guests', question: "How many guests are you planning to invite?" },
  { id: 'style', question: "What style of wedding are you dreaming of? (e.g., rustic, elegant, beach...)" },
  { id: 'budget', question: "What's your approximate budget?" }
];

const LandingSearchBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // Store answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: inputValue
    }));
    
    setIsTransitioning(true);
    
    // Clear input
    setTimeout(() => {
      setInputValue('');
      
      // Check if we're at the last question
      if (currentQuestionIndex === questions.length - 1) {
        // Redirect to registration after a delay
        setTimeout(() => navigate('/auth'), 500);
        return;
      }
      
      // Move to next question after a short delay
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-display text-center text-white drop-shadow-md">
        Wanna get married? We are here to help <span className="text-pink-300">: )</span>
      </h1>
      
      {/* Question container */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-display text-gray-800 mb-4">
              {questions[currentQuestionIndex].question}
            </h2>
          </motion.div>
        </AnimatePresence>
        
        {/* Input form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full pl-4 pr-14 py-5 text-base rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              autoFocus
            />
            <Button 
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-full"
              disabled={isTransitioning}
            >
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
        </form>
        
        {/* Progress indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div 
                key={index}
                className={`h-1 w-8 rounded-full ${index === currentQuestionIndex ? 'bg-pink-500' : index < currentQuestionIndex ? 'bg-pink-300' : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Login button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/auth')}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
        >
          Already planning? Login
        </Button>
      </div>
      
      {/* Footer text */}
      <div className="text-center text-white/80 text-sm mt-4">
        <p className="font-sans">Start planning your perfect day with us</p>
      </div>
    </div>
  );
};

export default LandingSearchBox;
