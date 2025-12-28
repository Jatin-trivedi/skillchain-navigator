import { Info, Users, Zap } from "lucide-react";
import FooterSection from "./FooterSection";

const PlatformDescription = () => {
  return (
    <FooterSection title="About SkillChain" icon={<Info className="w-4 h-4 text-primary" />}>
      <p className="text-sm text-muted-foreground leading-relaxed">
        A blockchain-powered platform for issuing, verifying, and managing tamper-proof skill credentials. Revolutionizing how skills are recognized and trusted globally.
      </p>
      
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4 text-primary/70" />
          <span>Built for students, institutions, and organizations</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="w-4 h-4 text-primary/70" />
          <span>Instant verification • No intermediaries</span>
        </div>
      </div>
    </FooterSection>
  );
};

export default PlatformDescription;
