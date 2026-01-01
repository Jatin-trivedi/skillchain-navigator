import { Building2, User, Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddedByIndicatorProps {
  addedBy: 'issuer' | 'student';
  issuerName?: string;
  studentName?: string;
  showChain?: boolean;
  className?: string;
}

export const AddedByIndicator = ({
  addedBy,
  issuerName,
  studentName,
  showChain = false,
  className,
}: AddedByIndicatorProps) => {
  const isIssuer = addedBy === 'issuer';
  
  const config = isIssuer
    ? {
        label: 'Added by Issuer',
        description: 'This credential was issued directly by the organization.',
        icon: <Building2 className="w-4 h-4" />,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10 border-blue-500/20',
        name: issuerName,
      }
    : {
        label: 'Added by Student',
        description: 'This credential was added by the student for verification.',
        icon: <User className="w-4 h-4" />,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10 border-emerald-500/20',
        name: studentName,
      };

  return (
    <div className={cn('space-y-3', className)}>
      <div className={cn('p-3 rounded-lg border', config.bgColor)}>
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-full bg-background/50', config.color)}>
            {config.icon}
          </div>
          <div>
            <p className={cn('text-sm font-medium', config.color)}>
              {config.label}
            </p>
            {config.name && (
              <p className="text-xs text-muted-foreground">{config.name}</p>
            )}
          </div>
        </div>
      </div>

      {showChain && (
        <div className="p-3 rounded-lg bg-muted/30 border border-border">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Verification Chain
          </p>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                isIssuer ? 'bg-blue-500/20' : 'bg-emerald-500/20'
              )}>
                {isIssuer ? '🏢' : '👤'}
              </div>
              <span className="text-muted-foreground">
                {isIssuer ? 'Issuer' : 'Student'}
              </span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                🔗
              </div>
              <span className="text-muted-foreground">Blockchain</span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-muted-foreground">Verified</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
