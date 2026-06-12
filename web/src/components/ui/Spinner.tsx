interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ size = 'md' }: SpinnerProps) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <span
      className={`${sizes[size]} border-2 border-text-secondary border-t-transparent rounded-full animate-spin`}
    />
  );
}