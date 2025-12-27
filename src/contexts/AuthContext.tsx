import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "student" | "issuer";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  initials: string;
  // Issuer-specific fields
  organizationName?: string;
  organizationUrl?: string;
  organizationType?: string;
  recipientsPerYear?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: SignupData, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  organizationUrl?: string;
  organizationType?: string;
  recipientsPerYear?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  "student@example.com": {
    password: "password123",
    user: {
      id: "1",
      email: "student@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "student",
      initials: "JD",
    },
  },
  "issuer@example.com": {
    password: "password123",
    user: {
      id: "2",
      email: "issuer@example.com",
      firstName: "Jane",
      lastName: "Smith",
      role: "issuer",
      initials: "JS",
      organizationName: "Tech University",
      organizationType: "university",
    },
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    role: null,
    token: null,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("skillchain_auth");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setAuthState({
          isAuthenticated: true,
          user: parsed.user,
          role: parsed.role,
          token: parsed.token,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem("skillchain_auth");
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = mockUsers[email.toLowerCase()];
    
    if (!mockUser) {
      return { success: false, error: "No account found with this email" };
    }

    if (mockUser.password !== password) {
      return { success: false, error: "Incorrect password" };
    }

    if (mockUser.user.role !== role) {
      return { success: false, error: `This account is registered as a ${mockUser.user.role}, not a ${role}` };
    }

    const token = `mock-jwt-${Date.now()}`;
    const newAuthState = {
      isAuthenticated: true,
      user: mockUser.user,
      role: mockUser.user.role,
      token,
      isLoading: false,
    };

    setAuthState(newAuthState);
    localStorage.setItem("skillchain_auth", JSON.stringify({
      user: mockUser.user,
      role: mockUser.user.role,
      token,
    }));

    return { success: true };
  };

  const signup = async (userData: SignupData, role: UserRole): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mockUsers[userData.email.toLowerCase()]) {
      return { success: false, error: "An account with this email already exists" };
    }

    const initials = role === "student"
      ? `${userData.firstName?.charAt(0) || ""}${userData.lastName?.charAt(0) || ""}`.toUpperCase()
      : userData.organizationName?.substring(0, 2).toUpperCase() || "OR";

    const newUser: User = {
      id: `${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      role,
      initials,
      organizationName: userData.organizationName,
      organizationUrl: userData.organizationUrl,
      organizationType: userData.organizationType,
      recipientsPerYear: userData.recipientsPerYear,
    };

    const token = `mock-jwt-${Date.now()}`;
    
    // Add to mock database
    mockUsers[userData.email.toLowerCase()] = {
      password: userData.password,
      user: newUser,
    };

    const newAuthState = {
      isAuthenticated: true,
      user: newUser,
      role,
      token,
      isLoading: false,
    };

    setAuthState(newAuthState);
    localStorage.setItem("skillchain_auth", JSON.stringify({
      user: newUser,
      role,
      token,
    }));

    return { success: true };
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      role: null,
      token: null,
      isLoading: false,
    });
    localStorage.removeItem("skillchain_auth");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
