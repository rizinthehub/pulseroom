interface ErrorStateProps {
  title: string;
  message: string;
  action?: { label: string; onClick: () => void };
}

export function ErrorState({ title, message, action }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
      <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
      <p className="text-text-secondary text-sm">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-4 py-2 bg-accent text-white rounded-md text-sm hover:bg-accent-hover transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}