import Navbar from "@/components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, ExternalLink, QrCode } from "lucide-react";

const Examples = () => {
  const navigate = useNavigate();

  const exampleCredentials = [
    {
      id: "SKC-001",
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      issuerLogo: "AWS",
      recipient: "Sarah Chen",
      date: "December 2024",
      skills: ["Cloud Architecture", "AWS", "Infrastructure"],
      verified: true,
    },
    {
      id: "SKC-002",
      title: "Professional Scrum Master I",
      issuer: "Scrum.org",
      issuerLogo: "SM",
      recipient: "Michael Rodriguez",
      date: "November 2024",
      skills: ["Agile", "Scrum", "Project Management"],
      verified: true,
    },
    {
      id: "SKC-003",
      title: "Full Stack Web Development",
      issuer: "MIT Online",
      issuerLogo: "MIT",
      recipient: "Emily Watson",
      date: "October 2024",
      skills: ["React", "Node.js", "PostgreSQL"],
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        authState="logged-out"
        activeTab="examples"
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
            <QrCode className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Examples
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            See <span className="gradient-text">SkillChain in Action</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore real examples of blockchain-verified credentials issued through
            our platform.
          </p>
        </div>

        {/* Example Credentials */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {exampleCredentials.map((credential) => (
            <Card
              key={credential.id}
              className="bg-card border-border overflow-hidden group hover:border-primary/30 transition-all"
            >
              <div className="h-2 gradient-bg" />
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-sm font-bold text-foreground">
                    {credential.issuerLogo}
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {credential.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Issued by {credential.issuer}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {credential.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-muted text-muted-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Recipient</p>
                    <p className="text-sm font-medium text-foreground">
                      {credential.recipient}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Issued</p>
                    <p className="text-sm font-medium text-foreground">
                      {credential.date}
                    </p>
                  </div>
                </div>

                {/* Verify Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4 border-border group-hover:border-primary/50"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verify Credential
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Want to issue credentials like these?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-bg text-primary-foreground glow-hover"
              onClick={() => navigate("/signup/issuer")}
            >
              Become an Issuer
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border"
              onClick={() => navigate("/signup/student")}
            >
              Get Your Credentials
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Examples;
