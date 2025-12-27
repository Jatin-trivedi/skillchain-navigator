import { LogIn, UserPlus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  onLogin?: () => void;
  onSignup?: () => void;
  onVerify?: () => void;
}

/**
 * Authentication Buttons Component
 * Displays login, signup, and verify credential buttons for logged-out users
 */
const AuthButtons = ({ onLogin, onSignup, onVerify }: AuthButtonsProps) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogin}
        className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Login
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onSignup}
        className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Signup
      </Button>
      
      <Button
        size="sm"
        onClick={onVerify}
        className="gradient-bg text-primary-foreground glow-hover"
      >
        <ShieldCheck className="w-4 h-4 mr-2" />
        Verify Credential
      </Button>
    </div>
  );
};

export default AuthButtons;
