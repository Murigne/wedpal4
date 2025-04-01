
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define the questions for our form
const questions = [
  { id: 'intro', question: "Tell us about your dream wedding...", isInitial: true },
  { id: 'name', question: "What's your name?" },
  { id: 'partnerName', question: "What's your partner's name?" },
  { id: 'date', question: "When are you planning to get married?" },
  { id: 'location', question: "Do you have a location in mind?" },
  { id: 'guests', question: "How many guests are you planning to invite?" },
  { id: 'style', question: "What style of wedding are you dreaming of? (e.g., rustic, elegant, beach...)" },
  { id: 'budget', question: "What's your approximate budget?" }
];

// Define a message type for our chat
type Message = {
  content: string;
  sender: 'ai' | 'user';
};

const LandingSearchBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { content: questions[0].question, sender: 'ai' }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // Add user's answer to messages
    setMessages(prev => [...prev, { content: inputValue, sender: 'user' }]);
    
    // Store answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: inputValue
    }));
    
    // Clear input
    setInputValue('');
    
    // Check if we're at the last question
    if (currentQuestionIndex === questions.length - 1) {
      // Add a final message
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            content: `Thank you ${answers.name || ''}! We're excited to help plan your special day. Let's create an account to get started.`, 
            sender: 'ai' 
          }
        ]);
        
        // Redirect to registration after a delay
        setTimeout(() => navigate('/auth'), 3000);
      }, 500);
      return;
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setMessages(prev => [...prev, { content: questions[nextIndex].question, sender: 'ai' }]);
    }, 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-display text-center text-white drop-shadow-md">
        Wanna get married? We are here to help <span className="text-pink-300">: )</span>
      </h1>
      
      {/* Chat container */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 h-96 flex flex-col overflow-hidden">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pb-2">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`${msg.sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        
        {/* Input form */}
        <form onSubmit={handleSubmit} className="relative border-t pt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={questions[currentQuestionIndex].question}
            className="w-full pl-4 pr-14 py-3 text-base rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Button 
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-full"
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </form>
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
