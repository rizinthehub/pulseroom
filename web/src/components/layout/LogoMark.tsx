interface LogoMarkProps {
  href?: string;
}

export function LogoMark({ href = '/' }: LogoMarkProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-text-primary no-underline hover:opacity-80 transition-opacity"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-pulse-micro">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </svg>
      <span className="font-bold text-sm tracking-tight">PulseRoom</span>
    </a>
  );
}