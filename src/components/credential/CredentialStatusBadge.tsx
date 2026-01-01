import { CheckCircle2, Clock, XCircle, AlertTriangle, Ban, Shield, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export type CredentialStatusType = 'verified' | 'issued' | 'pending' | 'rejected' | 'expired' | 'revoked';

interface CredentialStatusBadgeProps {
  status: CredentialStatusType | string;
  showMessage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
  animated?: boolean;
}

const statusConfig: Record<string, {
  label: string;
  color: string;
  bgGlow: string;
  icon: React.ReactNode;
  iconLg: React.ReactNode;
  message: string;
  emotion: string;
}> = {
  verified: {
    label: 'Verified',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    bgGlow: 'trust-glow',
    icon: <CheckCircle2 className="w-3 h-3" />,
    iconLg: <CheckCircle2 className="w-5 h-5" />,
    message: 'This credential has been verified on the blockchain and is authentic.',
    emotion: '✅ Trusted',
  },
  issued: {
    label: 'Verified',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    bgGlow: 'trust-glow',
    icon: <CheckCircle2 className="w-3 h-3" />,
    iconLg: <CheckCircle2 className="w-5 h-5" />,
    message: 'This credential is issued and valid.',
    emotion: '✅ Trusted',
  },
  pending: {
    label: 'Pending',
    color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    bgGlow: 'trust-glow-warning',
    icon: <Clock className="w-3 h-3" />,
    iconLg: <Clock className="w-5 h-5" />,
    message: 'This credential is awaiting verification by the issuer.',
    emotion: '⏳ Awaiting',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-500/20 text-red-300 border-red-500/40',
    bgGlow: 'trust-glow-error',
    icon: <XCircle className="w-3 h-3" />,
    iconLg: <XCircle className="w-5 h-5" />,
    message: 'This credential has been rejected by the verification system.',
    emotion: '❌ Invalid',
  },
  expired: {
    label: 'Expired',
    color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    bgGlow: 'trust-glow-warning',
    icon: <AlertTriangle className="w-3 h-3" />,
    iconLg: <AlertTriangle className="w-5 h-5" />,
    message: 'This credential has passed its expiration date.',
    emotion: '⚠️ Outdated',
  },
  revoked: {
    label: 'Revoked',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    bgGlow: 'trust-glow-error',
    icon: <Ban className="w-3 h-3" />,
    iconLg: <Ban className="w-5 h-5" />,
    message: 'This credential has been revoked by the issuer and is no longer valid.',
    emotion: '⛔ Revoked',
  },
};

export const CredentialStatusBadge = ({
  status,
  showMessage = false,
  size = 'md',
  className,
  showTooltip = false,
  animated = false,
}: CredentialStatusBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = statusConfig[status] || statusConfig.pending;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const isVerified = status === 'verified' || status === 'issued';

  return (
    <div 
      className={cn('relative flex flex-col gap-1', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Badge
        variant="outline"
        className={cn(
          'inline-flex items-center gap-1.5 font-medium border transition-all duration-200',
          config.color,
          sizeClasses[size],
          animated && isVerified && 'animate-pulse-subtle',
          isHovered && config.bgGlow
        )}
      >
        {animated && isVerified && <Sparkles className="w-3 h-3 animate-pulse" />}
        {config.icon}
        {config.label}
      </Badge>
      
      {showMessage && (
        <p className="text-xs text-muted-foreground mt-1">
          {config.message}
        </p>
      )}

      {/* Enhanced Tooltip */}
      {showTooltip && isHovered && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 animate-fade-in">
          <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl min-w-[200px]">
            <div className="flex items-start gap-2">
              <div className={cn(
                'p-1.5 rounded-lg',
                isVerified ? 'bg-emerald-500/20' : 'bg-muted'
              )}>
                {config.iconLg}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">{config.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{config.message}</p>
                <p className="text-xs font-medium mt-1.5 opacity-70">{config.emotion}</p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-r border-b border-border rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
};

// Large verification result box for public pages
interface VerificationResultBoxProps {
  status: CredentialStatusType | string;
  credential?: {
    issueDate?: string;
    createdAt?: string;
    lastVerified?: string;
  };
}

export const VerificationResultBox = ({ status, credential }: VerificationResultBoxProps) => {
  const config = statusConfig[status] || statusConfig.pending;
  const isVerified = status === 'verified' || status === 'issued';

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={cn(
      'relative overflow-hidden rounded-xl p-6',
      isVerified 
        ? 'bg-emerald-500/10 border border-emerald-500/30' 
        : status === 'pending'
        ? 'bg-yellow-500/10 border border-yellow-500/30'
        : 'bg-red-500/10 border border-red-500/30'
    )}>
      {/* Animated background gradient */}
      {isVerified && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 animate-gradient-shift" />
      )}

      <div className="relative flex items-start gap-4">
        {/* Icon with glow */}
        <div className={cn(
          'p-3 rounded-xl',
          isVerified ? 'bg-emerald-500/20 trust-glow' : 'bg-muted'
        )}>
          {isVerified ? (
            <Shield className="w-8 h-8 text-emerald-400" />
          ) : (
            config.iconLg
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={cn(
            'text-lg font-bold',
            isVerified ? 'text-emerald-300' : 'text-foreground'
          )}>
            {isVerified ? '✅ Credential Verified Successfully' : config.label}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {config.message}
          </p>

          {/* Verification timeline for verified credentials */}
          {isVerified && credential && (
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-muted-foreground">Issued</span>
                <span className="text-xs font-medium text-foreground">
                  {formatDate(credential.issueDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Verified</span>
                <span className="text-xs font-medium text-foreground">Just now</span>
              </div>
            </div>
          )}
        </div>

        {/* Confidence indicator */}
        {isVerified && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Trust Score</p>
            <p className="text-2xl font-bold text-emerald-400">100%</p>
          </div>
        )}
      </div>
    </div>
  );
};