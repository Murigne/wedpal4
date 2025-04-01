
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
        sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user',
        className
      )}
    >
      {content}
    </div>
  );
};

export default ChatMessage;
