import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  loading?: boolean;
  children: React.ReactNode;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ variant = 'primary', size = 'md', icon: Icon, loading, children, className, onDrag, ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-gradient-accent hover:shadow-lg',
      secondary: 'glass-button',
      success: 'bg-gradient-success hover:shadow-lg',
      warning: 'bg-gradient-warning hover:shadow-lg',
      danger: 'bg-red-500/80 hover:bg-red-500 hover:shadow-lg',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className={clsx(
          'rounded-lg text-dark font-medium transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center space-x-2',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...(props as any)}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : Icon ? (
          <Icon className="w-4 h-4" />
        ) : null}
        <span>{children}</span>
      </motion.button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, icon: Icon, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full py-2 glass-panel rounded-lg text-slate-700 placeholder-slate-500',
              'border-0 focus:outline-none focus:ring-2 focus:ring-blue-300/50',
              'transition-all duration-200',
              Icon ? 'pl-10 pr-4' : 'px-4',
              error && 'ring-2 ring-red-400/50',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

interface GlassSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 glass-panel rounded-lg text-slate-700 bg-transparent',
            'border-0 focus:outline-none focus:ring-2 focus:ring-blue-300/50',
            'transition-all duration-200',
            error && 'ring-2 ring-red-400/50',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-white">
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

GlassSelect.displayName = 'GlassSelect';

interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 glass-panel rounded-lg text-slate-700 placeholder-slate-500',
            'border-0 focus:outline-none focus:ring-2 focus:ring-blue-300/50',
            'transition-all duration-200 resize-none',
            error && 'ring-2 ring-red-400/50',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

GlassTextarea.displayName = 'GlassTextarea';

interface GlassCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const GlassCheckbox = forwardRef<HTMLInputElement, GlassCheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={clsx(
            'w-4 h-4 rounded glass-panel border-0',
            'focus:ring-2 focus:ring-white/30',
            'text-blue-500',
            className
          )}
          {...props}
        />
        <span className="text-slate-700 select-none">{label}</span>
      </label>
    );
  }
);

GlassCheckbox.displayName = 'GlassCheckbox';
