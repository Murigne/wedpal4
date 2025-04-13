
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";
import Index from "./pages/Index";
import VendorMarketplace from "./pages/VendorMarketplace";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AuthProvider from "./components/AuthProvider";
import VendorSignup from "./pages/VendorSignup";
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import { useState, useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

// Protected route component with vendor check
const ProtectedRoute = ({ children, vendorOnly = false }: { children: React.ReactNode, vendorOnly?: boolean }) => {
  const { user, isLoading } = useAuth();
  const [isVendor, setIsVendor] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  
  useEffect(() => {
    const checkVendorStatus = async () => {
      if (!user) {
        setChecking(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking vendor status:', error);
        }
        
        setIsVendor(!!data);
      } catch (error) {
        console.error('Error checking vendor status:', error);
      } finally {
        setChecking(false);
      }
    };
    
    checkVendorStatus();
  }, [user]);
  
  if (isLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Vendor page access check
  if (vendorOnly && !isVendor) {
    return <Navigate to="/dashboard" />;
  }
  
  // Couples page access check - redirect vendors to vendor dashboard
  if (!vendorOnly && isVendor) {
    return <Navigate to="/vendor-dashboard" />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/vendors" element={<VendorMarketplace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={
        <ProtectedRoute vendorOnly={false}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-dashboard" element={
        <ProtectedRoute vendorOnly={true}>
          <VendorDashboard />
        </ProtectedRoute>
      } />
      {/* Future Routes */}
      <Route path="/checklist" element={
        <ProtectedRoute vendorOnly={false}>
          <NotFound />
        </ProtectedRoute>
      } />
      <Route path="/guests" element={
        <ProtectedRoute vendorOnly={false}>
          <NotFound />
        </ProtectedRoute>
      } />
      <Route path="/schedule" element={
        <ProtectedRoute vendorOnly={false}>
          <NotFound />
        </ProtectedRoute>
      } />
      <Route path="/theme" element={
        <ProtectedRoute vendorOnly={false}>
          <NotFound />
        </ProtectedRoute>
      } />
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
