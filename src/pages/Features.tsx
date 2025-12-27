import Navbar from "@/components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Blocks,
  Award,
  Globe,
  Lock,
  Zap,
  Users,
  CheckCircle2,
} from "lucide-react";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Tamper-Proof Security",
      description:
        "Every credential is cryptographically signed and stored on an immutable blockchain, making forgery impossible.",
    },
    {
      icon: Blocks,
      title: "Decentralized Storage",
      description:
        "Your credentials aren't controlled by any single entity. They're distributed across a global network.",
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description:
        "Verify any credential in seconds with a simple scan or link. No phone calls or emails required.",
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description:
        "Credentials issued on SkillChain are recognized and verifiable anywhere in the world.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "You control who sees your credentials. Share selectively with granular permission controls.",
    },
    {
      icon: Users,
      title: "Trusted Network",
      description:
        "Join thousands of verified issuers including universities, companies, and certification bodies.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        authState="logged-out"
        activeTab="features"
        onLogin={() => navigate("/login")}
        onSignup={() => navigate("/signup")}
        onVerify={() => navigate("/verify")}
        onTabChange={(tab) => {
          if (tab === "home") navigate("/");
          else if (tab === "features") navigate("/features");
          else if (tab === "examples") navigate("/examples");
        }}
      />

      <main className="container mx-auto px-4 md:px-8 py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Features
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for <span className="gradient-text">Trust & Security</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            SkillChain combines blockchain technology with user-friendly design
            to create the most secure and accessible credential platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="bg-card border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div
                  className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-bg text-primary-foreground glow-hover"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border"
              onClick={() => navigate("/examples")}
            >
              See Examples
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Features;
