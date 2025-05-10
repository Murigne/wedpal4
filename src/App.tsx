
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/components/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';

import Dashboard from '@/pages/Dashboard';
import Guests from '@/pages/Guests';
import Budget from '@/pages/Budget';
import Timeline from '@/pages/Timeline';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Index from '@/pages/Index';
import Theme from '@/pages/Theme';
import MoodBoard from '@/pages/MoodBoard';
import EditWeddingDetails from '@/pages/EditWeddingDetails';
import Vendors from '@/pages/Vendors';
import AIAssistant from '@/pages/AIAssistant';
import VendorMarketplace from '@/pages/VendorMarketplace';
import VendorDashboard from '@/pages/VendorDashboard';
import VendorLogin from '@/pages/VendorLogin';
import VendorSignup from '@/pages/VendorSignup';
import Gifts from '@/pages/Gifts';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import ChatOnboarding from '@/components/ChatOnboarding';
import Onboarding from '@/components/Onboarding';
import ThemeProvider from '@/components/ThemeProvider';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/chat-onboarding" element={<ChatOnboarding />} />
              <Route path="/guests" element={<Guests />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/theme" element={<Theme />} />
              <Route path="/moodboard" element={<MoodBoard />} />
              <Route path="/edit-details" element={<EditWeddingDetails />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/vendor-marketplace" element={<VendorMarketplace />} />
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="/vendor-login" element={<VendorLogin />} />
              <Route path="/vendor-signup" element={<VendorSignup />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
