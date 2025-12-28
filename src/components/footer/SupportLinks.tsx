import { HelpCircle, AlertTriangle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection";

const SupportLinks = () => {
  const links = [
    { label: "Help & FAQ", href: "/help", icon: HelpCircle },
    { label: "Report an Issue", href: "/report", icon: AlertTriangle },
    { label: "Contact Us", href: "/contact", icon: Mail },
  ];

  return (
    <FooterSection title="Support" icon={<HelpCircle className="w-4 h-4 text-primary" />}>
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

export default SupportLinks;
