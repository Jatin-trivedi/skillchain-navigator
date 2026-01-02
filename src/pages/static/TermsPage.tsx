import { Link } from "react-router-dom";
import { AlertTriangle, Check } from "lucide-react";
import StaticPageLayout, { TermItem } from "@/components/static/StaticPageLayout";

const TermsPage = () => {
  return (
    <StaticPageLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our platform."
      icon="⚖️"
      minimal={true}
    >
      {/* Important Notice */}
      <div className="mb-10 p-6 bg-orange-500/10 rounded-2xl border border-orange-500/20">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">Important Notice</h3>
            <p className="text-muted-foreground">
              This is a hackathon prototype platform for demonstration purposes. These terms outline basic expectations and protections.
            </p>
          </div>
        </div>
      </div>

      {/* Terms List */}
      <div className="space-y-6 mb-12">
        <TermItem
          number="1"
          title="Platform Purpose"
          description="AuthVision is a demonstration platform built for hackathon purposes. It showcases blockchain-backed credential verification technology."
          icon="🎯"
        />

        <TermItem
          number="2"
          title="No Legal Warranty"
          description="This platform is provided 'as-is' without any warranties, express or implied. We make no guarantees about uptime, security, or accuracy."
          icon="⚠️"
        />

        <TermItem
          number="3"
          title="User Responsibility"
          description="Users are solely responsible for the data they upload. Do not upload sensitive, confidential, or copyrighted material without permission."
          icon="👤"
        />

        <TermItem
          number="4"
          title="Content Removal"
          description="Misuse, fake data, or violation of these terms may result in content removal and account suspension at our discretion."
          icon="🗑️"
        />

        <TermItem
          number="5"
          title="Platform Changes"
          description="We may modify, suspend, or discontinue any aspect of the platform at any time without notice."
          icon="🔄"
        />

        <TermItem
          number="6"
          title="Intellectual Property"
          description="All platform content, design, and technology are owned by AuthVision. Users retain ownership of their uploaded credentials."
          icon="©️"
        />

        <TermItem
          number="7"
          title="Limitation of Liability"
          description="AuthVision shall not be liable for any indirect, incidental, or consequential damages arising from the use of this platform."
          icon="⚡"
        />
      </div>

      {/* Acceptance Section */}
      <div className="p-8 bg-muted/30 rounded-2xl border border-border text-center">
        <h3 className="text-xl font-bold text-foreground mb-4">Acceptance of Terms</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          By using AuthVision, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-foreground">Last Updated: March 2024</span>
        </div>
      </div>

      {/* Questions */}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Questions about these terms?{" "}
          <Link to="/contact" className="text-primary hover:text-primary/80 transition">
            Contact our team
          </Link>
        </p>
      </div>
    </StaticPageLayout>
  );
};

export default TermsPage;
