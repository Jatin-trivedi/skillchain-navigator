import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: 'primary' | 'success' | 'warning' | 'error' | 'none';
}

const gradientConfig = {
  primary: 'hover:border-primary/40',
  success: 'hover:border-emerald-500/40',
  warning: 'hover:border-yellow-500/40',
  error: 'hover:border-red-500/40',
  none: '',
};

export const GlassCard = ({
  children,
  className,
  hover = true,
  glow = false,
  gradient = 'primary',
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        'relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden transition-all duration-300',
        hover && 'glass-hover',
        hover && gradientConfig[gradient],
        glow && 'glow-sm',
        className
      )}
    >
      {children}
    </div>
  );
};

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: 'primary' | 'success' | 'warning';
}

const textGradientConfig = {
  primary: 'from-primary to-secondary',
  success: 'from-emerald-400 to-cyan-400',
  warning: 'from-yellow-400 to-orange-400',
};

export const GradientText = ({
  children,
  className,
  gradient = 'primary',
}: GradientTextProps) => {
  return (
    <span className={cn(
      'bg-gradient-to-r bg-clip-text text-transparent',
      textGradientConfig[gradient],
      className
    )}>
      {children}
    </span>
  );
};

// Trust indicator component
interface TrustIndicatorProps {
  icon: ReactNode;
  label: string;
  verified?: boolean;
  className?: string;
}

export const TrustIndicator = ({
  icon,
  label,
  verified = true,
  className,
}: TrustIndicatorProps) => {
  return (
    <div className={cn(
      'flex items-center gap-2 p-3 rounded-lg border transition-colors',
      verified 
        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
        : 'bg-muted/50 border-border text-muted-foreground',
      className
    )}>
      <div className={cn(
        'p-1 rounded',
        verified ? 'bg-emerald-500/20' : 'bg-muted'
      )}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};