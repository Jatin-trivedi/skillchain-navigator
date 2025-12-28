import { ReactNode } from "react";

interface FooterSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const FooterSection = ({ title, icon, children }: FooterSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-foreground font-semibold text-sm uppercase tracking-wider">
        {icon}
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export default FooterSection;
