import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import StaticPageLayout, { PrivacyPrinciple, PrivacyPoint } from "@/components/static/StaticPageLayout";

const PrivacyPage = () => {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      subtitle="We respect your privacy and are committed to protecting your personal data."
      icon="🔐"
      minimal={true}
    >
      {/* Core Principle */}
      <div className="mb-10 p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
        <div className="flex items-start gap-4">
          <Shield className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Our Privacy Promise</h3>
            <p className="text-muted-foreground">
              Your privacy is our priority. We handle your data with care and transparency.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <PrivacyPrinciple
          icon="🙅"
          title="We Do Not Sell Data"
          description="We never sell, rent, or trade your personal information to third parties."
        />
        
        <PrivacyPrinciple
          icon="🔒"
          title="Secure Storage"
          description="Credentials and personal data are stored with enterprise-grade encryption."
        />
        
        <PrivacyPrinciple
          icon="🧹"
          title="Right to Delete"
          description="Users may request account and data deletion at any time."
        />
        
        <PrivacyPrinciple
          icon="👁️"
          title="Transparent Access"
          description="Only authorized issuers can verify credentials with your permission."
        />
      </div>

      {/* Detailed Points */}
      <div className="space-y-6 mb-12">
        <PrivacyPoint
          title="Data Collection"
          points={[
            "We collect only necessary information: name, email, and credential data",
            "No sensitive financial information is stored",
            "All data is encrypted both in transit and at rest"
          ]}
        />

        <PrivacyPoint
          title="Data Usage"
          points={[
            "To verify and display your credentials",
            "To improve platform functionality",
            "To send important notifications about your account"
          ]}
        />

        <PrivacyPoint
          title="Data Sharing"
          points={[
            "Credential data is shared only when you choose to share via QR or link",
            "We may share anonymized analytics to improve services",
            "Legal compliance when required by law"
          ]}
        />

        <PrivacyPoint
          title="Your Rights"
          points={[
            "Access your personal data",
            "Correct inaccurate data",
            "Delete your account and data",
            "Opt-out of non-essential communications"
          ]}
        />

        <PrivacyPoint
          title="Security Measures"
          points={[
            "256-bit SSL encryption for all data",
            "Regular security audits and penetration testing",
            "Blockchain anchoring for credential integrity",
            "GDPR compliance for European users"
          ]}
        />
      </div>

      {/* Contact for Privacy */}
      <div className="p-8 bg-muted/30 rounded-2xl border border-border text-center">
        <h3 className="text-xl font-bold text-foreground mb-4">Privacy Questions?</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          If you have questions about your privacy or data handling, our team is here to help.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition"
        >
          Contact Privacy Team
        </Link>
      </div>
    </StaticPageLayout>
  );
};

export default PrivacyPage;
