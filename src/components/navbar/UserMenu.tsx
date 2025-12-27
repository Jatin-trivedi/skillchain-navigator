import { useState, useRef, useEffect } from "react";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserMenuProps {
  user: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  onLogout?: () => void;
}

/**
 * User Menu Dropdown Component
 * Displays user avatar with dropdown menu for profile, settings, help, and logout
 */
const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    { label: "Profile", icon: User, onClick: () => console.log("Profile") },
    { label: "Settings", icon: Settings, onClick: () => console.log("Settings") },
    { label: "Help & Support", icon: HelpCircle, onClick: () => console.log("Help") },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-muted/50 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar className="w-9 h-9 border-2 border-border hover:border-primary/50 transition-colors">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
            {user.initials || getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 hidden sm:block ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-popover border border-border shadow-lg animate-slide-down z-50">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">View your profile</p>
          </div>

          {/* Menu items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Logout button */}
          <div className="border-t border-border py-2">
            <button
              onClick={() => {
                onLogout?.();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
