import { useEffect, useState } from 'react';

interface ToastData {
  id: string;
  kind: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  durationMs?: number;
}

export function Toast({ toast, onDismiss, durationMs = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, durationMs);
    return () => clearTimeout(timer);
  }, [toast.id, durationMs, onDismiss]);

  const colors = {
    success: 'bg-green-500/90 text-white',
    error: 'bg-red-500/90 text-white',
    info: 'bg-surface-1 text-text-primary border border-border-default',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md text-sm shadow-lg transition-all duration-300 ${colors[toast.kind]} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      {toast.message}
    </div>
  );
}