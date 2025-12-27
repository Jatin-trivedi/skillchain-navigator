import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Shield, Blocks, Award, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        authState="logged-out"
        activeTab="home"
        onLogin={() => navigate("/login")}
        onSignup={() => navigate("/signup")}
        onVerify={() => navigate("/verify")}
        onTabChange={(tab) => {
          if (tab === "home") navigate("/");
          else if (tab === "features") navigate("/features");
          else if (tab === "examples") navigate("/examples");
        }}
      />

      <main className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
            <Blocks className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by Blockchain Technology
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Your Skills,{" "}
            <span className="gradient-text">Verified Forever</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            SkillChain revolutionizes credential verification using blockchain technology. 
            Issue, manage, and share your professional credentials with complete transparency and security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="gradient-bg text-primary-foreground glow-hover group px-8"
              onClick={() => navigate("/signup")}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted/50"
              onClick={() => navigate("/verify")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Verify a Credential
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
          {[
            { icon: Shield, title: "Tamper-Proof", description: "Credentials are stored on an immutable blockchain, ensuring authenticity." },
            { icon: Blocks, title: "Decentralized", description: "No single point of failure. Your credentials are always accessible." },
            { icon: Award, title: "Instant Verification", description: "Verify credentials in seconds with cryptographic proof." },
          ].map((feature) => (
            <div key={feature.title} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:glow-sm">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
