import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  color?: string;
}

export const KPICard = ({ title, value, trend, icon, color = 'text-primary' }: KPICardProps) => (
  <Card className="bg-card border-border hover:border-primary/30 transition-colors">
    <CardContent className="p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-1 text-xs ${
              trend >= 0 ? 'text-emerald-500' : 'text-destructive'
            }`}>
              {trend >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{trend >= 0 ? '+' : ''}{trend}% from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-muted ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

interface DashboardCardsProps {
  stats: {
    totalIssued: number;
    activeRecipients: number;
    pendingVerification: number;
    monthlyGrowth: number;
  };
}

export const DashboardCards = ({ stats }: DashboardCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPICard
        title="Total Issued"
        value={stats.totalIssued.toLocaleString()}
        trend={12}
        icon={<span className="text-2xl">📜</span>}
      />
      <KPICard
        title="Active Recipients"
        value={stats.activeRecipients.toLocaleString()}
        trend={8}
        icon={<span className="text-2xl">👥</span>}
      />
      <KPICard
        title="Pending"
        value={stats.pendingVerification}
        icon={<span className="text-2xl">⏳</span>}
      />
      <KPICard
        title="This Month"
        value={`+${stats.monthlyGrowth}`}
        trend={stats.monthlyGrowth > 10 ? 15 : -5}
        icon={<span className="text-2xl">📈</span>}
      />
    </div>
  );
};
