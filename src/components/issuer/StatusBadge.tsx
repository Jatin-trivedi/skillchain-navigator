import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { CredentialStatus } from '@/types/credential';

interface StatusBadgeProps {
  status: CredentialStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

const statusConfig: Record<CredentialStatus, {
  label: string;
  icon: typeof CheckCircle2;
  className: string;
}> = {
  issued: {
    label: 'Issued',
    icon: CheckCircle2,
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30',
  },
  revoked: {
    label: 'Revoked',
    icon: XCircle,
    className: 'bg-destructive/20 text-red-400 border-destructive/30 hover:bg-destructive/30',
  },
  expired: {
    label: 'Expired',
    icon: Clock,
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30',
  },
};

export const StatusBadge = ({ status, showIcon = true, size = 'md' }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <Badge
      variant="outline"
      className={`${config.className} ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'px-3 py-1'}`}
    >
      {showIcon && <Icon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} />}
      {config.label}
    </Badge>
  );
};
