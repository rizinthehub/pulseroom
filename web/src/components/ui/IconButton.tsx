import type { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  variant?: 'ghost' | 'solid';
  size?: 'sm' | 'md';
  disabled?: boolean;
  onClick?: () => void;
}

export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  disabled,
  onClick,
}: IconButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2';
  const variants = {
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-1 disabled:opacity-40',
    solid: 'bg-surface-1 text-text-primary border border-border-default hover:border-border-hover disabled:opacity-40',
  };
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}