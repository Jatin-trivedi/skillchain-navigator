import { useEffect, useState, useRef } from "react";

interface Stat {
  value: number;
  label: string;
  suffix: string;
  decimals?: number;
}

const stats: Stat[] = [
  { value: 12456, label: "Credentials Issued", suffix: "+", decimals: 0 },
  { value: 89, label: "Institutions", suffix: "+", decimals: 0 },
  { value: 99.8, label: "Verification Success", suffix: "%", decimals: 1 },
  { value: 3.2, label: "Avg. Verify Time", suffix: "s", decimals: 1 },
];

const AnimatedCounter = ({ 
  value, 
  suffix, 
  decimals = 0 
}: { 
  value: number; 
  suffix: string; 
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">
      {count.toFixed(decimals)}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Organizations Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Real impact, measurable results
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
              <p className="text-muted-foreground mt-2">{stat.label}</p>
              
              {/* Progress indicator */}
              <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-bg animate-pulse"
                  style={{ width: `${Math.min((stat.value / 150) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Demo note */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground opacity-60">
            *Demo data showing platform capabilities. Real metrics update in real-time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
