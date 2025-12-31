import { CheckCircle2, Clock, XCircle, AlertTriangle, Ban } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type CredentialStatusType = 'verified' | 'issued' | 'pending' | 'rejected' | 'expired' | 'revoked';

interface CredentialStatusBadgeProps {
  status: CredentialStatusType | string;
  showMessage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<string, {
  label: string;
  color: string;
  icon: React.ReactNode;
  message: string;
}> = {
  verified: {
    label: 'Verified',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: <CheckCircle2 className="w-3 h-3" />,
    message: 'This credential has been verified on the blockchain and is authentic.',
  },
  issued: {
    label: 'Verified',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    icon: <CheckCircle2 className="w-3 h-3" />,
    message: 'This credential is issued and valid.',
  },
  pending: {
    label: 'Pending',
    color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    icon: <Clock className="w-3 h-3" />,
    message: 'This credential is awaiting verification by the issuer.',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    icon: <XCircle className="w-3 h-3" />,
    message: 'This credential has been rejected by the verification system.',
  },
  expired: {
    label: 'Expired',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    icon: <AlertTriangle className="w-3 h-3" />,
    message: 'This credential has passed its expiration date.',
  },
  revoked: {
    label: 'Revoked',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    icon: <Ban className="w-3 h-3" />,
    message: 'This credential has been revoked by the issuer and is no longer valid.',
  },
};

export const CredentialStatusBadge = ({
  status,
  showMessage = false,
  size = 'md',
  className,
}: CredentialStatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.pending;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Badge
        variant="outline"
        className={cn(
          'inline-flex items-center gap-1 font-medium border',
          config.color,
          sizeClasses[size]
        )}
      >
        {config.icon}
        {config.label}
      </Badge>
      
      {showMessage && (
        <p className="text-xs text-muted-foreground mt-1">
          {config.message}
        </p>
      )}
    </div>
  );
};
