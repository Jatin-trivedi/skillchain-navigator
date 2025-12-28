import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import Examples from "./pages/Examples";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import StudentLogin from "./pages/auth/StudentLogin";
import IssuerLogin from "./pages/auth/IssuerLogin";
import StudentSignup from "./pages/auth/StudentSignup";
import IssuerSignup from "./pages/auth/IssuerSignup";
import Dashboard from "./pages/dashboard/Dashboard";
import IssueCredentialPage from "./pages/issuer/IssueCredentialPage";
import IssuedCredentialsPage from "./pages/issuer/IssuedCredentialsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/examples" element={<Examples />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/issuer" element={<IssuerLogin />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/student" element={<StudentSignup />} />
            <Route path="/signup/issuer" element={<IssuerSignup />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/issuer/issue" element={<IssueCredentialPage />} />
              <Route path="/issuer/credentials" element={<IssuedCredentialsPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
