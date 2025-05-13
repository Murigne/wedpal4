
// Export from the shadcn/ui toast component
import { toast } from "../components/ui/toast";
import { useToast as useToastFromShadcn } from "../components/ui/toast";

// Re-export the toast function and the useToast hook
export const useToast = useToastFromShadcn;
export { toast };
