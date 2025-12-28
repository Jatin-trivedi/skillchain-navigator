import FooterLinks from "./FooterLinks";
import TrustBadge from "./TrustBadge";
import SupportLinks from "./SupportLinks";
import PlatformDescription from "./PlatformDescription";
import LegalLinks from "./LegalLinks";
import Branding from "./Branding";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          <FooterLinks />
          <TrustBadge />
          <SupportLinks />
          <PlatformDescription />
          <LegalLinks />
        </div>

        {/* Branding Section */}
        <Branding />
      </div>
    </footer>
  );
};

export default Footer;
