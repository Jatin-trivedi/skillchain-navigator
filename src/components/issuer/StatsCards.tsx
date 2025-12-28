import { Award, CheckCircle2, XCircle, Clock, TrendingUp, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  stats: {
    total: number;
    issued: number;
    revoked: number;
    expired: number;
    thisMonth: number;
    topCategory: string;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const statItems = [
    {
      label: 'Total',
      value: stats.total,
      icon: Award,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Issued',
      value: stats.issued,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Revoked',
      value: stats.revoked,
      icon: XCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'Expired',
      value: stats.expired,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Card className="bg-card border-border flex-1 min-w-[200px]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">+{stats.thisMonth}</p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border flex-1 min-w-[200px]">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground truncate max-w-[150px]">
                {stats.topCategory}
              </p>
              <p className="text-xs text-muted-foreground">Top Category</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
