import { Link } from "react-router-dom";
import { Shield, CheckCircle, Lock, Globe, Zap, ArrowRight } from "lucide-react";
import StaticPageLayout, { ProcessStep, TrustIndicator } from "@/components/static/StaticPageLayout";

const DocsPage = () => {
  return (
    <StaticPageLayout
      title="How It Works"
      subtitle="AuthVision transforms traditional credentials into verifiable digital assets with a simple three-step process."
      icon="📚"
    >
      {/* Process Steps */}
      <div className="space-y-8 mb-16">
        <ProcessStep
          number="1"
          icon="📤"
          title="Upload or Issue Credentials"
          description="Organizations upload certificates or enter credential details. Students can also self-add credentials for verification. Supported formats include PDF, images, and manual entry."
          note="Supports PDF, JPEG, PNG, or manual entry"
        >
          <div className="p-4 bg-muted/30 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Upload Certificate</p>
                <p className="text-sm text-muted-foreground">PDF, Image, or Details</p>
              </div>
            </div>
          </div>
        </ProcessStep>

        <ProcessStep
          number="2"
          icon="✅"
          title="Verification & Blockchain Anchoring"
          description="Credentials are verified by issuers and anchored to the blockchain. This creates an immutable record that proves authenticity and prevents tampering."
          note="Issuer validates authenticity"
        >
          <div className="p-4 bg-muted/30 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-foreground">Verification & Approval</p>
                <p className="text-sm text-muted-foreground">Issuer validates authenticity</p>
              </div>
            </div>
          </div>
        </ProcessStep>

        <ProcessStep
          number="3"
          icon="📱"
          title="Share & Verify Instantly"
          description="Generate QR codes or shareable links. Anyone can verify credentials instantly without contacting the issuing organization. Verification is free and instant."
          note="Scan QR or open link"
        >
          <div className="p-4 bg-muted/30 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-foreground">Instant Verification</p>
                <p className="text-sm text-muted-foreground">Scan QR or open link</p>
              </div>
            </div>
          </div>
        </ProcessStep>
      </div>

      {/* Blockchain Section */}
      <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Lock className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Blockchain-Backed Trust</h2>
            <p className="text-muted-foreground">
              Credential integrity is protected using blockchain-anchored proof, 
              ensuring tamper-resistance and transparency. Each credential is immutably recorded, 
              creating a permanent trust anchor that anyone can verify.
            </p>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <TrustIndicator icon={<Shield className="h-5 w-5" />} label="Tamper-Proof" />
          <TrustIndicator icon={<CheckCircle className="h-5 w-5" />} label="Verified" />
          <TrustIndicator icon={<Globe className="h-5 w-5" />} label="Global Access" />
          <TrustIndicator icon={<Lock className="h-5 w-5" />} label="Encrypted" />
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/signup/issuer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition"
        >
          Start Issuing Credentials
          <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">Trusted by 150+ institutions worldwide</p>
      </div>
    </StaticPageLayout>
  );
};

export default DocsPage;
