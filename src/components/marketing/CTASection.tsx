import { Button } from "@/components/ui/button";
import { Building2, Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Ready to Transform{" "}
          <span className="gradient-text">Credential Verification</span>?
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Join hundreds of institutions already using SkillChain to issue trusted, 
          verifiable credentials.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button
            size="lg"
            className="gradient-bg text-primary-foreground glow-hover group px-8 py-6 text-lg"
            onClick={() => navigate("/signup/issuer")}
          >
            <Building2 className="w-5 h-5 mr-2" />
            Become an Issuer
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-border hover:bg-muted/50 px-8 py-6 text-lg"
            onClick={() => navigate("/verify")}
          >
            <Search className="w-5 h-5 mr-2" />
            Verify a Credential
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required • Get started in 2 minutes • Free for up to 100 credentials
        </p>
      </div>
    </section>
  );
};

export default CTASection;
