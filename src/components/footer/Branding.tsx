import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Branding = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
      {/* Logo & Tagline */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
          <img
            src="/logo.png"
            alt="SkillChain Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold gradient-text">SkillChain</span>
          <span className="text-xs text-muted-foreground">
            Verifiable • Secure • Blockchain-Backed
          </span>
        </div>
      </Link>

      {/* Copyright & Hackathon Badge */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <span className="text-sm text-muted-foreground">
          © 2026 SkillChain. All rights reserved.
        </span>
        
        {/* Hackathon MVP Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">Hackathon MVP</span>
        </div>
      </div>
    </div>
  );
};

export default Branding;
