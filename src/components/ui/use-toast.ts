
// Re-export from the real implementation
import { useToast, toast } from "@/hooks/use-toast";

// Add this for backward compatibility with shadcn/ui toast
export const useToaster = () => {
  return { toasts: [] };
};

export { useToast, toast };
