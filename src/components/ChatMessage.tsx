
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  content: string;
  sender: 'ai' | 'user';
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, sender, className }) => {
  return (
    <div
      className={cn(
        sender === 'ai' 
          ? 'chat-bubble-ai bg-[#fff7fa] text-gray-800 p-3 rounded-xl max-w-[80%] self-start shadow-sm text-xs' 
          : 'chat-bubble-user bg-pink-500 text-white p-3 rounded-xl rounded-tr-none max-w-[80%] self-end shadow-sm text-xs',
        className
      )}
    >
      {content}
    </div>
  );
};

export default ChatMessage;
