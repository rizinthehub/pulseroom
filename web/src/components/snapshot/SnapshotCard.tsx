import type { SnapshotData } from '../../types/snapshot';

interface SnapshotCardProps {
  data: SnapshotData;
  exportMode?: boolean;
}

export function SnapshotCard({ data, exportMode }: SnapshotCardProps) {
  const containerClass = exportMode
    ? 'w-[1200px] h-[630px] flex flex-col items-center justify-center p-12'
    : 'w-full max-w-md flex flex-col items-center justify-center p-8 rounded-lg border border-border-default bg-base';

  return (
    <div className={containerClass}>
      <div className="text-6xl mb-4 font-bold">{data.score}</div>
      <div className="text-2xl font-semibold mb-2">{data.moodLabel}</div>
      <div className="text-sm text-text-secondary mb-1">
        Room {data.roomCode} · {data.participants} participants
      </div>
      <div className="text-xs text-text-tertiary">
        Captured {new Date(data.capturedAt).toLocaleString()}
      </div>
      <div className="text-xs text-text-tertiary mt-2">
        Trending: {data.trend}
      </div>
    </div>
  );
}
