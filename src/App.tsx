
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

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
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
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-dashboard" element={
        <ProtectedRoute>
          <VendorDashboard />
        </ProtectedRoute>
      } />
      {/* Future Routes */}
      <Route path="/checklist" element={
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>
      } />
      <Route path="/guests" element={
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>
      } />
      <Route path="/schedule" element={
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>
      } />
      <Route path="/theme" element={
        <ProtectedRoute>
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
