import { toast as sonnerToast } from 'sonner';

// Define types to match shadcn/ui toast API
type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
  [key: string]: any;
};

// Create an adapter function that converts shadcn/ui toast params to sonner format
const createToastAdapter = () => {
  const toastAdapter = (props: ToastProps) => {
    const { title, description, variant, ...rest } = props;
    
    // If it's a destructive variant, use error toast
    if (variant === 'destructive') {
      return sonnerToast.error(title, {
        description,
        ...rest
      });
    }
    
    // Otherwise use default toast
    return sonnerToast(title, {
      description,
      ...rest
    });
  };
  
  // Copy over the original methods from sonner
  Object.keys(sonnerToast).forEach(key => {
    if (typeof sonnerToast[key as keyof typeof sonnerToast] === 'function') {
      (toastAdapter as any)[key] = sonnerToast[key as keyof typeof sonnerToast];
    }
  });
  
  return toastAdapter as typeof sonnerToast & {
    (props: ToastProps): void;
  };
};

// Create and export the adapted toast function
export const toast = createToastAdapter();

// Create a compatibility layer for shadcn/ui toast system
export const useToast = () => {
  // This ensures backward compatibility with components expecting the toast and toasts properties
  return { 
    toast,
    toasts: [] // Empty array to prevent map errors
  };
};
