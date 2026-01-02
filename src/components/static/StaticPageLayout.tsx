import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

interface StaticPageLayoutProps {
  title: string;
  subtitle?: string;
  icon?: string;
  children: ReactNode;
  minimal?: boolean;
}

const StaticPageLayout = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  minimal = false 
}: StaticPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <div className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link 
                to="/" 
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition text-sm"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{title}</span>
            </div>
            
            {/* Title with Icon */}
            <div className="flex items-center gap-4 mb-4">
              {icon && (
                <div className="text-4xl md:text-5xl">{icon}</div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {title}
              </h1>
            </div>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Content Section */}
        <div className={`max-w-4xl mx-auto px-4 py-12 ${minimal ? 'prose-sm' : ''}`}>
          {children}
        </div>
        
        {/* Back Navigation */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Reusable sub-components
export const ProcessStep = ({ 
  number, 
  icon, 
  title, 
  description, 
  note,
  children 
}: {
  number: string;
  icon: string;
  title: string;
  description: string;
  note?: string;
  children?: ReactNode;
}) => (
  <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-card/50 rounded-2xl border border-border">
    <div className="flex-shrink-0">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-xl font-bold text-primary-foreground">
        {number}
      </div>
    </div>
    
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {note && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full mb-4">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">{note}</span>
        </div>
      )}
      
      {children}
    </div>
  </div>
);

export const TrustIndicator = ({ 
  icon, 
  label 
}: { 
  icon: ReactNode; 
  label: string; 
}) => (
  <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl border border-border">
    <div className="p-2 bg-primary/10 rounded-lg text-primary">
      {icon}
    </div>
    <span className="font-medium text-foreground">{label}</span>
  </div>
);

export const QuickActionCard = ({ 
  icon, 
  label, 
  description, 
  href 
}: {
  icon: ReactNode;
  label: string;
  description: string;
  href: string;
}) => (
  <Link 
    to={href}
    className="flex items-center gap-4 p-5 bg-card/50 rounded-xl border border-border hover:border-primary/50 hover:bg-card transition group"
  >
    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-foreground group-hover:text-primary transition">{label}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </Link>
);

export const TermItem = ({ 
  number, 
  title, 
  description, 
  icon 
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="flex items-start gap-4 p-6 bg-card/30 rounded-xl border border-border">
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
      {icon}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-muted-foreground">Section {number}</span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export const PrivacyPrinciple = ({ 
  icon, 
  title, 
  description 
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-card/50 rounded-xl border border-border">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export const PrivacyPoint = ({ 
  title, 
  points 
}: {
  title: string;
  points: string[];
}) => (
  <div className="p-6 bg-card/30 rounded-xl border border-border">
    <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
    <ul className="space-y-2">
      {points.map((point, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
          <span className="text-muted-foreground">{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default StaticPageLayout;
