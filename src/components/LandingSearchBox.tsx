
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
  { id: 'hashtag', question: "Pick a hashtag for your wedding or create your own:", type: 'hashtag' },
  { id: 'date', question: "When are you planning to get married?", type: 'date' },
  { id: 'colors', question: "What are your wedding colours? (Select up to 3)", type: 'color' },
  { id: 'budget', question: "What's your estimated budget? Don't worry, no amount is too small : )", type: 'number', prefix: 'GHS' },
  { id: 'venue', question: "Do you prefer an indoor or outdoor wedding?", type: 'radio', options: ['Indoor', 'Outdoor', 'Both'] },
  { id: 'guests', question: "How many guests are you expecting?", type: 'number' },
  { id: 'vendors', question: "Do you need vendor recommendations?", type: 'radio', options: ['Yes', 'No', 'Not sure yet'] },
  { id: 'honeymoon', question: "What's your dream honeymoon location?", type: 'text' }
];

const colorOptions = [
  { name: 'Blush Pink', value: '#FFC0CB', class: 'bg-pink-300' },
  { name: 'Burgundy', value: '#800020', class: 'bg-red-900' },
  { name: 'Red', value: '#ea384c', class: 'bg-red-600' },
  { name: 'Royal Blue', value: '#1EAEDB', class: 'bg-blue-500' },
  { name: 'Purple', value: '#9b87f5', class: 'bg-purple-500' },
  { name: 'Dusty Blue', value: '#6699CC', class: 'bg-blue-400' },
  { name: 'Coral', value: '#FEC6A1', class: 'bg-orange-300' },
  { name: 'Turquoise Blue', value: '#33C3F0', class: 'bg-cyan-400' },
  { name: 'Beige', value: '#F1F0FB', class: 'bg-gray-100' },
  { name: 'Emerald Green', value: '#50C878', class: 'bg-green-500' },
  { name: 'Gold', value: '#FFD700', class: 'bg-yellow-400' },
  { name: 'Ivory', value: '#FFFFF0', class: 'bg-yellow-50' },
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
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([]);
  const [customHashtag, setCustomHashtag] = useState('');
  const [selectedHashtag, setSelectedHashtag] = useState('');
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

  const formatNumberWithCommas = (value: string): string => {
    const numericValue = value.replace(/[^\d]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    if (/^\d*$/.test(rawValue)) {
      const formattedValue = formatNumberWithCommas(rawValue);
      setInputValue(formattedValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement | HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentQuestion.type === 'date' && selectedDate) {
        handleSubmit(new Event('submit') as any);
        e.preventDefault();
      }
    }
  };

  const generateHashtags = (name1: string, name2: string) => {
    if (!name1 || !name2) return [];
    
    // Extract first few letters from each name
    const n1 = name1.slice(0, 3).toLowerCase();
    const n2 = name2.slice(0, 3).toLowerCase();
    
    // Generate hashtag variations
    return [
      `#${name1}And${name2}`,
      `#${name1}Weds${name2}`,
      `#${n1}${n2}Forever`,
      `#Team${name1}${name2}`,
      `#${name1}${name2}Love`,
      `#${name1}Loves${name2}`
    ];
  };

  const handleHashtagSelection = (hashtag: string) => {
    setSelectedHashtag(hashtag);
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
    } else if (currentQuestion.type === 'number') {
      if (!inputValue.trim() || isNaN(Number(inputValue.replace(/,/g, '')))) return;
      userResponse = Number(inputValue.replace(/,/g, ''));
    } else if (currentQuestion.type === 'text' || currentQuestion.type === 'radio') {
      if (!inputValue.trim()) return;
    } else if (currentQuestion.type === 'hashtag') {
      if (!selectedHashtag && !customHashtag) return;
      userResponse = customHashtag ? customHashtag : selectedHashtag;
    }
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: userResponse
    }));
    
    setIsTransitioning(true);
    
    // Generate hashtags after getting both names
    if (currentQuestion.id === 'partnerName') {
      const name1 = answers.name || '';
      const name2 = userResponse || '';
      const hashtags = generateHashtags(name1, name2);
      setSuggestedHashtags(hashtags);
    }
    
    if (currentQuestion.id === 'colors') {
      document.documentElement.style.setProperty('--wedding-color-primary', selectedColors[0] || '#FFC0CB');
      if (selectedColors.length > 1) {
        document.documentElement.style.setProperty('--wedding-color-secondary', selectedColors[1]);
      }
      if (selectedColors.length > 2) {
        document.documentElement.style.setProperty('--wedding-color-tertiary', selectedColors[2]);
      }
      
      const gradientColors = selectedColors.length >= 2 
        ? selectedColors 
        : [...selectedColors, ...(selectedColors.length === 1 ? [adjustColor(selectedColors[0], -30)] : ['#e73c7e', '#23a6d5'])];
      
      const root = document.documentElement;
      const gradientStyle = `linear-gradient(-45deg, ${gradientColors.join(', ')})`;
      root.style.setProperty('--dynamic-gradient', gradientStyle);
      document.querySelector('.animated-gradient')?.classList.add('dynamic-gradient');
    }
    
    setTimeout(() => {
      setInputValue('');
      setSelectedDate(undefined);
      
      if (currentQuestionIndex === questions.length - 1) {
        navigate('/signup', { 
          state: { 
            formData: {...answers, [currentQuestion.id]: userResponse},
            userColors: selectedColors 
          } 
        });
        return;
      }
      
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
      } else if (currentQuestion.type === 'number') {
        const value = answers[currentQuestion.id] || '';
        setInputValue(value ? formatNumberWithCommas(String(value)) : '');
      } else if (currentQuestion.type === 'hashtag') {
        setSelectedHashtag(answers[currentQuestion.id] || '');
      } else {
        setInputValue(String(answers[currentQuestion.id] || ''));
      }
    } else {
      setInputValue('');
      setSelectedDate(undefined);
      setSelectedColors([]);
      setSelectedHashtag('');
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

              {currentQuestion.type === 'number' && (
                <div className="relative">
                  {currentQuestion.id === 'budget' && inputValue && (
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <span className="text-gray-500">GHS </span>
                    </div>
                  )}
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={handleNumberInputChange}
                    placeholder="Enter a number..."
                    className={`w-full ${currentQuestion.id === 'budget' && inputValue ? 'pl-16' : 'pl-4'} pr-14 py-5 text-base rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300`}
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

              {currentQuestion.type === 'hashtag' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {suggestedHashtags.map((hashtag) => (
                      <div 
                        key={hashtag} 
                        className={cn(
                          "p-3 rounded-lg border border-gray-200 cursor-pointer transition-all text-center",
                          selectedHashtag === hashtag ? "bg-pink-100 border-pink-300 font-medium" : "hover:bg-gray-50"
                        )}
                        onClick={() => handleHashtagSelection(hashtag)}
                      >
                        {hashtag}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={customHashtag}
                        onChange={(e) => setCustomHashtag(e.target.value)}
                        placeholder="Or create your own..."
                        className="w-full pl-4 pr-4 py-3 text-base rounded-full border border-gray-200"
                      />
                      {!customHashtag.startsWith('#') && customHashtag && (
                        <div className="text-xs mt-1 text-gray-500 ml-4">
                          Don't forget to add # at the start
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                      disabled={(!selectedHashtag && !customHashtag) || isTransitioning}
                    >
                      Next <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
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

              {currentQuestion.type === 'radio' && currentQuestion.options && (
                <div className="space-y-4">
                  <RadioGroup 
                    value={inputValue} 
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-3"
                  >
                    {currentQuestion.options.map((option) => (
                      <div key={option} className="flex items-center space-x-3 rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                      disabled={!inputValue || isTransitioning}
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
