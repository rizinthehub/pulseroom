import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  onClick?: () => void;
  copied?: boolean;
}

export function Chip({ children, onClick, copied }: ChipProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full transition-all duration-150 ${
        copied
          ? 'bg-accent-soft text-accent'
          : 'bg-surface-1 text-text-secondary hover:bg-surface-2'
      }`}
      onClick={onClick}
    >
      {copied && <span className="text-accent">✓</span>}
      {children}
    </button>
  );
}