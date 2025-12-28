import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Search, LayoutDashboard, BookOpen, Award, FileText, Navigation } from "lucide-react";
import FooterSection from "./FooterSection";

const FooterLinks = () => {
  const { isAuthenticated, role } = useAuth();
  

  const getLinks = () => {
    const baseLinks = [
      { label: "Verify Credential", href: "/verify", icon: Search },
      { label: "Docs / How It Works", href: "/docs", icon: BookOpen },
    ];

    if (isAuthenticated) {
      if (role === "student") {
        return [
          { label: "My Credentials", href: "/credentials", icon: Award },
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          ...baseLinks,
        ];
      } else if (role === "issuer") {
        return [
          { label: "Issue Credential", href: "/issue", icon: FileText },
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          ...baseLinks,
        ];
      }
    }

    return [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      ...baseLinks,
    ];
  };

  const links = getLinks();

  return (
    <FooterSection title="Quick Links" icon={<Navigation className="w-4 h-4 text-primary" />}>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
            >
              <link.icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="text-sm">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </FooterSection>
  );
};

export default FooterLinks;
