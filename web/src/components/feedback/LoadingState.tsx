interface LoadingStateProps {
  title: string;
  message?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export function LoadingState({ title, message, cancelLabel, onCancel }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div className="w-8 h-8 border-2 border-text-secondary border-t-transparent rounded-full animate-spin" />
      <p className="text-text-primary text-lg font-medium">{title}</p>
      {message && <p className="text-text-tertiary text-sm">{message}</p>}
      {cancelLabel && onCancel && (
        <button onClick={onCancel} className="text-sm text-text-secondary underline mt-2">
          {cancelLabel}
        </button>
      )}
    </div>
  );
}