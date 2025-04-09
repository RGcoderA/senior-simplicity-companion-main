
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user type
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

// Define the profile update type
interface ProfileUpdate {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profile: ProfileUpdate) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, check if email and password match
      if (email === "demo@example.com" && password === "password") {
        const userData: User = {
          uid: '1',
          email: email,
          displayName: 'Demo User',
          phoneNumber: null,
          photoURL: null
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        toast("Login Successful! Welcome back to Health Companion!");
        navigate('/');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast("Login Failed: Invalid email or password.", {
        style: { backgroundColor: '#f44336', color: 'white' }
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        uid: Date.now().toString(),
        email: email,
        displayName: displayName,
        phoneNumber: null,
        photoURL: null
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      toast("Registration Successful! Welcome to Health Companion!");
      navigate('/');
    } catch (error) {
      toast("Registration Failed: Could not create your account.", {
        style: { backgroundColor: '#f44336', color: 'white' }
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      
      toast("You've been successfully logged out.");
      navigate('/login');
    } catch (error) {
      toast("Error: There was a problem logging you out.", {
        style: { backgroundColor: '#f44336', color: 'white' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (profile: ProfileUpdate) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) throw new Error('No user logged in');
      
      const updatedUser = {
        ...user,
        ...profile
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast("Profile updated successfully.");
      return Promise.resolve();
    } catch (error) {
      toast("Update Failed: Could not update your profile.", {
        style: { backgroundColor: '#f44336', color: 'white' }
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, we'd verify the current password here
      
      toast("Password Changed: Your password has been successfully updated.");
      
      return Promise.resolve();
    } catch (error) {
      toast("Error: Failed to change password.", {
        style: { backgroundColor: '#f44336', color: 'white' }
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
