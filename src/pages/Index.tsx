import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Shield, Blocks, Award, ArrowRight, Check } from "lucide-react";

type AuthState = "logged-out" | "student" | "issuer";

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>("logged-out");
  const [activeTab, setActiveTab] = useState("home");

  const mockUser = {
    name: "John Doe",
    initials: "JD",
  };

  const handleLogin = () => {
    setAuthState("student");
    setActiveTab("dashboard");
  };

  const handleLogout = () => {
    setAuthState("logged-out");
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar
        authState={authState}
        user={mockUser}
        notifications={5}
        activeTab={activeTab}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSignup={() => console.log("Signup clicked")}
        onVerify={() => console.log("Verify clicked")}
        onTabChange={setActiveTab}
      />

      {/* Demo Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 rounded-xl bg-card/90 backdrop-blur-xl border border-border shadow-2xl">
          <span className="px-3 text-xs font-medium text-muted-foreground">Demo:</span>
          {(["logged-out", "student", "issuer"] as AuthState[]).map((state) => (
            <Button
              key={state}
              size="sm"
              variant={authState === state ? "default" : "ghost"}
              onClick={() => {
                setAuthState(state);
                setActiveTab(state === "logged-out" ? "home" : "dashboard");
              }}
              className={`
                text-xs capitalize
                ${authState === state ? "gradient-bg text-primary-foreground" : ""}
              `}
            >
              {state.replace("-", " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
            <Blocks className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by Blockchain Technology
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Your Skills,{" "}
            <span className="gradient-text">Verified Forever</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            SkillChain revolutionizes credential verification using blockchain technology. 
            Issue, manage, and share your professional credentials with complete transparency and security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="gradient-bg text-primary-foreground glow-hover group px-8"
              onClick={handleLogin}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted/50"
            >
              <Shield className="w-4 h-4 mr-2" />
              Verify a Credential
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto">
          {[
            {
              icon: Shield,
              title: "Tamper-Proof",
              description: "Credentials are stored on an immutable blockchain, ensuring authenticity.",
            },
            {
              icon: Blocks,
              title: "Decentralized",
              description: "No single point of failure. Your credentials are always accessible.",
            },
            {
              icon: Award,
              title: "Instant Verification",
              description: "Verify credentials in seconds with cryptographic proof.",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:glow-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 py-12 border-y border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "10K+", label: "Credentials Issued" },
              { value: "500+", label: "Institutions" },
              { value: "99.9%", label: "Uptime" },
              { value: "< 1s", label: "Verification Time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Trusted by Leading Institutions
          </h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {["Stanford", "MIT", "Harvard", "Berkeley", "Oxford"].map((name) => (
              <div
                key={name}
                className="px-6 py-3 text-lg font-semibold text-muted-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 SkillChain. Securing credentials on the blockchain.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
