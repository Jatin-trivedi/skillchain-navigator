import { Home, Sparkles, BookOpen, LayoutDashboard, Award, Plus, Share2, FileCheck, List, ShieldCheck } from "lucide-react";

type AuthState = "logged-out" | "student" | "issuer";

interface NavLinksProps {
  authState: AuthState;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  id: string;
}

/**
 * Navigation Links Component
 * Renders different navigation items based on authentication state
 */
const NavLinks = ({ authState, activeTab, onTabChange }: NavLinksProps) => {
  const getNavItems = (): NavItem[] => {
    switch (authState) {
      case "logged-out":
        return [
          { label: "Home", href: "/", id: "home" },
          { label: "Features", href: "/features", id: "features" },
          { label: "Examples", href: "/examples", id: "examples" },
        ];
      case "student":
        return [
          { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" />, id: "dashboard" },
          { label: "My Credentials", href: "/credentials", icon: <Award className="w-4 h-4" />, id: "credentials" },
          { label: "Add New", href: "/add", icon: <Plus className="w-4 h-4" />, id: "add" },
          { label: "Share", href: "/share", icon: <Share2 className="w-4 h-4" />, id: "share" },
        ];
      case "issuer":
        return [
          { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" />, id: "dashboard" },
          { label: "Issue Credential", href: "/issue", icon: <FileCheck className="w-4 h-4" />, id: "issue" },
          { label: "Issued Credentials", href: "/issued", icon: <List className="w-4 h-4" />, id: "issued" },
          { label: "Verify", href: "/verify", icon: <ShieldCheck className="w-4 h-4" />, id: "verify" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            transition-all duration-200
            ${activeTab === item.id 
              ? "text-foreground bg-muted active-link" 
              : "nav-link hover:bg-muted/50"
            }
          `}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavLinks;
