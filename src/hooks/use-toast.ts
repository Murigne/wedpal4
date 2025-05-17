
// Export from the shadcn/ui toast component
import { toast } from "@radix-ui/react-toast";
import { useToast as useToastFromShadcn } from "@/components/ui/toaster";

// Re-export the toast function and the useToast hook
export const useToast = useToastFromShadcn;
export { toast };
