import { Award, Search, User, FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type?: 'credentials' | 'portfolio' | 'search' | 'default';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const emptyStateConfig = {
  credentials: {
    icon: Award,
    gradient: 'from-primary/20 to-secondary/20',
  },
  portfolio: {
    icon: User,
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  search: {
    icon: Search,
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  default: {
    icon: FolderOpen,
    gradient: 'from-muted to-muted',
  },
};

export const EmptyState = ({
  type = 'default',
  title,
  message,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) => {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in',
      className
    )}>
      <div className={cn(
        'w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6',
        config.gradient
      )}>
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{message}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} className="gap-2">
          <Plus className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};