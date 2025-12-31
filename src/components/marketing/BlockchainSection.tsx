import { Shield, Lock, Globe, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const trustPillars = [
  {
    icon: Shield,
    title: "Immutable",
    description: "Once recorded, credentials cannot be altered or deleted",
  },
  {
    icon: Lock,
    title: "Tamper-proof",
    description: "Cryptographic signatures prevent forgery and manipulation",
  },
  {
    icon: Globe,
    title: "Globally verifiable",
    description: "Verify credentials from anywhere without intermediaries",
  },
];

const BlockchainSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Technology
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Powered by <span className="gradient-text">Blockchain</span> Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every credential is anchored to a decentralized blockchain, creating an 
              immutable, tamper-proof record that can be verified globally in seconds.
            </p>

            {/* Trust Pillars */}
            <div className="space-y-6 mb-8">
              {trustPillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <pillar.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Learn more about our blockchain integration
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            {/* Blockchain visualization */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-primary/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-8 rounded-full border border-primary/30 animate-pulse" style={{ animationDelay: "1s" }} />
              
              {/* Center block */}
              <div className="absolute inset-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Verified</p>
                  <p className="text-xs text-muted-foreground">Block #1928374</p>
                </div>
              </div>

              {/* Floating blocks */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 rounded-lg bg-card border border-primary/20 flex items-center justify-center animate-float"
                  style={{
                    top: `${20 + Math.sin(i * 1.2) * 30}%`,
                    left: `${10 + (i * 20)}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <Lock className="w-5 h-5 text-primary/60" />
                </div>
              ))}

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 30 Q 50 50 80 30"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  className="animate-pulse"
                />
                <path
                  d="M 15 50 Q 50 60 85 50"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <path
                  d="M 20 70 Q 50 80 80 70"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  className="animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full gradient-bg" />
                <span className="text-xs text-muted-foreground">Current Block</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/30" />
                <span className="text-xs text-muted-foreground">Previous Hash</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary/30" />
                <span className="text-xs text-muted-foreground">Credential Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockchainSection;
