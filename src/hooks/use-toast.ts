
import { toast as sonnerToast, Toast as SonnerToast } from "sonner";

// Define toast types to match shadcn/ui toast requirements
type ToastProps = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
};

type ToastActionElement = React.ReactElement<{
  className?: string;
  altText?: string;
  onClick?: () => void;
}>;

interface ToasterToast extends ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

let toasts: ToasterToast[] = [];

// Compatibility layer for shadcn/ui toast API
const toast = (props: Omit<ToastProps, "id">) => {
  const id = crypto.randomUUID();

  const newToast = {
    id,
    ...props,
  };

  // Add to our internal toasts array for compatibility with shadcn/ui
  toasts = [newToast, ...toasts].slice(0, TOAST_LIMIT);
  
  // Use sonner's toast API
  const { title, description, variant, duration } = props;

  if (variant === "destructive") {
    sonnerToast.error(title as string, {
      description: description as string,
      duration: duration || 5000,
      id: id,
    });
  } else {
    sonnerToast(title as string, {
      description: description as string,
      duration: duration || 5000,
      id: id,
    });
  }

  return id;
};

const dismiss = (toastId?: string) => {
  if (toastId) {
    sonnerToast.dismiss(toastId);
    toasts = toasts.filter((t) => t.id !== toastId);
  } else {
    sonnerToast.dismiss();
    toasts = [];
  }
};

// Hook for compatibility with shadcn/ui toast system
function useToast() {
  return {
    toast,
    dismiss,
    toasts: toasts,
  };
}

export { useToast, toast };
