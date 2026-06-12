interface InputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel: string;
  maxLength?: number;
}

export function Input({
  value,
  onChange,
  placeholder,
  ariaLabel,
  maxLength,
}: InputProps) {
  return (
    <input
      className="w-full px-4 py-2 bg-surface-1 border border-border-default rounded-md text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-hover transition-colors duration-150"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      maxLength={maxLength}
    />
  );
}