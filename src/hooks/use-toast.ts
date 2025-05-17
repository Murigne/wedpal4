
import { toast as sonnerToast } from 'sonner';
import { useToaster } from '@/components/ui/use-toast';

// Re-export sonner toast for direct use
export const toast = sonnerToast;

// Create a compatibility layer for shadcn/ui toast system
export const useToast = () => {
  // This ensures backward compatibility with components expecting the toasts property
  return { 
    toast: sonnerToast,
    toasts: [] // Empty array to prevent map errors
  };
};
