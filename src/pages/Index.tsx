import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/marketing/HeroSection";
import ProblemSection from "@/components/marketing/ProblemSection";
import SolutionSection from "@/components/marketing/SolutionSection";
import BlockchainSection from "@/components/marketing/BlockchainSection";
import StatsSection from "@/components/marketing/StatsSection";
import CTASection from "@/components/marketing/CTASection";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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

      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BlockchainSection />
        <StatsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
