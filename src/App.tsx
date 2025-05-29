
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VendorMarketplace from "./pages/VendorMarketplace";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import EditWeddingDetails from "./pages/EditWeddingDetails";
import NotFound from "./pages/NotFound";
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

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-wedding-details" element={<EditWeddingDetails />} />
      <Route path="/account-settings" element={<AccountSettings />} />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/vendor-login" element={<VendorLogin />} />
      <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      <Route path="/vendor-marketplace" element={<VendorMarketplace />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/guests" element={<Guests />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/gifts" element={<Gifts />} />
      <Route path="/mood-board" element={<MoodBoard />} />
      <Route path="/theme" element={<Theme />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
