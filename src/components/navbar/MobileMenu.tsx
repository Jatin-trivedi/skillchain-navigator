import { useState } from "react";
import { Menu, X, LayoutDashboard, Award, Plus, Share2, FileCheck, List, ShieldCheck, LogIn, UserPlus, Home, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type AuthState = "logged-out" | "student" | "issuer";

interface MobileMenuProps {
  authState: AuthState;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogin?: () => void;
  onSignup?: () => void;
  onVerify?: () => void;
}

interface NavItem {
  label: string;
  id: string;
  icon: React.ReactNode;
}

/**
 * Mobile Menu Component
 * Hamburger menu with slide-in drawer for mobile devices
 */
const MobileMenu = ({ authState, activeTab, onTabChange, onLogin, onSignup, onVerify }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getNavItems = (): NavItem[] => {
    switch (authState) {
      case "logged-out":
        return [
          { label: "Home", id: "home", icon: <Home className="w-5 h-5" /> },
          { label: "Features", id: "features", icon: <Sparkles className="w-5 h-5" /> },
          { label: "Examples", id: "examples", icon: <BookOpen className="w-5 h-5" /> },
        ];
      case "student":
        return [
          { label: "Dashboard", id: "dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: "My Credentials", id: "credentials", icon: <Award className="w-5 h-5" /> },
          { label: "Add New", id: "add", icon: <Plus className="w-5 h-5" /> },
          { label: "Share", id: "share", icon: <Share2 className="w-5 h-5" /> },
        ];
      case "issuer":
        return [
          { label: "Dashboard", id: "dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: "Issue Credential", id: "issue", icon: <FileCheck className="w-5 h-5" /> },
          { label: "Issued Credentials", id: "issued", icon: <List className="w-5 h-5" /> },
          { label: "Verify", id: "verify", icon: <ShieldCheck className="w-5 h-5" /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground hover:text-foreground"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-card border-l border-border z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-semibold gradient-text">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                transition-all duration-200
                ${activeTab === item.id
                  ? "bg-muted text-foreground gradient-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }
              `}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Auth buttons for logged-out state */}
        {authState === "logged-out" && (
          <div className="p-4 space-y-3 border-t border-border mt-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                onLogin?.();
                setIsOpen(false);
              }}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                onSignup?.();
                setIsOpen(false);
              }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Signup
            </Button>
            <Button
              className="w-full gradient-bg text-primary-foreground"
              onClick={() => {
                onVerify?.();
                setIsOpen(false);
              }}
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Verify Credential
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
