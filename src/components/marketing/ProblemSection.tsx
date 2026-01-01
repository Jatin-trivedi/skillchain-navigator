import { FileX, Clock, UserX, Building2 } from "lucide-react";

const problems = [
  {
    icon: FileX,
    title: "Certificates get lost or forged",
    description: "Physical documents are easily misplaced, damaged, or counterfeited with modern tools.",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
  {
    icon: Clock,
    title: "Recruiters can't verify authenticity",
    description: "HR teams waste hours manually verifying credentials, delaying hiring processes.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    icon: UserX,
    title: "Students can't prove achievements instantly",
    description: "Graduates struggle to share verifiable proof of skills during interviews and applications.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    icon: Building2,
    title: "Institutions face admin headache",
    description: "Universities and organizations manage piles of paperwork with high overhead costs.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Problem with Traditional Certificates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Legacy systems fail to meet modern verification needs, creating friction for everyone.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className={`p-6 rounded-2xl ${problem.bgColor} border ${problem.borderColor} transition-all duration-300 hover:scale-105`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${problem.bgColor} flex items-center justify-center mb-4`}>
                <problem.icon className={`w-6 h-6 ${problem.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
