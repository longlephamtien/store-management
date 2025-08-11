import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function GlassCard({ 
  children, 
  className, 
  hover = true, 
  padding = 'md',
  onClick 
}: GlassCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={clsx(
        'glass-card rounded-2xl shadow-lg',
        paddingClasses[padding],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  gradient?: 'primary' | 'success' | 'warning' | 'info';
  onClick?: () => void;
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  gradient = 'primary',
  onClick 
}: StatCardProps) {
  const gradientClasses = {
    primary: 'gradient-accent',
    success: 'gradient-success',
    warning: 'gradient-warning',
    info: 'gradient-info'
  };

  return (
    <GlassCard 
      onClick={onClick} 
      className="relative overflow-hidden stat-card flex flex-col justify-between"
      hover={false} // Disable automatic hover effects for better performance
    >
      <div className="relative z-10 flex-1 flex flex-col justify-between p-1">
        <div className="flex-1">
          <div className="pr-3 overflow-hidden">
            <p className="text-slate-600 text-sm font-medium mb-3 leading-tight">{title}</p>
            <div className="mb-2">
              <h3 className="stat-card-value text-1xl lg:text-2xl font-bold text-slate-800 leading-tight stat-value-container mb-1">{value}</h3>
              {subtitle && (
                <p className="text-slate-500 text-xs lg:text-sm min-h-[1rem]">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-end justify-between min-h-[2rem]">
          <div className="flex-1 min-w-0">
            {trend ? (
              <div className="trend-container">
                <span className={clsx(
                  'text-sm font-medium trend-value',
                  trend.positive ? 'text-emerald-600' : 'text-red-500'
                )}>
                  {trend.positive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-slate-500 text-sm trend-label ml-1">{trend.label}</span>
              </div>
            ) : (
              <div className="min-h-[1.25rem]"></div>
            )}
          </div>
          
          <div className="relative ml-2 flex-shrink-0">
            {/* Background gradient decoration */}
            <div className={clsx(
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 opacity-10 rounded-full',
              gradientClasses[gradient]
            )}></div>
            
            <div className={clsx(
              'w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10',
              gradientClasses[gradient]
            )}>
              <Icon className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  height?: string;
}

export function ChartCard({ title, children, action, height = 'h-80' }: ChartCardProps) {
  return (
    <GlassCard className={clsx(height, 'flex flex-col')}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 drop-shadow-sm tracking-tight">{title}</h3>
        {action && (
          <button
            onClick={action.onClick}
            className="glass-button px-4 py-2 rounded-lg text-slate-600 hover:text-slate-800 text-sm transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </GlassCard>
  );
}

interface InfoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export function InfoCard({ title, description, children, headerAction }: InfoCardProps) {
  return (
    <GlassCard>
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-slate-900 drop-shadow-sm tracking-tight mb-1 truncate">{title}</h3>
          {description && (
            <p className="text-slate-600 text-sm">{description}</p>
          )}
        </div>
        {headerAction && (
          <div className="flex-shrink-0 ml-4">
            {headerAction}
          </div>
        )}
      </div>
      {children}
    </GlassCard>
  );
}
