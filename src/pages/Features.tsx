import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Blocks,
  Award,
  Globe,
  Lock,
  Zap,
  Users,
  FileCheck,
  BarChart3,
  RefreshCw,
  GraduationCap,
  Share2,
  Smartphone,
  CheckCircle2,
  Search,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const Features = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const issuerFeatures = [
    {
      icon: FileCheck,
      title: "Issue Digital Credentials",
      description: "Create and issue verifiable digital credentials in minutes, not days.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Bulk Issue Credentials",
      description: "Issue to hundreds of students at once with CSV upload and validation.",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: Shield,
      title: "Secure Identity Verification",
      description: "Ensure credentials go to the right recipients with identity checks.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Sparkles,
      title: "Credential Templates",
      description: "Use customizable templates for consistent, professional credentials.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "Management Dashboard",
      description: "Track issuance, verifications, and analytics in real-time.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: RefreshCw,
      title: "Revoke Credentials",
      description: "Instantly revoke credentials if needed, with full audit trail.",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  const studentFeatures = [
    {
      icon: GraduationCap,
      title: "Own Your Credentials",
      description: "Your achievements belong to you, stored permanently on the blockchain.",
    },
    {
      icon: Share2,
      title: "Share Instantly",
      description: "Share credentials with a single link or QR code to anyone, anywhere.",
    },
    {
      icon: Smartphone,
      title: "Access Anywhere",
      description: "View and manage your credentials from any device, anytime.",
    },
    {
      icon: Lock,
      title: "Privacy Control",
      description: "You decide who sees your credentials with granular sharing controls.",
    },
    {
      icon: Award,
      title: "Build Your Portfolio",
      description: "Collect all your achievements in one trusted, verifiable portfolio.",
    },
  ];

  const verificationFeatures = [
    {
      icon: Search,
      title: "Instant Verification",
      description: "Verify any credential in under 3 seconds with a simple ID or QR scan.",
    },
    {
      icon: CheckCircle2,
      title: "100% Authenticity",
      description: "Blockchain-backed verification ensures absolute authenticity.",
    },
    {
      icon: Clock,
      title: "Real-time Status",
      description: "See the current status of any credential - active, revoked, or expired.",
    },
    {
      icon: Globe,
      title: "No Account Needed",
      description: "Verify credentials without signing up - completely free and open.",
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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Powerful Features
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Built for <span className="gradient-text">Trust & Security</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            SkillChain combines blockchain technology with user-friendly design
            to create the most secure and accessible credential platform.
          </p>
        </div>

        {/* Issuer Features Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              For Issuers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Issue Credentials with Confidence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, manage, and track blockchain-verified credentials.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {issuerFeatures.map((feature, index) => (
              <Card
                key={feature.title}
                className="bg-card border-border hover:border-primary/30 transition-all duration-300 group overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${feature.gradient}`} />
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Student Features Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              For Students
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Own Your Achievements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take control of your credentials and share them with the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {studentFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/30 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verification Features Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
              For Verifiers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Verify with Confidence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Instant, free, and foolproof credential verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {verificationFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive Demo */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Try Verification Live
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter a demo credential ID below
              </p>
            </div>

            <div className="flex gap-3 mb-4 flex justify-center">
              
              <Button
                className="gradient-bg text-primary-foreground px-6  "
                onClick={() => navigate("/verify")} 
              >
                Verify
              </Button>
            </div>

        
          </div>
        </section>

        {/* Blockchain Section */}
        <section className="mb-24 py-16 px-8 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Blocks className="w-3 h-3 mr-1" />
                Blockchain Technology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Enterprise-Grade Security
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every credential is cryptographically secured and anchored to the blockchain.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Cryptographic Proof</h3>
                <p className="text-sm text-muted-foreground">
                  SHA-256 hashing ensures data integrity and prevents tampering.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Blocks className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Immutable Records</h3>
                <p className="text-sm text-muted-foreground">
                  Once recorded, credentials cannot be altered or deleted.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Decentralized</h3>
                <p className="text-sm text-muted-foreground">
                  No single point of failure. Your credentials are always accessible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of organizations already using SkillChain for trusted credentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-bg text-primary-foreground glow-hover group px-8"
              onClick={() => navigate("/signup")}
            >
              Create Account
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
