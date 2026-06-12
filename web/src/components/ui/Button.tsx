import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  iconLeft?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  iconLeft,
  disabled,
  type = 'button',
  onClick,
  children,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2';
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-hover disabled:opacity-40',
    secondary: 'bg-surface-1 text-text-primary border border-border-default hover:border-border-hover disabled:opacity-40',
    ghost: 'text-text-secondary hover:text-text-primary disabled:opacity-40',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : iconLeft ? (
        iconLeft
      ) : null}
      {children}
    </button>
  );
}