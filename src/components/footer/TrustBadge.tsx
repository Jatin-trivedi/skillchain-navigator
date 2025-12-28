import { Shield, Lock, CheckCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TrustBadge = () => {
  const badges = [
    { label: "Tamper-Proof", icon: Lock },
    { label: "Verifiable", icon: CheckCircle },
    { label: "Secure", icon: Shield },
  ];

  return (
    <FooterSection title="Trust & Security" icon={<Shield className="w-4 h-4 text-primary" />}>
      <div className="space-y-4">
        {/* Blockchain Badge */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 text-muted-foreground cursor-help">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center animate-pulse">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Powered by Blockchain</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-card border-border">
              <p className="text-sm">Immutable verification • Instant validation • Zero forgery risk</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <TooltipProvider key={badge.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all cursor-help">
                    <badge.icon className="w-3 h-3 text-primary" />
                    <span>{badge.label}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-card border-border">
                  <p className="text-sm">Credentials are {badge.label.toLowerCase()} on the blockchain</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Learn More Link */}
        <Link
          to="/docs"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors group"
        >
          <span>Why Blockchain?</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </FooterSection>
  );
};

export default TrustBadge;
