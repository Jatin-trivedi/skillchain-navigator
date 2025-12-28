import { Scale, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection";

const LegalLinks = () => {
  return (
    <FooterSection title="Legal" icon={<Scale className="w-4 h-4 text-primary" />}>
      <ul className="space-y-2">
        <li>
          <Link
            to="/terms"
            className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
          >
            Terms & Conditions
          </Link>
        </li>
        <li>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1 inline-block"
          >
            Privacy Policy
          </Link>
        </li>
      </ul>
      
      <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground/70">
        <Shield className="w-3 h-3 text-primary/50" />
        <span>GDPR Compliant • Data Encrypted</span>
      </div>
    </FooterSection>
  );
};

export default LegalLinks;
