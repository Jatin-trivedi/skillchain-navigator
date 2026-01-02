import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowDown,
  Check,
  X,
  Shield,
  User,
  Users,
  FileText,
  Link as LinkIcon
} from "lucide-react";
import StaticPageLayout from "@/components/static/StaticPageLayout";

const BlockchainUseCase = ({ 
  icon, 
  title, 
  description 
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-card/50 rounded-2xl border border-border hover:border-primary/30 transition group">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const ProcessStepVisual = ({ 
  step, 
  title, 
  description, 
  icon 
}: {
  step: string;
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl mb-3">
      {icon}
    </div>
    <div className="text-xs text-primary font-medium mb-1">Step {step}</div>
    <h4 className="font-bold text-foreground mb-1">{title}</h4>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

const ComparisonTable = () => (
  <div className="overflow-hidden rounded-2xl border border-border">
    {/* Table Header */}
    <div className="grid grid-cols-2">
      <div className="p-6 bg-red-500/5 border-r border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <X className="h-5 w-5 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Traditional Certificates</h3>
        </div>
        <p className="text-sm text-muted-foreground">Outdated, insecure, and slow</p>
      </div>
      
      <div className="p-6 bg-green-500/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Check className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Blockchain Advantage</h3>
        </div>
        <p className="text-sm text-muted-foreground">Modern, secure, and instant</p>
      </div>
    </div>
    
    {/* Comparison Rows */}
    <div className="divide-y divide-border">
      {[
        ["Easily forged", "Tamper-proof"],
        ["Hard to verify", "Publicly verifiable"],
        ["Slow manual validation", "Instant automatic validation"],
        ["Centralized control", "Decentralized trust"]
      ].map(([problem, solution], index) => (
        <div key={index} className="grid grid-cols-2">
          <div className="p-4 border-r border-border bg-red-500/5">
            <div className="flex items-center gap-3">
              <X className="h-4 w-4 text-red-400 flex-shrink-0" />
              <span className="text-muted-foreground">{problem}</span>
            </div>
          </div>
          <div className="p-4 bg-green-500/5">
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
              <span className="text-muted-foreground">{solution}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WhyBlockchainPage = () => {
  return (
    <StaticPageLayout
      title="Why Blockchain?"
      subtitle="Transforming credentials from simple documents into verified digital trust assets."
      icon="🔗"
    >
      {/* Hero Statement */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/30 mb-6">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">The Future of Credential Verification</span>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Traditional credentials fail in the digital age. Blockchain solves the fundamental problems of trust, verification, and authenticity.
        </p>
      </div>

      {/* Problem vs Solution */}
      <div className="mb-16">
        <ComparisonTable />
      </div>

      {/* What We Use Blockchain For */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
          What AuthVision Uses Blockchain For
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BlockchainUseCase
            icon="🛡️"
            title="Credential Integrity"
            description="Each credential gets a unique cryptographic hash stored on the blockchain, making it impossible to alter."
          />
          
          <BlockchainUseCase
            icon="👤"
            title="Ownership Proof"
            description="Prove you're the legitimate owner of a credential without revealing sensitive information."
          />
          
          <BlockchainUseCase
            icon="🤝"
            title="Trust Guarantee"
            description="Eliminate the need for intermediaries. Verification happens directly between parties."
          />
        </div>
      </div>

      {/* How It Works Visualization */}
      <div className="mb-16 p-8 bg-muted/30 rounded-2xl border border-border">
        <h3 className="text-xl font-bold text-foreground mb-8 text-center">Blockchain Verification Flow</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <ProcessStepVisual
            step="1"
            title="Credential Created"
            description="Issuer creates credential with unique hash"
            icon="📝"
          />
          
          <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />
          <ArrowDown className="h-8 w-8 text-muted-foreground md:hidden" />
          
          <ProcessStepVisual
            step="2"
            title="Blockchain Anchored"
            description="Hash recorded on decentralized ledger"
            icon="🔗"
          />
          
          <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />
          <ArrowDown className="h-8 w-8 text-muted-foreground md:hidden" />
          
          <ProcessStepVisual
            step="3"
            title="Instant Verification"
            description="Anyone can verify against blockchain record"
            icon="✅"
          />
        </div>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { icon: <Shield className="h-5 w-5" />, label: "Immutable Records" },
          { icon: <User className="h-5 w-5" />, label: "Self-Sovereign Identity" },
          { icon: <Users className="h-5 w-5" />, label: "No Intermediaries" },
          { icon: <LinkIcon className="h-5 w-5" />, label: "Instant Verification" }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 p-4 bg-card/50 rounded-xl border border-border">
            <div className="text-primary">{item.icon}</div>
            <span className="text-sm font-medium text-foreground text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Final Statement */}
      <div className="text-center">
        <div className="inline-block p-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl mb-6">
          <div className="bg-background rounded-xl px-8 py-4">
            <p className="text-xl font-bold text-primary">
              "Blockchain transforms credentials from simple documents into verified digital trust assets."
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          This isn't just about technology—it's about building a future where skills and achievements are recognized, trusted, and valued globally.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/verify"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition"
          >
            Try Blockchain Verification
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/docs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition"
          >
            <FileText className="h-5 w-5" />
            Read Documentation
          </Link>
        </div>
      </div>
    </StaticPageLayout>
  );
};

export default WhyBlockchainPage;
