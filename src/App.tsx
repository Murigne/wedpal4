
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
import AccountSettings from "./pages/AccountSettings";
import Onboarding from "./components/Onboarding";
import { useState, useEffect } from "react";

// Protected route component with vendor check
const ProtectedRoute = ({ children, vendorOnly = false }: { children: React.ReactNode, vendorOnly?: boolean }) => {
  const { user, isLoading, isVendor, checkVendorStatus } = useAuth();
  const [checking, setChecking] = useState(true);
  
  useEffect(() => {
    const verifyAccess = async () => {
      if (!user) {
        setChecking(false);
        return;
      }
      
      // If isVendor is undefined, check vendor status
      if (isVendor === undefined) {
        await checkVendorStatus();
      }
      
      setChecking(false);
    };
    
    verifyAccess();
  }, [user, isVendor, checkVendorStatus]);
  
  // Add debug logging to understand the state
  console.log("Protected Route State:", { isLoading, checking, user: !!user, isVendor, vendorOnly });
  
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
    console.log("No user, redirecting to login");
    return <Navigate to="/login" />;
  }
  
  // Vendor page access check
  if (vendorOnly && isVendor === false) {
    console.log("Not a vendor, redirecting to dashboard");
    return <Navigate to="/dashboard" />;
  }
  
  // Couples page access check - redirect vendors to vendor dashboard
  if (!vendorOnly && isVendor === true) {
    console.log("Is a vendor on couples page, redirecting to vendor dashboard");
    return <Navigate to="/vendor-dashboard" />;
  }
  
  console.log("Rendering protected content");
  return <>{children}</>;
};

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={
        <ProtectedRoute vendorOnly={false}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/edit-wedding-details" element={
        <ProtectedRoute vendorOnly={false}>
          <EditWeddingDetails />
        </ProtectedRoute>
      } />
      <Route path="/account-settings" element={
        <ProtectedRoute vendorOnly={false}>
          <AccountSettings />
        </ProtectedRoute>
      } />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-dashboard" element={
        <ProtectedRoute vendorOnly={true}>
          <VendorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/vendor-marketplace" element={
        <ProtectedRoute vendorOnly={false}>
          <VendorMarketplace />
        </ProtectedRoute>
      } />
      
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
