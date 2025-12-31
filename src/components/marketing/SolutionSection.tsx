import { Button } from "@/components/ui/button";
import { Building2, GraduationCap, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const solutions = [
  {
    role: "For Issuers",
    icon: Building2,
    description: "Issue digital credentials to your students and employees",
    gradient: "from-blue-500 to-cyan-500",
    features: [
      { emoji: "📝", text: "Issue credentials digitally" },
      { emoji: "⏱️", text: "Save 80% admin time" },
      { emoji: "🛡️", text: "Zero fraud risk" },
      { emoji: "📊", text: "Real-time analytics" },
      { emoji: "👥", text: "Bulk issuance support" },
    ],
    cta: { text: "Start Issuing", href: "/signup/issuer" },
  },
  {
    role: "For Students",
    icon: GraduationCap,
    description: "Own and share your achievements with anyone",
    gradient: "from-emerald-500 to-green-500",
    features: [
      { emoji: "👛", text: "Own your credentials forever" },
      { emoji: "🔗", text: "Share anytime with one link" },
      { emoji: "⚡", text: "Build trust instantly" },
      { emoji: "📱", text: "Access anywhere, anytime" },
      { emoji: "🎯", text: "Prove skills to employers" },
    ],
    cta: { text: "Claim Credentials", href: "/signup/student" },
  },
  {
    role: "For Verifiers",
    icon: Search,
    description: "Instantly verify any credential's authenticity",
    gradient: "from-purple-500 to-pink-500",
    features: [
      { emoji: "🔍", text: "Validate in 3 seconds" },
      { emoji: "✅", text: "100% authenticity guarantee" },
      { emoji: "🔗", text: "Blockchain-backed proof" },
      { emoji: "📄", text: "Detailed credential history" },
      { emoji: "🆓", text: "Free to verify" },
    ],
    cta: { text: "Verify Now", href: "/verify" },
  },
];

const SolutionSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">
            The Solution
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted, Verifiable, <span className="gradient-text">Immutable</span> Credentials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete ecosystem for issuing, managing, and verifying blockchain-backed credentials.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={solution.role}
              className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Gradient top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${solution.gradient}`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <solution.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">{solution.role}</h3>
              <p className="text-muted-foreground mb-6">{solution.description}</p>
              
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {solution.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">{feature.emoji}</span>
                    <span className="text-muted-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              <Button
                onClick={() => navigate(solution.cta.href)}
                className={`w-full bg-gradient-to-r ${solution.gradient} text-white hover:opacity-90 group/btn`}
              >
                {solution.cta.text}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
