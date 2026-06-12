import { useParams } from 'react-router-dom';

export default function SnapshotRoute() {
  const { snapshotId } = useParams<{ snapshotId: string }>();
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <p className="text-text-secondary">Snapshot: {snapshotId}</p>
    </div>
  );
}