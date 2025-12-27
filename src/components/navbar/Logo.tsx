import { Award } from "lucide-react";

/**
 * SkillChain Logo Component
 * Displays the brand logo with gradient text effect
 */
const Logo = () => {
  return (
    <a href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <Award className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="text-xl font-bold gradient-text">SkillChain</span>
    </a>
  );
};

export default Logo;
