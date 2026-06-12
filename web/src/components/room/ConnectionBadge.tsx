interface ConnectionBadgeProps {
  status: 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
}

const labels: Record<string, string> = {
  connecting: 'Connecting…',
  connected: 'Connected',
  reconnecting: 'Reconnecting…',
  disconnected: 'Disconnected',
};

const colors: Record<string, string> = {
  connecting: 'bg-yellow-500/20 text-yellow-400',
  connected: 'bg-green-500/20 text-green-400',
  reconnecting: 'bg-yellow-500/20 text-yellow-400',
  disconnected: 'bg-red-500/20 text-red-400',
};

export function ConnectionBadge({ status }: ConnectionBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'connected' ? 'bg-green-400' : 'bg-current'}`} />
      {labels[status]}
    </span>
  );
}