import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Toast } from './Toast';

interface ToastData {
  id: string;
  kind: 'success' | 'error' | 'info';
  message: string;
}

interface ToastContextValue {
  push: (t: Omit<ToastData, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const push = useCallback((t: Omit<ToastData, 'id'>) => {
    const id = `toast-${nextId++}`;
    setToasts((prev) => [...prev, { ...t, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}