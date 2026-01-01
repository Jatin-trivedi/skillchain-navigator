import { Button } from "@/components/ui/button";
import { Blocks, Shield, ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
          }}
        />
        
        {/* Floating blockchain blocks */}
        <div className="absolute top-20 left-10 w-12 h-12 border border-primary/30 rounded-lg rotate-12 animate-float opacity-20" />
        <div className="absolute top-40 right-20 w-8 h-8 border border-secondary/30 rounded-lg -rotate-12 animate-float opacity-20" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-32 left-1/4 w-10 h-10 border border-primary/30 rounded-lg rotate-45 animate-float opacity-20" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border backdrop-blur-sm mb-8 animate-fade-in">
          <Blocks className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Powered by Blockchain Technology
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Your Skills,{" "}
          <span className="gradient-text">Verified Forever</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          SkillChain revolutionizes credential verification using blockchain technology.
          Issue, manage, and verify professional credentials with{" "}
          <span className="text-foreground font-medium">trust</span> and{" "}
          <span className="text-foreground font-medium">transparency</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button
            size="lg"
            className="gradient-bg text-primary-foreground glow-hover group px-8 py-6 text-lg"
            onClick={() => navigate("/signup")}
          >
            <Award className="w-5 h-5 mr-2" />
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-muted/50 px-8 py-6 text-lg"
            onClick={() => navigate("/verify")}
          >
            <Shield className="w-5 h-5 mr-2" />
            Verify Credential
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>100% Tamper-Proof</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Instant Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Global Recognition</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Free to Start</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
