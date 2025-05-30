import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import HeartAnimation from '@/components/HeartAnimation';

const questions = [
  { id: 'name', question: "What's your name?", type: 'text' },
  { id: 'partnerName', question: "What's your partner's name?", type: 'text' },
  { id: 'date', question: "When are you planning to get married?", type: 'date' },
  { id: 'colors', question: "What are your wedding colours? (Select up to 3)", type: 'color' },
];

const colorOptions = [
  { name: 'Blush Pink', value: '#FFC1CC', class: 'bg-pink-200' },
  { name: 'Burgundy', value: '#800020', class: 'bg-red-900' },
  { name: 'Dusty Blue', value: '#78A2CC', class: 'bg-blue-300' },
  { name: 'Emerald Green', value: '#50C878', class: 'bg-green-500' },
  { name: 'Gold', value: '#FFD700', class: 'bg-yellow-400' },
  { name: 'Ivory', value: '#FFFFF0', class: 'bg-yellow-50' },
  { name: 'Lavender', value: '#E6E6FA', class: 'bg-purple-100' },
  { name: 'Navy Blue', value: '#000080', class: 'bg-blue-900' },
  { name: 'Peach', value: '#FFE5B4', class: 'bg-orange-100' },
  { name: 'Sage Green', value: '#A9B89E', class: 'bg-green-200' },
  { name: 'Silver', value: '#C0C0C0', class: 'bg-gray-300' },
  { name: 'Teal', value: '#008080', class: 'bg-teal-600' },
  { name: 'Red', value: '#FF0000', class: 'bg-red-600' },
  { name: 'Royal Blue', value: '#4169E1', class: 'bg-blue-600' },
  { name: 'Purple', value: '#800080', class: 'bg-purple-800' },
  { name: 'Coral', value: '#FF7F50', class: 'bg-orange-400' },
  { name: 'Turquoise', value: '#40E0D0', class: 'bg-cyan-300' },
  { name: 'Beige', value: '#F5F5DC', class: 'bg-yellow-100' },
];

const LandingSearchBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const form = useForm();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleColorSelection = (colorValue: string) => {
    setSelectedColors(prev => {
      if (prev.includes(colorValue)) {
        return prev.filter(c => c !== colorValue);
      } else {
        if (prev.length < 3) {
          return [...prev, colorValue];
        }
        return prev;
      }
    });
  };

  const handleAddCustomColor = () => {
    if (customColor && selectedColors.length < 3 && /^#[0-9A-F]{6}$/i.test(customColor)) {
      setSelectedColors(prev => [...prev, customColor]);
      setCustomColor('');
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setPopoverOpen(false);
    
    if (date) {
      handleSubmit(new Event('submit') as any);
    }
  };

  const handleRadioChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement | HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentQuestion.type === 'date' && selectedDate) {
        handleSubmit(new Event('submit') as any);
        e.preventDefault();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isTransitioning) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    let userResponse: any = inputValue;
    
    if (currentQuestion.type === 'date') {
      if (!selectedDate) return;
      userResponse = selectedDate;
    } else if (currentQuestion.type === 'color') {
      if (selectedColors.length === 0) return;
      userResponse = selectedColors;
    } else if (currentQuestion.type === 'text') {
      if (!inputValue.trim()) return;
    }
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: userResponse
    }));
    
    setIsTransitioning(true);
    
    if (currentQuestion.id === 'colors') {
      // Apply colors to the UI but don't change the current screen's colors
      // Store the selected colors for later use in the dashboard
      document.documentElement.style.setProperty('--wedding-color-primary', selectedColors[0] || '#FFC0CB');
      if (selectedColors.length > 1) {
        document.documentElement.style.setProperty('--wedding-color-secondary', selectedColors[1]);
      }
      if (selectedColors.length > 2) {
        document.documentElement.style.setProperty('--wedding-color-tertiary', selectedColors[2]);
      }
      
      // Navigate to dashboard after the colors question without changing current screen
      console.log("Colors question answered, navigating to dashboard");
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            formData: {...answers, [currentQuestion.id]: userResponse},
            userColors: selectedColors,
            isNewUser: true // Flag to indicate this is a new user coming from onboarding
          } 
        });
      }, 300);
      return;
    }
    
    setTimeout(() => {
      setInputValue('');
      setSelectedDate(undefined);
      
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const adjustColor = (hex: string, amount: number) => {
    return '#' + hex.replace(/^#/, '').replace(/../g, color => {
      const colorNum = parseInt(color, 16);
      const newColorNum = Math.max(Math.min(colorNum + amount, 255), 0);
      return newColorNum.toString(16).padStart(2, '0');
    });
  };

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answers[currentQuestion.id] !== undefined) {
      if (currentQuestion.type === 'date') {
        setSelectedDate(answers[currentQuestion.id]);
      } else if (currentQuestion.type === 'color') {
        setSelectedColors(answers[currentQuestion.id] || []);
      } else if (currentQuestion.type === 'radio') {
        setInputValue(answers[currentQuestion.id] || '');
      } else {
        setInputValue(String(answers[currentQuestion.id] || ''));
      }
    } else {
      setInputValue('');
      setSelectedDate(undefined);
      setSelectedColors([]);
    }
  }, [currentQuestionIndex, answers]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 z-10 relative">
      <HeartAnimation avoidTextAreas={true} />
      
      <h1 className="text-5xl md:text-7xl font-bold text-center text-white drop-shadow-md mt-4">
        Planning a wedding? <br/> We can help <span className="text-pink-300">: )</span>
      </h1>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
          </motion.div>
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`input-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentQuestion.type === 'text' && (
                <div className="relative">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full pl-4 pr-14 py-5 text-base rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    autoFocus
                    onKeyDown={handleKeyDown}
                  />
                  <Button 
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-full h-9 w-9"
                    disabled={isTransitioning}
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {currentQuestion.type === 'date' && (
                <div className="relative">
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start pl-4 pr-14 py-5 text-base rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-left",
                          !selectedDate && "text-muted-foreground"
                        )}
                        onKeyDown={handleKeyDown}
                      >
                        {selectedDate ? format(selectedDate, "PPP") : "Select a date..."}
                        <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0" 
                      align="start"
                      sideOffset={4}
                    >
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <Button 
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-full h-9 w-9"
                    disabled={!selectedDate || isTransitioning}
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {currentQuestion.type === 'color' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {colorOptions.map((color) => (
                      <div 
                        key={color.value} 
                        className="relative"
                        onClick={() => handleColorSelection(color.value)}
                      >
                        <div 
                          className={cn(
                            "w-full aspect-square rounded-md cursor-pointer transition-transform",
                            selectedColors.includes(color.value) ? "ring-2 ring-offset-2 ring-black scale-95" : "hover:scale-105"
                          )}
                          style={{ backgroundColor: color.value }}
                        />
                        {selectedColors.includes(color.value) && (
                          <div className="absolute top-1 right-1 h-4 w-4 bg-black rounded-full flex items-center justify-center text-white text-xs">
                            {selectedColors.indexOf(color.value) + 1}
                          </div>
                        )}
                        <span className="text-xs mt-1 text-center block text-gray-700">{color.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 items-center mt-4">
                    <Input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      placeholder="#RRGGBB"
                      className="flex-1 rounded-full border border-gray-200"
                      pattern="^#[0-9A-F]{6}$"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAddCustomColor}
                      disabled={!/^#[0-9A-F]{6}$/i.test(customColor) || selectedColors.length >= 3}
                      className="rounded-full"
                    >
                      Add Custom Color
                    </Button>
                  </div>
                  
                  {customColor && /^#[0-9A-F]{6}$/i.test(customColor) && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: customColor }}></div>
                      <span className="text-sm">Color preview</span>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                      disabled={selectedColors.length === 0 || isTransitioning}
                    >
                      Next <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </form>
        
        <div className="mt-6 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            disabled={currentQuestionIndex === 0 || isTransitioning}
            className={cn(
              "text-gray-500 hover:text-gray-700",
              (currentQuestionIndex === 0 || isTransitioning) ? "opacity-0" : "opacity-100"
            )}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div 
                key={index}
                className={`h-1 w-6 rounded-full ${index === currentQuestionIndex ? 'bg-pink-500' : index < currentQuestionIndex ? 'bg-pink-300' : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
          
          <div className="w-10"></div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={handleLoginClick}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
        >
          Already planning? Login
        </Button>
      </div>
    </div>
  );
};

export default LandingSearchBox;
