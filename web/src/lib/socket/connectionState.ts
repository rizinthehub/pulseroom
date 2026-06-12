export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

type Listener = (status: ConnectionStatus) => void;

const listeners = new Set<Listener>();
let status: ConnectionStatus = 'idle';

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setConnectionStatus(s: ConnectionStatus): void {
  status = s;
  listeners.forEach((fn) => fn(s));
}

export function getConnectionStatus(): ConnectionStatus {
  return status;
}