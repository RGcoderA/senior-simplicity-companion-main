
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Medications from "./pages/Medications";
import Activities from "./pages/Activities";
import VideoCalls from "./pages/VideoCalls";
import News from "./pages/News";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ApiSettings from "./pages/ApiSettings";
import Profile from "./pages/Profile";
import { AuthProvider } from "./hooks/useAuth";
import { create } from 'zustand';

const queryClient = new QueryClient();

// Create zustand store for handling auth state in a non-persistent way
interface AuthStore {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/medications" element={<ProtectedRoute><Layout><Medications /></Layout></ProtectedRoute>} />
            <Route path="/activities" element={<ProtectedRoute><Layout><Activities /></Layout></ProtectedRoute>} />
            <Route path="/video-calls" element={<ProtectedRoute><Layout><VideoCalls /></Layout></ProtectedRoute>} />
            <Route path="/news" element={<ProtectedRoute><Layout><News /></Layout></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><Layout><Help /></Layout></ProtectedRoute>} />
            <Route path="/api-settings" element={<ProtectedRoute><Layout><ApiSettings /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
