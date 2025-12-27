import { useState, useEffect } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import NotificationBell from "./NotificationBell";
import MobileMenu from "./MobileMenu";

type AuthState = "logged-out" | "student" | "issuer";

interface User {
  name: string;
  avatar?: string;
  initials?: string;
}

interface NavbarProps {
  /** Authentication state: 'logged-out', 'student', or 'issuer' */
  authState?: AuthState;
  /** User information for authenticated states */
  user?: User;
  /** Number of unread notifications */
  notifications?: number;
  /** Currently active tab/page */
  activeTab?: string;
  /** Callback when user logs in */
  onLogin?: () => void;
  /** Callback when user signs up */
  onSignup?: () => void;
  /** Callback when user logs out */
  onLogout?: () => void;
  /** Callback when verify credential is clicked */
  onVerify?: () => void;
  /** Callback when tab changes */
  onTabChange?: (tab: string) => void;
}

/**
 * Main Navbar Component
 * 
 * A responsive, dark-themed navigation bar for the SkillChain platform.
 * Supports three authentication states: logged-out, student, and issuer.
 * 
 * @example
 * // Logged-out state
 * <Navbar authState="logged-out" />
 * 
 * @example
 * // Student state
 * <Navbar 
 *   authState="student" 
 *   user={{ name: "John Doe", initials: "JD" }}
 *   notifications={5}
 *   activeTab="dashboard"
 * />
 */
const Navbar = ({
  authState = "logged-out",
  user = { name: "User", initials: "U" },
  notifications = 0,
  activeTab = "home",
  onLogin,
  onSignup,
  onLogout,
  onVerify,
  onTabChange,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  const isAuthenticated = authState !== "logged-out";

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${isScrolled 
          ? "nav-glass shadow-lg" 
          : "bg-nav-bg/50 backdrop-blur-sm"
        }
      `}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Navigation Links (Desktop) */}
          <NavLinks
            authState={authState}
            activeTab={currentTab}
            onTabChange={handleTabChange}
          />

          {/* Right: Auth buttons or User menu */}
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <AuthButtons
                  onLogin={onLogin}
                  onSignup={onSignup}
                  onVerify={onVerify}
                />
              </>
            ) : (
              <>
                <NotificationBell count={notifications} />
                <UserMenu user={user} onLogout={onLogout} />
              </>
            )}

            {/* Mobile Menu */}
            <MobileMenu
              authState={authState}
              activeTab={currentTab}
              onTabChange={handleTabChange}
              onLogin={onLogin}
              onSignup={onSignup}
              onVerify={onVerify}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
