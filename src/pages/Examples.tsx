import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UseCaseCard from "@/components/marketing/UseCaseCard";
import {
  GraduationCap,
  Trophy,
  Building2,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const useCases = [
  {
    title: "University Degrees & Certifications",
    description: "Higher education institutions issuing verifiable diplomas and transcripts",
    icon: GraduationCap,
    gradient: "from-blue-600 to-cyan-500",
    uses: [
      "Degree and diploma verification",
      "Course completion certificates",
      "Micro-credential issuance",
      "Academic transcript verification",
    ],
    organization: "Stanford University",
    credentialType: "Bachelor's Degree",
    exampleTitle: "Bachelor of Science in Computer Science",
    exampleRecipient: "Awarded to Alex Johnson",
    issueDate: "May 15, 2024",
    credentialId: "CRD-STAN-CS2024",
    stats: {
      time: "2 minutes",
      verificationRate: "99.9%",
      adoption: "45+ universities",
    },
  },
  {
    title: "Hackathon & Competition Awards",
    description: "Event organizers certifying participation and achievements",
    icon: Trophy,
    gradient: "from-amber-500 to-orange-500",
    uses: [
      "Hackathon participation proof",
      "Winner & runner-up certificates",
      "Skill assessment badges",
      "Team achievement recognition",
    ],
    organization: "TechCrunch Disrupt",
    credentialType: "Hackathon Winner",
    exampleTitle: "1st Place - AI Innovation Track",
    exampleRecipient: "Awarded to Team Innovate",
    issueDate: "October 20, 2024",
    credentialId: "CRD-TCD-HAK2024",
    stats: {
      time: "30 seconds",
      verificationRate: "100%",
      adoption: "120+ events",
    },
  },
  {
    title: "Corporate Training & Badges",
    description: "Companies certifying employee skills and training completion",
    icon: Building2,
    gradient: "from-purple-600 to-pink-500",
    uses: [
      "Employee training verification",
      "Skill certification badges",
      "Compliance training records",
      "Leadership program completion",
    ],
    organization: "Google Cloud",
    credentialType: "Professional Certification",
    exampleTitle: "Cloud Architect Professional",
    exampleRecipient: "Awarded to Sarah Mitchell",
    issueDate: "November 10, 2024",
    credentialId: "CRD-GCP-PRO2024",
    stats: {
      time: "1 minute",
      verificationRate: "99.8%",
      adoption: "200+ companies",
    },
  },
  {
    title: "Bootcamp & Workshop Completion",
    description: "Educational providers certifying intensive program graduates",
    icon: BookOpen,
    gradient: "from-emerald-500 to-green-500",
    uses: [
      "Bootcamp graduation certificates",
      "Workshop attendance proof",
      "Skill assessment results",
      "Project portfolio verification",
    ],
    organization: "Coursera",
    credentialType: "Course Completion",
    exampleTitle: "Full Stack Web Development",
    exampleRecipient: "Awarded to Michael Chen",
    issueDate: "December 5, 2024",
    credentialId: "CRD-CSR-FSW2024",
    stats: {
      time: "45 seconds",
      verificationRate: "99.5%",
      adoption: "50+ providers",
    },
  },
];

const Examples = () => {
  const navigate = useNavigate();

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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Real-World Examples
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            See <span className="gradient-text">AuthVision in action
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore how organizations across industries use AuthVision
to issue 
            trusted, blockchain-verified credentials.
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.title} useCase={useCase} />
          ))}
        </div>

        {/* Additional Industries */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              And Many More Industries...
            </h2>
            <p className="text-muted-foreground">
              SkillChain is flexible enough for any credentialing need.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Healthcare Certifications",
              "Legal Compliance",
              "Financial Services",
              "Government IDs",
              "Professional Licenses",
              "Non-profit Recognition",
              "Athletic Achievements",
              "Volunteer Hours",
              "Research Publications",
              "Art & Design Portfolios",
            ].map((industry) => (
              <Badge
                key={industry}
                variant="secondary"
                className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 cursor-default"
              >
                {industry}
              </Badge>
            ))}
          </div>
        </section>

        {/* Stats Banner */}
        <section className="mb-20 py-12 px-8 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-border">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold gradient-text">12,456+</p>
              <p className="text-muted-foreground">Credentials Issued</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-text">89+</p>
              <p className="text-muted-foreground">Institutions</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-text">99.8%</p>
              <p className="text-muted-foreground">Verification Success</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-text">&lt;3s</p>
              <p className="text-muted-foreground">Avg. Verification Time</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Want to Issue Credentials Like These?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get started in minutes and join the growing network of trusted issuers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-bg text-primary-foreground glow-hover group px-8"
              onClick={() => navigate("/signup/issuer")}
            >
              <Award className="w-5 h-5 mr-2" />
              Become an Issuer
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border"
              onClick={() => navigate("/signup/student")}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Get Your Credentials
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Examples;
