import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HelpCircle, 
  BookOpen, 
  Shield, 
  Mail, 
  ChevronDown, 
  CheckCircle,
  QrCode,
  Download,
  Share2,
  MessageCircle
} from "lucide-react";
import StaticPageLayout, { QuickActionCard } from "@/components/static/StaticPageLayout";

const FAQItem = ({ 
  question, 
  answer, 
  icon, 
  defaultExpanded = false,
  children 
}: {
  question: string;
  answer: string;
  icon: string;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  return (
    <div className="bg-card/50 border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="text-xl">{icon}</span>
          <span className="font-bold text-foreground">{question}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <p className="text-muted-foreground mb-4">{answer}</p>
          {children}
        </div>
      )}
    </div>
  );
};

const HelpPage = () => {
  return (
    <StaticPageLayout
      title="Help & FAQ"
      subtitle="Find answers to common questions and get the support you need."
      icon="❓"
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <QuickActionCard
          icon={<Mail className="h-6 w-6" />}
          label="Contact Support"
          description="Get direct help"
          href="/contact"
        />
        <QuickActionCard
          icon={<BookOpen className="h-6 w-6" />}
          label="View Documentation"
          description="Detailed guides"
          href="/docs"
        />
        <QuickActionCard
          icon={<Shield className="h-6 w-6" />}
          label="Security Guide"
          description="Safety best practices"
          href="/why-blockchain"
        />
      </div>

      {/* FAQ Section */}
      <div className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
        
        <FAQItem
          question="How do I add a credential?"
          answer="Adding a credential is simple and takes just a few steps."
          icon="📤"
          defaultExpanded={true}
        >
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium text-foreground mb-3">Quick Steps:</p>
            <div className="space-y-2">
              {[
                "Navigate to Dashboard → Add Credential",
                "Upload certificate file or enter details manually",
                "Fill in credential details (title, issuer, date)",
                "Submit for verification"
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </FAQItem>

        <FAQItem
          question="How does verification work?"
          answer="We use a two-layer verification system to ensure credential authenticity."
          icon="✅"
        >
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-foreground">Two-Layer Verification</p>
                <p className="text-sm text-muted-foreground">Issuer approval + Blockchain anchoring</p>
              </div>
            </div>
          </div>
        </FAQItem>

        <FAQItem
          question="What can I do with QR codes?"
          answer="QR codes provide instant verification and sharing capabilities."
          icon="📱"
        >
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium text-foreground mb-3">QR Code Features:</p>
            <div className="space-y-2">
              {[
                { icon: <QrCode className="h-4 w-4" />, text: "Generate unique QR for each credential" },
                { icon: <Share2 className="h-4 w-4" />, text: "Share instantly with anyone" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "Verify without accounts" },
                { icon: <Download className="h-4 w-4" />, text: "Download for printing" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-muted-foreground">
                  <span className="text-primary">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </FAQItem>

        <FAQItem
          question="Can I become an issuer?"
          answer="Organizations can apply to become verified credential issuers on our platform."
          icon="🏢"
        >
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="font-medium text-foreground mb-3">Issuer Requirements:</p>
            <ul className="space-y-2">
              {[
                "Verified organization email",
                "Admin approval process",
                "Compliance with our standards",
                "Regular security audits"
              ].map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </FAQItem>

        <FAQItem
          question="Is my data secure?"
          answer="Yes. We use enterprise-grade encryption and blockchain technology to protect your credentials and personal information."
          icon="🔒"
        />

        <FAQItem
          question="How do I share my portfolio?"
          answer="Navigate to your dashboard and click 'Share Portfolio' to generate a public link or QR code that you can share with recruiters and employers."
          icon="🔗"
        />
      </div>

      {/* Still Need Help */}
      <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 text-center">
        <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Still Need Help?</h2>
        <p className="text-muted-foreground mb-6">Our support team is ready to assist you.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition"
          >
            <Mail className="h-5 w-5" />
            Contact Support
          </Link>
          <button
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition"
            disabled
          >
            <MessageCircle className="h-5 w-5" />
            Live Chat (Coming Soon)
          </button>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default HelpPage;
