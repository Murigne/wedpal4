
import React, { useRef, useEffect } from 'react';
import ChatMessage from '../ChatMessage';

interface OnboardingChatProps {
  messages: Array<{ content: string; sender: 'ai' | 'user' }>;
}

const OnboardingChat: React.FC<OnboardingChatProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white/70 rounded-lg p-3 mb-4 h-[400px] overflow-y-auto shadow-inner">
      <div className="flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            content={msg.content}
            sender={msg.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default OnboardingChat;
