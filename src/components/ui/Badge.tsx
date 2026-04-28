import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'blue' | 'orange' | 'green' | 'purple' | 'red' | 'cyan';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border font-medium', variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
