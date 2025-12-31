import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface UseCase {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  uses: string[];
  organization: string;
  credentialType: string;
  exampleTitle: string;
  exampleRecipient: string;
  issueDate: string;
  credentialId: string;
  stats: {
    time: string;
    verificationRate: string;
    adoption: string;
  };
}

const UseCaseCard = ({ useCase }: { useCase: UseCase }) => {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 group">
      {/* Header with gradient */}
      <div className={`p-6 bg-gradient-to-r ${useCase.gradient} relative`}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <useCase.icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{useCase.title}</h3>
            <p className="text-white/80 text-sm">{useCase.description}</p>
          </div>
        </div>
      </div>

      {/* Uses list */}
      <div className="p-6 border-b border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Used For:
        </p>
        <ul className="space-y-2">
          {useCase.uses.map((use) => (
            <li key={use} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              {use}
            </li>
          ))}
        </ul>
      </div>

      {/* Example credential preview */}
      <div className="p-6 bg-muted/30">
        <div className="rounded-xl bg-card border border-border p-4">
          {/* Credential header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <useCase.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{useCase.organization}</p>
                <p className="text-sm font-medium text-foreground">{useCase.credentialType}</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>

          {/* Credential details */}
          <div className="space-y-2 mb-4">
            <p className="font-semibold text-foreground">{useCase.exampleTitle}</p>
            <p className="text-sm text-muted-foreground">{useCase.exampleRecipient}</p>
          </div>

          {/* Metadata */}
          <div className="flex justify-between text-xs pt-3 border-t border-border">
            <div>
              <p className="text-muted-foreground">Issued</p>
              <p className="font-medium text-foreground">{useCase.issueDate}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Credential ID</p>
              <p className="font-mono text-foreground">{useCase.credentialId}</p>
            </div>
          </div>
        </div>

        <Link
          to="/verify"
          className="flex items-center justify-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View Full Example
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats footer */}
      <div className="p-4 bg-muted/10 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Avg. Time</p>
            <p className="text-sm font-semibold text-foreground">{useCase.stats.time}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Success Rate</p>
            <p className="text-sm font-semibold text-emerald-500">{useCase.stats.verificationRate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Adoption</p>
            <p className="text-sm font-semibold text-foreground">{useCase.stats.adoption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCaseCard;
