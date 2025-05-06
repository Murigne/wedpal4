
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
import EditWeddingDetails from "./pages/EditWeddingDetails";
import NotFound from "./pages/NotFound";
import AuthProvider from "./components/AuthProvider";
import VendorSignup from "./pages/VendorSignup";
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import Vendors from "./pages/Vendors";
import AIAssistant from "./pages/AIAssistant";
import Budget from "./pages/Budget";
import Guests from "./pages/Guests";
import Timeline from "./pages/Timeline";
import Gifts from "./pages/Gifts";
import MoodBoard from "./pages/MoodBoard";
import Theme from "./pages/Theme";
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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-wedding-details" element={
        <ProtectedRoute vendorOnly={false}>
          <EditWeddingDetails />
        </ProtectedRoute>
      } />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-dashboard" element={
        <ProtectedRoute vendorOnly={true}>
          <VendorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/vendor-marketplace" element={<VendorMarketplace />} />
      
      {/* Navigation Routes with implemented components */}
      <Route path="/budget" element={
        <ProtectedRoute vendorOnly={false}>
          <Budget />
        </ProtectedRoute>
      } />
      <Route path="/guests" element={
        <ProtectedRoute vendorOnly={false}>
          <Guests />
        </ProtectedRoute>
      } />
      <Route path="/timeline" element={
        <ProtectedRoute vendorOnly={false}>
          <Timeline />
        </ProtectedRoute>
      } />
      <Route path="/gifts" element={
        <ProtectedRoute vendorOnly={false}>
          <Gifts />
        </ProtectedRoute>
      } />
      <Route path="/mood-board" element={
        <ProtectedRoute vendorOnly={false}>
          <MoodBoard />
        </ProtectedRoute>
      } />
      <Route path="/theme" element={
        <ProtectedRoute vendorOnly={false}>
          <Theme />
        </ProtectedRoute>
      } />
      <Route path="/vendors" element={
        <ProtectedRoute vendorOnly={false}>
          <Vendors />
        </ProtectedRoute>
      } />
      <Route path="/ai-assistant" element={
        <ProtectedRoute vendorOnly={false}>
          <AIAssistant />
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
