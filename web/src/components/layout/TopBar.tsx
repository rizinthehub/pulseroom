import type { ReactNode } from 'react';
import { LogoMark } from './LogoMark';

interface TopBarProps {
  children?: ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3">
      <LogoMark />
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}