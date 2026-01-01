import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('animate-shimmer rounded-md', className)} />
);

export const SkeletonCredentialCard = () => (
  <div className="bg-card border border-border rounded-xl p-4 space-y-4">
    <div className="flex items-start gap-4">
      <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="w-20 h-6 rounded-full" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
    </div>
  </div>
);

export const SkeletonPortfolioHeader = () => (
  <div className="text-center space-y-4">
    <Skeleton className="w-24 h-24 rounded-full mx-auto" />
    <Skeleton className="h-8 w-48 mx-auto" />
    <Skeleton className="h-4 w-64 mx-auto" />
    <div className="flex justify-center gap-2">
      <Skeleton className="h-8 w-24 rounded-md" />
      <Skeleton className="h-8 w-24 rounded-md" />
      <Skeleton className="h-8 w-24 rounded-md" />
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
        <Skeleton className="h-8 w-12 mx-auto" />
        <Skeleton className="h-4 w-20 mx-auto" />
      </div>
    ))}
  </div>
);

export const PortfolioLoadingSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <SkeletonPortfolioHeader />
      <SkeletonStats />
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <SkeletonCredentialCard />
        <SkeletonCredentialCard />
        <SkeletonCredentialCard />
      </div>
    </div>
  </div>
);

export const CredentialLoadingSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <Skeleton className="h-16 w-full rounded-xl" />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Skeleton className="w-16 h-16 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);