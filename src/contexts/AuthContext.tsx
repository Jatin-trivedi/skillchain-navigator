import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// Import the initialized Firebase instances from your firebase.js file
import { auth, db } from "../firebase"; 
// Import specific Authentication functions
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
// Import specific Firestore (Database) functions
import { doc, setDoc, getDoc } from "firebase/firestore";

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
    // This creates the listener that watches for login/logout events
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in, fetch their data from Firestore
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setAuthState({
            isAuthenticated: true,
            user: userData,
            role: userData.role,
            token: await firebaseUser.getIdToken(),
            isLoading: false,
          });
        }
      } else {
        // User is logged out, clear the state
        setAuthState({
          isAuthenticated: false,
          user: null,
          role: null,
          token: null,
          isLoading: false,
        });
      }
    });

    // This stops the listener when the component is destroyed
    return () => unsubscribe();
  }, []); // The empty array ensures this only runs once when the app starts

  const login = async (email: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // 2. Fetch the role and data from Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
    
    if (!userDoc.exists()) {
      return { success: false, error: "User data not found in database." };
    }

    const userData = userDoc.data() as User;

    // 3. Verify the role matches the portal they are using
    if (userData.role !== role) {
      return { success: false, error: `This account is registered as a ${userData.role}, not a ${role}` };
    }

    // AuthState will be updated automatically by the useEffect listener in Step 4
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

const signup = async (userData: SignupData, role: UserRole): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Create the account in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const firebaseUser = userCredential.user;

    // 2. Determine initials for the avatar
    const initials = role === "student"
      ? `${userData.firstName?.charAt(0) || ""}${userData.lastName?.charAt(0) || ""}`.toUpperCase()
      : userData.organizationName?.substring(0, 2).toUpperCase() || "OR";

    // 3. Construct the profile object without undefined fields
    // Use an object literal and only add fields that exist
    const newUser: any = {
      id: firebaseUser.uid,
      email: userData.email,
      role: role,
      initials: initials,
      createdAt: new Date().toISOString()
    };

    // Add specific fields based on the role to prevent 'undefined' errors
    if (role === "student") {
      newUser.firstName = userData.firstName || "";
      newUser.lastName = userData.lastName || "";
    } else if (role === "issuer") {
      newUser.organizationName = userData.organizationName || "";
      newUser.organizationUrl = userData.organizationUrl || "";
      newUser.organizationType = userData.organizationType || "";
      newUser.recipientsPerYear = userData.recipientsPerYear || "";
    }

    // 4. Save to Firestore - This will now succeed because no fields are undefined
    await setDoc(doc(db, "users", firebaseUser.uid), newUser);

    return { success: true };
  } catch (error: any) {
    console.error("Signup error details:", error);
    return { success: false, error: error.message };
  }
};

  const logout = async () => {
  await signOut(auth);
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